defmodule JeopardyWeb.TwilioController do
  use JeopardyWeb, :controller

  alias Jeopardy.TwilioAPI
  alias Jeopardy.SmsParser

  action_fallback JeopardyWeb.FallbackController

  def receive(conn, params) do
    SmsParser.parse(params["From"], params["Body"])
    {:ok, twilio_response} = TwilioAPI.send_message(params["From"], params["Body"])

    response = %{
      body: twilio_response.body,
      date_created: twilio_response.date_created,
      to: twilio_response.to,
      from: twilio_response.from
    }
    conn
    |> put_resp_header("content-type", "application/json; charset=UTF-8")
    |> send_resp(:created, Jason.encode!(response))
  end

end
