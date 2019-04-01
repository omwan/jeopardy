defmodule Jeopardy.Game do
  
  alias Jeopardy.Game.Board
  alias Jeopardy.Game.Player

  @num_players 2 # TODO increase this

  def new do
    %{
      turn: "",              # string corresponding to the username of player who's turn it is
      board: Board.new(),    # a Board object    
      question: nil,         # the current question, %{category: "", value: ""}
      completed: nil,        # which questions were already answered, in the form: %{"category_1": [200, 400...], "category2": [800], ...}
      players: []            # list of Player objects
    }
  end

  def client_view(game) do
    %{
      game_state: get_game_state(game), # one of JOINING, SELECTING, ANSWERING, GAME_OVER
      turn: game.turn,
      question: game.question,
      board: Board.client_view(game.board, game.completed),
      players: Enum.map(game.players, &(Player.client_view(&1)))
    }
  end

  # Joining ----------------------------------------------------------------------------------------

  def add_player(game, player_name) do
    if can_join?(game, player_name) do
      player = Player.new(player_name)
      game
      |> Map.put(:players, [player | game.players])
    else
      game
    end   
  end
  
  # Answering Questions ----------------------------------------------------------------------------

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
  """

  # Game Status ------------------------------------------------------------------------------------

  # game state is one one of:
  #   JOINING   - waiting for more players to join
  #   SELECTING - choosing the next question to answer
  #   ANSWERING - answering the current question
  #   GAMEOVER  - game is over
  def get_game_state(game) do
    cond do
      game_over?(game) -> "GAMEOVER"
      answer_time?(game) -> "ANSWERING"
      enough_players?(game) -> "SELECTING"
      true -> "JOINING"
    end
  end

  def can_join?(game, player_name) do
    get_game_state(game) == "JOINING" && !Enum.member?(Enum.map(game.players, &(&1.name)), player_name)
  end

  def enough_players?(game) do
    length(game.players) == @num_players
  end

  def answer_time?(game) do
    game.question != nil && Enum.all?(game.players, &(Player.answered?(&1)))
  end

  # TODO
  def game_over?(game) do
    false 
    # Board.all_done?(game.board) # Enum.all?(board, &(Category.all_done?(&1))) -> Enum.all?(category, &(&1.answered))
  end
  
  # DO THE JEOPARDY API
end
