defmodule Jeopardy.Game.Player do

  def new(player_name, number) do
    %{
      name: player_name,
      phone_number: number,
      score: 500,
      answer: "",
      wager: nil
    }
  end

  def client_view(player) do
    %{
      name: player.name,
      score: player.score,
      wager: player.wager
    }
  end

  def answered?(player) do
    player.answer != ""
  end

  def set_answer(player, answer) do
    Map.put(player, :answer, answer)
  end

  def set_wager(player, wager) do
    if (wager <= player.score) do
      Map.put(player, :wager, wager)
    else
      player
    end
  end

  def add_to_score(player, value) do
    Map.put(player, :score, player.score + value)
  end

  def subtract_from_score(player, value) do
    Map.put(player, :score, player.score - value)
  end
end
