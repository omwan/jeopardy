defmodule JeopardyWeb.PageController do
  use JeopardyWeb, :controller

  def index(conn, _params) do
    session = get_session(conn, :session)
              |> verify_session
    render(conn, "index.html", session: session, number: System.get_env("TWILIO_NUMBER"))
  end

  defp verify_session(nil), do: nil
  defp verify_session(session) do
    if session do
      case Phoenix.Token.verify(JeopardyWeb.Endpoint, "user_id", session.token, [max_age: 86400]) do
        {:ok, _} ->
          session
        {:error, error} ->
          nil
      end
    end
  end
end
