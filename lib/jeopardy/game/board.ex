defmodule Jeopardy.Game.Board do

  alias Jeopardy.JeopardyAPI

  def new() do
    JeopardyAPI.create_board()
  end

  # Produces object of this shape:
  # { "category1" => [{value: "200", completed: #f}, {value: "400", completed: #f}, {value: "600", completed: #f}], {value: "800", completed: #f}, {value: "1000", completed: #f}], ...}
  def client_view(board, nil) do
    board
    |> Enum.map(fn {category, values} -> %{category => Enum.map(values, fn {value, _qa} -> %{value: value, completed: false} end)} end)
    |> Enum.reduce(%{}, fn category, acc -> Map.merge(category, acc) end)
  end

  # Produces object of this shape, with past_questions marked completed:
  # { "category1" => [{value: "200", completed: #t}, {value: "400", completed: #f}, {value: "600", completed: #f}], {value: "800", completed: #f}, {value: "1000", completed: #f}], ...}
  def client_view(board, past_questions) do
    board
    |> Enum.map(fn {category, values} -> 
        vals = Enum.map(values, fn {value, _qa} -> 
          # check if category/value combination appears in past_questions
          cat = Map.get(past_questions, category)
          completed = cat && Enum.member?(cat, value)
          %{value: value, completed: completed}
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