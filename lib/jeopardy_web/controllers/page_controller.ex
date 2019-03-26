defmodule JeopardyWeb.PageController do
  use JeopardyWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
