defmodule JeopardyWeb.TwilioController do
  use JeopardyWeb, :controller

  alias Jeopardy.TwilioAPI

  action_fallback JeopardyWeb.FallbackController

  def receive(conn, params) do
    response = TwilioAPI.send_message(params["From"], params["Body"])
    conn
    |> put_resp_header("content-type", "application/json; charset=UTF-8")
    |> send_resp(:created, Jason.encode!(response))
  end

end
