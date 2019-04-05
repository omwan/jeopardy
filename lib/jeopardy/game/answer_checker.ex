defmodule Jeopardy.AnswerChecker do

  def is_correct?(submitted, actual) do
    actual_split = split_answer(String.downcase(actual))
    submit_split = split_answer(String.downcase(submitted))

    majority_match?(actual_split, submit_split) and majority_match?(submit_split, actual_split)
  end

  def majority_match?(test, matched) do
    test
    |> Enum.reduce(0, &(if (Enum.member?(matched, &1)) do &2+1 else &2 end))
    |> (fn acc -> acc >= ((length(test) + 1)/2) end).()
  end

  def split_answer(answer) do
    answer
    |> String.replace(",", " ")
    |> String.replace("\"", "")
    |> String.replace("(", "")
    |> String.replace(")", "")
    |> remove_tags
    |> String.split([" ", "-", "_"])
  end

  def remove_tags(answer) do
    answer
    |> String.replace(~r/<...>|<..>|<.>/, "")
  end

end
