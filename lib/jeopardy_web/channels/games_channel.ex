defmodule JeopardyWeb.GamesChannel do
  use JeopardyWeb, :channel

  alias Jeopardy.GameServer

  def join("games:" <> game, payload, socket) do
    username = Map.get(payload, "username")
    user_id = Map.get(payload, "user_id")

    if authorized?(payload) do
      socket = assign(socket, :game, game)
      GameServer.join(game, username, user_id)
      {:ok, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  def handle_in("new_question", %{ "category" => category, "value" => value }, socket) do
    game_name = socket.assigns[:game]
    GameServer.new_question(game_name, category, value)
    {:noreply, socket}
  end

  def handle_in("start", _params, socket) do
    game_name = socket.assigns[:game]
    GameServer.start_game(game_name)
    {:noreply, socket}
  end

  def handle_in("answer", %{ "username" => username, "answer" => answer }, socket) do
    game_name = socket.assigns[:game]
    GameServer.check_answer(game_name, username, answer)
    {:noreply, socket}
  end

  def handle_in("end_game", _payload, socket) do
    game_name = socket.assigns[:game]
    GameServer.end_game(game_name)
    {:noreply, socket}
  end

  # Channels can be used in a request/response fashion
  # by sending replies to requests from the client
  def handle_in("ping", payload, socket) do
    {:reply, {:ok, payload}, socket}
  end

  # It is also common to receive messages from the client and
  # broadcast to everyone in the current topic (games:lobby).
  def handle_in("shout", payload, socket) do
    broadcast socket, "shout", payload
    {:noreply, socket}
  end

  # Add authorization logic here as required.
  defp authorized?(%{"token" => token, "username" => _username}) do
    {status, _message} = Phoenix.Token.verify(JeopardyWeb.Endpoint, "user_id", token, [max_age: 86400])
    status == :ok
  end
end
