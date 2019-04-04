defmodule Jeopardy.Game.Player do

  def new(player_name, number) do
    IO.inspect(number)
    %{
      name: player_name,
      phone_number: number,
      score: 0,
      answer: ""
    }
  end

  def client_view(player) do
    %{
      name: player.name,
      score: player.score
    }
  end

  def answered?(player) do
    player.answer != ""
  end

  def set_answer(player, answer) do
    Map.put(player, :answer, answer)
  end

  def add_to_score(player, value) do
    Map.put(player, :score, player.score + value)
  end
end