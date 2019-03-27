defmodule JeopardyWeb.AuthController do
  use JeopardyWeb, :controller

  # https://github.com/NatTuck/husky_shop_spa/compare/3-list-products-fixed...1901-5-users#diff-b78f761880731f5beda0b64d49a68009

  alias Jeopardy.Users
  alias Jeopardy.Users.User

  action_fallback JeopardyWeb.FallbackController

  def authenticate(conn, %{"username" => username, "password" => password}) do
    with {:ok, %User{} = user} <- Users.authenticate_user(username, password) do
      resp = %{
        data: %{
          token: Phoenix.Token.sign(JeopardyWeb.Endpoint, "user_id", user.id),
          user_id: user.id,
        }
      }

      conn
      |> put_resp_header("content-type", "application/json; charset=UTF-8")
      |> send_resp(:created, Jason.encode!(resp))
    end
  end
end