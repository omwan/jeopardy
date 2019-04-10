defmodule Jeopardy.SmsParser do

  alias Jeopardy.GameServer

  def parse_join_game(from, body) do
    [game, name] = String.split(body, ":")
    if GameServer.game_exists?(game) do
      GameServer.new_player(game, name, from)
    end
  end

  def parse_new_question(game, from, body) do
    if String.contains?(body, ":") do
      [coordinate, value_string] = String.split(body, ":")
      if (valid_coordinate?(coordinate)) do
        {value, _} = Integer.parse(value_string)
        category = GameServer.get_category_from_coordinate(game, coordinate)
        username = GameServer.get_username_from_phone_number(game, from)
        GameServer.new_question(game, username, category, value)
      end
    end
  end

  def parse_answer_question(game, from, body) do
    username = GameServer.get_username_from_phone_number(game, from)
    GameServer.check_answer(game, username, body)
  end

  def parse_wager(game, from, body) do
    username = GameServer.get_username_from_phone_number(game, from)
    with {wager, _} <- Integer.parse(body) do
      GameServer.submit_wager(game, username, wager)
    end
  end

  defp valid_coordinate?(coordinate) do
    letters = ["A", "B", "C", "D", "E", "F"]
    index = Enum.find_index(
      letters,
      fn x ->
        String.downcase(x) == String.downcase(coordinate)
      end
    )
    IO.inspect(index)
    index != nil
  end
end
