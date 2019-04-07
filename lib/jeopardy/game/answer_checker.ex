defmodule Jeopardy.AnswerChecker do

  def is_correct?(submitted, actual) do
    actual_split = split_answer(String.downcase(actual))
    submit_split = split_answer(String.downcase(submitted))

    majority_match?(actual_split, submit_split) and majority_match?(submit_split, actual_split)
  end

  def majority_match?(test, matched) do
    test
    |> Enum.reduce(0, &(if (Enum.member?(matched, &1)) do &2+1 else &2 end))
    |> majority?(length(matched))
  end

  def majority?(test_size, actual_size) do
    floor((actual_size + 1) / 2) <= test_size 
  end

  def split_answer(answer) do
    answer
    |> String.replace_prefix("the ", "")
    |> String.replace_prefix("a ", "")
    |> String.replace(", ", " ")
    |> String.replace(",", " ")
    |> String.replace(".", "")
    |> String.replace("\"", "")
    |> String.replace("\\'", "\'")
    |> String.replace("&", " ")
    |> String.replace(" and ", " ")
    |> String.replace("%", " percent")
    |> String.replace("{", "")
    |> String.replace("}", "")
    |> String.replace("(", "")
    |> String.replace("[", "")
    |> String.replace("]", "")
    |> String.replace(")", "")
    |> remove_tags
    |> String.split([" ", "-", "_", ";", ":"])
    |> remove_empty_strings
  end

  def remove_tags(answer) do
    answer
    |> String.replace(~r/<...>|<..>|<.>/, "")
  end

  def remove_empty_strings(answer) do
    answer
    |> Enum.filter(&(String.length(&1) > 0))
  end

end
