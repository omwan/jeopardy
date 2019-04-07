defmodule JeopardyWeb.Plugs.RequireAuth do
  import Plug.Conn

  # https://github.com/NatTuck/husky_shop_spa/compare/3-list-products-fixed...1901-5-users#diff-5e60854fe600f6b754ecaf7aea54f68e

  def init(args), do: args

  def call(conn, _args) do
    token = get_req_header(conn, "x-auth")
    case Phoenix.Token.verify(JeopardyWeb.Endpoint, "user_id", hd(token), [max_age: 86400]) do
      {:ok, user_id} ->
        assign(conn, :current_user, Jeopardy.Users.get_user!(user_id))
      {:error, err} ->
        conn
        |> put_resp_header("content-type", "application/json; charset=UTF-8")
        |> send_resp(:unprocessable_entity, Jason.encode!(%{"error" => err}))
        |> halt()
    end
  end
end
