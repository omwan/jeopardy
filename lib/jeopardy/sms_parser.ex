defmodule Jeopardy.SmsParser do

  alias Jeopardy.GameServer

  def parse(from, body) do
    [game, name] = String.split(body, ":")
    route(from, body, game)
    if GameServer.game_exists?(game) do
      GameServer.new_player(game, name, from)
    end
  end

  def route(from, body, game) do
    game_state = GameServer.check_state(game)
    case game_state do
      _ -> IO.inspect(game_state)
    end
  end

end
