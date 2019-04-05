defmodule Jeopardy.Game do

  alias Jeopardy.Game.Board
  alias Jeopardy.Game.Player

  @num_players 2 # TODO increase this

  def new do
    %{
      turn: "", # username of Player who picks the next question
      board: Board.new(), # a Board object
      question: nil, # the current question, %{category: "", value: ""}
      completed: nil, # which questions were already answered, in the form: %{"category_1": [200, 400...], "category2": [800], ...}
      players: %{},
      active: false,
      host_id: nil,
      # map of Player objects, keyed by username
    }
  end

  def client_view(game) do
    %{
      game_state: get_game_state(game), # one of JOINING, SELECTING, ANSWERING, GAME_OVER
      turn: game.turn,
      question: question_client_view(game, game.question),
      board: Board.client_view(game.board, game.completed),
      players: players_client_view(game.players)
    }
  end

  defp players_client_view(players) do
    Map.new(Enum.map(players, fn {name, p} -> {name, Player.client_view(p)} end))
  end

  defp question_client_view(_game, nil), do: nil
  defp question_client_view(game, question) do
    Board.get_question(game.board, question.category, question.value)
  end

  # Joining ----------------------------------------------------------------------------------------

  def add_player(game, player_name, number) do
    if can_join?(game, player_name) do
      player = Player.new(player_name, number)
      game
      |> Map.put(:players, Map.put(game.players, player_name, player))
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

  def set_host_id(game, host_id) do
    IO.inspect(host_id)
    game
    |> Map.put(:host_id, host_id)
  end

  # Answering Questions ----------------------------------------------------------------------------

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
    if correct_answer?(game, answer) do
      question = game.question

      player = Map.get(game.players, username)
               |> Player.add_to_score(parse_score(question.value))

      game
      |> Map.put(:turn, username) # user who answers correctly gets to pick next question
      |> Map.put(:players, Map.put(game.players, username, player))
      |> Map.put(:completed, update_completed(game.completed, question))
      |> Map.put(:question, nil)
      |> clear_answers
    else
      # TODO mark that a player has guessed incorrectly and check the next answer??
      game
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

  defp update_completed(nil, question) do
    %{question.category => [to_string(question.value)]}
  end
  defp update_completed(completed, question) do
    Map.put(completed, question.category,
      [to_string(question.value) | (Map.get(completed, question.category) || [])])
  end

  def clear_answers(game) do
    players = game.players
              |> Enum.map(fn {name, p} -> {name, Player.set_answer(p, "")} end)
              |> Map.new()

    Map.put(game, :players, players)
  end

  def correct_answer?(game, answer) do
    answer = String.downcase(answer)
    correct_answer = Board.get_answer(game.board, game.question.category, game.question.value)
                     |> String.downcase

    IO.puts correct_answer
    # check if one is a substring of the other ¯\_(ツ)_/¯
    correct_answer =~ answer || answer =~ correct_answer
  end

  def end_game(game) do
    {winner, score} = who_won(game)
    Jeopardy.Records.create_record(%{player: winner, score: score})
  end

  def get_numbers(game) do
    game.players
    |> Map.values
    |> Enum.map(&(&1.phone_number))
  end

  def who_won(game) do
    winner = game.players
             |> Map.values
             |> Enum.reduce(%{score: 0}, fn p, acc ->
                  if (p.score > acc.score) do p else acc end end)
    IO.inspect(winner)
    {winner.name, winner.score}
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
    if (game.completed != nil) do
      IO.inspect(game.completed)
      game.completed
      |> Map.values
      |> Enum.all?(&(length(&1) == 5))
    else
      false
    end
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
    {name, player} = hd(Enum.filter(
      game.players,
      fn {name, player} ->
        number == player.phone_number
      end
    ))
    name
  end

end
