defmodule JeopardyWeb.TwilioController do
  use JeopardyWeb, :controller

  alias Jeopardy.TwilioAPI
  alias Jeopardy.SmsParser
  alias Jeopardy.GameServer

  action_fallback JeopardyWeb.FallbackController

  def receive(conn, %{"From" => from, "Body" => body}) do
    game = GameServer.get_game_from_phone_number(from)
    IO.puts GameServer.get_game_state(game)
    if game do
      case GameServer.get_game_state(game) do
        "JOINING" ->
          SmsParser.parse_join_game(from, body)
        "SELECTING" ->
          SmsParser.parse_new_question(game, from, body)
        "ANSWERING" ->
          SmsParser.parse_answer_question(game, from, body)
      end
    else
      SmsParser.parse_join_game(from, body)
    end

    response = %{}
    #    {:ok, twilio_response} = TwilioAPI.send_message(params["From"], params["Body"])
    #    response = %{
    #      body: twilio_response.body,
    #      date_created: twilio_response.date_created,
    #      to: twilio_response.to,
    #      from: twilio_response.from
    #    }
    conn
    |> put_resp_header("content-type", "application/xml")
    |> send_resp(:created, "")
  end

end
