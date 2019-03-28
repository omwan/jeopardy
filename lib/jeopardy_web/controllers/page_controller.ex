defmodule JeopardyWeb.PageController do
  use JeopardyWeb, :controller

  def index(conn, _params) do
    session = get_session(conn, :session)
    game = get_session(conn, :game)
    render(conn, "index.html", session: session, game: game)
  end
end
