defmodule Jeopardy.Game.Board do

  def client_view(board, nil) do
    Enum.map(board, fn category ->
      category
      |> Enum.map(fn {name, values} -> {name, Enum.map(values, fn {value, _qa} -> value end)} end)
      |> Map.new
    end)
  end

  # TODO this is untested
  def client_view(board, past_questions) do
    Enum.map(board, fn category ->
      category
      |> Enum.map(fn {name, values} -> 
          vals = Enum.map(values, fn {value, _qa} -> 
            # check if category/value combination appears in past_questions
            cat = Map.get(past_questions, name)
            if cat && Map.get(cat, value) do
              ""
            else
              value
            end          
          end)
          {name, vals} 
        end)
      |> Map.new
    end)
  end
end