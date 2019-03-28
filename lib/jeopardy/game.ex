defmodule Jeopardy.Game do
  @doc """
  def new do
    %{
      game_state: "JOINING"      # game_state is one of JOINING, SELECTING, NEXT_QUESTION, RECEIVING
      turn: "",                  # string corresponding to the username of player who's turn it is
      board: %{},                # A Board object    
      question: %{},             # question category, question value
      players: %{}               # A Player object
    }
  end

  def client_view(game) do
    %{
      game_state: game.game_state,
      turn: game.turn,
      current_question: ,
      current_board: Board.client_view(game.board),
      players: Enum.map(game.players, &(Player.client_view(&1)))
    }
  end

  def answer_correct?(game, input) do
    if Question.match?(game.question, input.answer) do
      updated_players = Enum.map(game.players, &(if(&1.username == input.player) do Map.put(&1, :score, &1.score + game.question.points)  end))
      game
      |> Map.put(:game_state, "NEXT_QUESTION")
      |> Map.put(:turn, input.player)
      |> Map.put(:players, updated_players)
    else
      Map.put(game, :game_state, "RECEIVING")
    end
  end

  def game_over?(game) do
    Board.all_done?(game.board) # Enum.all?(board, &(Category.all_done?(&1))) -> Enum.all?(category, &(&1.answered))
  end

  def new_question(game, input) do
    game
    |> Map.put(:game_state, "RECEIVING")
    |> Map.put(:question, JEOPARDY_HELP(input.selection))
  end
  """
  # DO THE JEOPARDY API
end
