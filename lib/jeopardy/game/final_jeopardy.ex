defmodule Jeopardy.Game.FinalJeopardy do

  alias Jeopardy.JeopardyAPI
  alias Jeopardy.AnswerChecker

  def new do
    final = hd(JeopardyAPI.get_final_jeopardy())
    %{
      category: final["category"]["title"],
      question: final["question"],
      answer: final["answer"]
    }
  end

  def client_view(game, game_state) do
    final = game.final_jeopardy
    cv = %{
      category: final.category,
      question: "",
      answer: ""
    }
    case game_state do
      "FINAL_CATEGORY" ->
        cv
      "FINAL_QUESTION" ->
        %{cv | question: final.question}
      game_state when game_state in ["FINAL_ANSWER", "GAME_OVER"] ->
        answer =
        %{cv | question: final.question, answer: final.answer}
      _ ->
        %{}
    end
  end

  def get_answer(game) do
    game.final_jeopardy.answer
  end

end
