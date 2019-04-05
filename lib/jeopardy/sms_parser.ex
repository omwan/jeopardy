defmodule Jeopardy.SmsParser do

  alias Jeopardy.GameServer

  def parse_join_game(from, body) do
    [game, name] = String.split(body, ":")
    if GameServer.game_exists?(game) do
      GameServer.new_player(game, name, from)
    end
  end

  def parse_new_question(game, _from, body) do
    [coordinate, value] = String.split(body, ":")
    category = GameServer.get_category_from_coordinate(game, coordinate)
    GameServer.new_question(game, category, String.to_integer(value))
  end

  def parse_answer_question(game, from, body) do
    username = GameServer.get_username_from_phone_number(game, from)
    GameServer.check_answer(game, username, body)
  end
end
