defmodule JeopardyWeb.TwilioController do
  use JeopardyWeb, :controller

  alias Jeopardy.TwilioAPI
  alias Jeopardy.SmsParser
  alias Jeopardy.GameServer

  action_fallback JeopardyWeb.FallbackController

  def receive(conn, %{"From" => from, "Body" => body}) do
    game = GameServer.get_game_from_phone_number(from)
    if game do
      case GameServer.get_game_state(game) do
        "JOINING" ->
          SmsParser.parse_join_game(from, body)
        "SELECTING" ->
          SmsParser.parse_new_question(game, from, body)
        "ANSWERING" ->
          SmsParser.parse_answer_question(game, from, body)
        "FINAL_CATEGORY" ->
          SmsParser.parse_wager(game, from, body)
        "FINAL_QUESTION" ->
          SmsParser.parse_answer_final(game, from, body)
      end
    else
      SmsParser.parse_join_game(from, body)
    end

    conn
    |> put_resp_header("content-type", "application/xml")
    |> send_resp(:created, "")
  end

end
