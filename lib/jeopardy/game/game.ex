defmodule Jeopardy.Game do
  
  alias Jeopardy.Game.Board
  alias Jeopardy.Game.Player

  def new do
    %{
      game_state: "JOINING",     # game_state is one of JOINING, SELECTING, NEXT_QUESTION, RECEIVING
      turn: "",                  # string corresponding to the username of player who's turn it is
      board: Board.new(),  # A Board object    
      current_question: nil,     # %{category: "", value: ""}
      completed: nil,            # which questions were already answered, in the form: %{"category_1": [200, 400...], "category2": [800], ...}
      players: []                # list of Player objects
    }
  end

  def add_player(game, player_name) do
    # TODO add logic related to max player #, avoiding players with duplicate names...
    player = Player.new(player_name)
    Map.put(game, :players, [player | game.players])
  end
  
  def client_view(game) do
    %{
      game_state: game.game_state,
      turn: game.turn,
      question: game.current_question,
      board: Board.client_view(game.board, game.completed),
      players: Enum.map(game.players, &(Player.client_view(&1)))
    }
  end

  def new_question(game, category, value) do
    game
    |> Map.put(:game_state, "RECEIVING")
    |> Map.put(:question, Board.get_question(game.board, category, value))
  end

  @doc """
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
  """
  # DO THE JEOPARDY API
end
