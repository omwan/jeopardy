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
    GenServer.cast(reg(game_name), {:join, game_name})
  end

  def game_exists?(game_name) do
    BackupAgent.get(game_name) != nil
  end

  def get_game(game_name) do
    BackupAgent.get(game_name) || Game.new()
  end

  def put_phone_number(game_name, number) do
    BackupAgent.put(number, game_name)
  end

  def get_game_from_phone_number(number) do
    BackupAgent.get(number)
  end

  def get_username_from_phone_number(game_name, number) do
    Game.phone_to_username(get_game(game_name), number)
  end

  def get_game_state(game_name) do
    Game.get_game_state(get_game(game_name))
  end

  def get_category_from_coordinate(game_name, coordinate) do
    Game.coordinate_to_category(get_game(game_name), coordinate)
  end

  def new_player(game_name, username, number) do
    put_phone_number(game_name, number)
    GenServer.call(reg(game_name), {:new_player, game_name, username, number})
  end

  def start_game(game_name) do
    GenServer.call(reg(game_name), {:start_game, game_name})
  end

  def new_question(game_name, category, value) do
    GenServer.call(reg(game_name), {:question, game_name, category, value})
  end

  def check_answer(game_name, username, answer) do
    GenServer.call(reg(game_name), {:answer, game_name, username, answer})
  end

  def end_game(game_name) do
    IO.puts("ending " <> game_name)
    Game.get_numbers(get_game(game_name))
    |> Enum.each(&(BackupAgent.remove(&1)))
    Registry.unregister(Jeopardy.GameReg, game_name)
    BackupAgent.remove(game_name)
    # TODO remove mapping from phone number to game name
    GenServer.cast(reg(game_name), {:end, game_name})
  end

  # Server Logic

  def handle_cast({:join, game_name}, _state) do
    game = get_game(game_name)
    BackupAgent.put(game_name, game)
    broadcast(game, game_name)
    {:noreply, game}
  end

  def handle_cast({:end, game_name}, _state) do
    game = Game.new()
    broadcast(game, game_name)
    {:noreply, game}
  end

  def handle_call({:new_player, game_name, username, number}, _from, _state) do
    game = Game.add_player(get_game(game_name), username, number)
    update_and_broadcast(game, game_name)
  end

  def handle_call({:start_game, game_name}, _from, _state) do
    game = Game.start_game(get_game(game_name))
    update_and_broadcast(game, game_name)
  end

  def handle_call({:question, game_name, category, value}, _from, _state) do
    game = Game.new_question(get_game(game_name), category, value)
    update_and_broadcast(game, game_name)
  end

  def handle_call({:answer, game_name, username, answer}, _from, _state) do
    game = get_game(game_name)
           # if (game.turn == username) do # TODO
           |> Game.set_answer(username, answer)
           |> Game.check_answer(username, answer)
    update_and_broadcast(game, game_name)
  end

  defp update_and_broadcast(game, game_name) do
    Jeopardy.BackupAgent.put(game_name, game)
    broadcast(game, game_name)
    {:reply, game, game}
  end

  defp broadcast(game, game_name) do
    JeopardyWeb.Endpoint.broadcast("games:" <> game_name, "shout", Game.client_view(game))
  end
end