defmodule Jeopardy.Game.Player do

  def new(player_name) do
    %{
      name: player_name,
      # phone_number: "",
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
end