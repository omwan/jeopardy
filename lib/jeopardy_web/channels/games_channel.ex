defmodule JeopardyWeb.GamesChannel do
  use JeopardyWeb, :channel

  def join("games:" <> game, payload, socket) do
    if authorized?(payload) do
      {:ok, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
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
  defp authorized?(%{"token" => token}) do
    {status, _message} = Phoenix.Token.verify(JeopardyWeb.Endpoint, "user_id", token, [max_age: 86400])
    status == :ok
  end
end
