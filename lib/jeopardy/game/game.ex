defmodule Jeopardy.Game do

  alias Jeopardy.Game.Board
  alias Jeopardy.Game.Player
  alias Jeopardy.AnswerChecker

  @num_players 2 # TODO increase this

  def new do
    %{
      turn: "", # username of Player who picks the next question
      board: Board.new(), # a Board object
      question: nil, # the current question, %{category: "", value: ""}
      completed: nil, # which questions were already answered, in the form: %{"category_1": [200, 400...], "category2": [800], ...}
      players: %{},
      active: false,
      last_answer: %{
        correct: false,
        value: ""
      }
      # map of Player objects, keyed by username
    }
  end

  def client_view(game) do
    %{
      game_state: get_game_state(game), # one of JOINING, SELECTING, ANSWERING, GAME_OVER
      turn: game.turn,
      winner: get_winner(game),
      question: question_client_view(game, game.question),
      last_answer: game.last_answer,
      board: Board.client_view(game.board, game.completed),
      players: players_client_view(game.players)
    }
  end

  defp players_client_view(players) do
    Map.new(Enum.map(players, fn {name, p} -> {name, Player.client_view(p)} end))
  end

  defp question_client_view(_game, nil), do: nil
  defp question_client_view(game, question) do
    %{
      category: question.category,
      value: question.value,
      question: Board.get_question(game.board, question.category, question.value)
    }
  end

  # Joining ----------------------------------------------------------------------------------------

  def add_player(game, player_name, number) do
    if can_join?(game, player_name) do
      player = Player.new(player_name, number)
      game
      |> Map.put(:players, Map.put(game.players, player_name, player))
      |> set_turn(player_name)
    else
      game
    end
  end

  def set_turn(game, player_name) do
    if game.turn == "" do
      Map.put(game, :turn, player_name)
    else
      game
    end
  end

  def start_game(game) do
    if (map_size(game.players) >= @num_players) do
      game
      |> Map.put(:active, true)
    else
      game
    end
  end

  # Answering Questions ----------------------------------------------------------------------------

  def valid_question_selection(game, username, category, value) do
    correct_user? = username == game.turn
    category_completed = game.completed[category]
    question_already_answered? = category_completed != nil and
                                 Enum.member?(category_completed, to_string(value))
    valid_value = rem(value, 200) == 0 and value / 200 >= 1 and value / 200 <= 5
    correct_user? and not question_already_answered? and valid_value
  end

  def new_question(game, category, value) do
    IO.inspect(Board.get_answer(game.board, category, value))
    game
    |> Map.put(:question, %{category: category, value: value})
  end

  def set_answer(game, username, answer) do
    player = Map.get(game.players, username)
    players = Map.put(game.players, username, Player.set_answer(player, answer))
    Map.put(game, :players, players)
  end

  def check_answer(game, username, answer) do
    formatted_answer = Board.get_answer(game.board, game.question.category, game.question.value)
                       |> AnswerChecker.remove_tags
                       |> String.replace("\\'", "\'")
    if correct_answer?(game, answer) do
      player = Map.get(game.players, username)
               |> Player.add_to_score(parse_score(game.question.value))

      game
      |> Map.put(:turn, username) # user who answers correctly gets to pick next question
      |> Map.put(:players, Map.put(game.players, username, player))
      |> Map.put(:completed, mark_question_completed(game.completed, game.question))
      |> Map.put(:question, nil)
      |> Map.put(
           :last_answer,
           %{
             value: formatted_answer,
             correct: true
           }
         )
      |> clear_answers
    else
      game
      |> Map.put(:turn, next_username(game, username)) # next player picks next question
      |> Map.put(:completed, mark_question_completed(game.completed, game.question))
      |> Map.put(
           :last_answer,
           %{
             value: formatted_answer,
             correct: false
           }
         )
      |> Map.put(:question, nil)
      |> clear_answers
    end
  end

  def parse_score(score) do
    if is_integer(score) do
      score
    else
      {value, _} = Integer.parse(score)
      value
    end
  end

  # get the username of the next player after the given one
  defp next_username(game, username) do
    players = Map.keys(game.players)
    idx = Enum.find_index(players, fn name -> name == username end)
    idx = rem(idx + 1, length(players))
    Enum.at(players, idx)
  end

  defp mark_question_completed(nil, question) do
    %{question.category => [Integer.to_string(question.value)]}
  end
  defp mark_question_completed(completed, question) do
    Map.put(
      completed,
      question.category,
      [Integer.to_string(question.value) | (Map.get(completed, question.category) || [])]
    )
  end

  def clear_answers(game) do
    players = game.players
              |> Enum.map(fn {name, p} -> {name, Player.set_answer(p, "")} end)
              |> Map.new()

    Map.put(game, :players, players)
  end

  def correct_answer?(game, nil), do: false
  def correct_answer?(game, ""), do: false
  def correct_answer?(game, answer) do
    correct_answer = Board.get_answer(game.board, game.question.category, game.question.value)
    AnswerChecker.is_correct?(answer, correct_answer)
  end

  def get_numbers(game) do
    game.players
    |> Map.values
    |> Enum.map(&(&1.phone_number))
  end

  def get_winner(game) do
    if game_over?(game) do
      game.players
      |> Map.values
      |> Enum.reduce(
           %{score: -1},
           fn player, acc ->
             if(player.score > acc.score) do
               player
             else
               acc
             end
           end
         )
    else
      nil
    end
  end

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
    get_game_state(game) == "JOINING" && !Map.has_key?(game.players, player_name)
  end

  def enough_players?(game) do
    map_size(game.players) >= @num_players && game.active
  end

  def answer_time?(game) do
    game.question != nil && !Enum.any?(game.players, fn {_name, p} -> Player.answered?(p) end)
  end

  def game_over?(game) do
    Board.all_done?(game.board, game.completed)
  end

  def coordinate_to_category(game, coordinate) do
    letters = ["A", "B", "C", "D", "E", "F"]
    index = Enum.find_index(
      letters,
      fn x ->
        String.downcase(x) == String.downcase(coordinate)
      end
    )
    Map.keys(game.board)
    |> Enum.at(index)
  end

  def phone_to_username(game, number) do
    {name, player} = hd(
      Enum.filter(
        game.players,
        fn {name, player} ->
          number == player.phone_number
        end
      )
    )
    name
  end
end
