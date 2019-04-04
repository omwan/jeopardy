defmodule JeopardyWeb.PageController do
  use JeopardyWeb, :controller

  def index(conn, _params) do
    session = get_session(conn, :session)
    render(conn, "index.html", session: session, number: System.get_env("TWILIO_NUMBER"))
  end
end
