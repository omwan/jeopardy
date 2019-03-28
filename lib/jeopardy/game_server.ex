defmodule Jeopardy.GameServer do
  use GenServer

  alias Jeopardy.BackupAgent
  alias Jeopardy.GameSup
  alias Jeopardy.Game

  # Client Interface

  def reg(name) do
    {:via, Registry, {Jeopardy.GameReg, name}}
  end

  def start(name) do
    spec = %{
      id: __MODULE__,
      start: {__MODULE__, :start_link, [name]},
      restart: :permanent,
      type: :worker,
    }
    GameSup.start_child(spec)
  end

  def start_link(game_name) do
    game = BackupAgent.get(game_name) || Game.new()
    GenServer.start_link(__MODULE__, game, name: reg(game_name))
  end

  # runs after server is started with start_link
  def init(state) do
    {:ok, state}
  end

  def join(game_name, player_name) do
    if (length(Registry.lookup(Jeopardy.GameReg, game_name)) == 0) do
      start_link(game_name)
    end
    GenServer.cast(reg(game_name), {:join, game_name, player_name})
  end

  def get_game(game_name) do
    BackupAgent.get(game_name) || Game.new()
  end

  # Server Logic

  def handle_cast({:join, game_name, player_name}, _state) do
    game = Game.add_player(get_game(game_name), player_name)
    BackupAgent.put(game_name, game)
    broadcast(game, game_name)
    {:noreply, game}
  end

  defp broadcast(state, game_name) do
    JeopardyWeb.Endpoint.broadcast("games:" <> game_name, "shout", state)
  end
end