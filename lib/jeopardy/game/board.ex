defmodule Jeopardy.Game.Board do

  alias Jeopardy.JeopardyAPI

  def new() do
    JeopardyAPI.create_board()
  end

  # Produces object of this shape:
  # { "category1" => ["200", "400", "600", "800", "1000"], "category2" => ["200", "400", "600", "800", "1000"]}
  def client_view(board, nil) do
    board
    |> Enum.map(fn {category, values} -> %{category => Enum.map(values, fn {value, _qa} -> value end)} end)
    |> Enum.reduce(%{}, fn category, acc -> Map.merge(category, acc) end)
  end

  # Produces object of this shape, with past_questions hidden:
  # { "category1" => ["200", "", "600", "", "1000"], "category2" => ["200", "", "600", "800", "1000"]}
  def client_view(board, past_questions) do
    IO.inspect(past_questions)
    board
    |> Enum.map(fn {category, values} -> 
        vals = Enum.map(values, fn {value, _qa} -> 
          # check if category/value combination appears in past_questions
          cat = Map.get(past_questions, category)
          if cat && Enum.member?(cat, value), do: "", else: value
        end)
        %{category => vals} 
      end)
    |> Enum.reduce(%{}, fn category, acc -> Map.merge(category, acc) end)
  end

  def get_question(board, category, value) do
    get_category(board, category, value)[:question]
  end

  def get_answer(board, category, value) do
    get_category(board, category, value)[:answer]
  end

  defp get_category(board, category, value) do
    board[category][to_string(value)]
  end
end