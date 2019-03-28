defmodule Jeopardy.Player do

  def new(player_name) do
    %{
      name: player_name,
      # phone_number: "",
      score: 0,
      input: ""
    }
  end
end