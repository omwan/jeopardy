defmodule Jeopardy.SmsParser do

  alias Jeopardy.GameServer

  def parse(from, body) do
    [game, name] = String.split(body, ":")
    if GameServer.game_exists?(game) do
      GameServer.new_player(game, name, from)
    end
  end

end