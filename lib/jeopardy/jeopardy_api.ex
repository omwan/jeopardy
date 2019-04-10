defmodule Jeopardy.JeopardyAPI do

  ### november 26, 2001 is the transition to double points
  @transition elem(DateTime.from_iso8601("2001-11-26T12:00:00Z"), 1)
  @num_categories 6
  @num_questions 5

  def create_board() do 
    resp = HTTPoison.get!("http://jservice.io/api/random?count=10")
    data = Jason.decode!(resp.body)
    get_categories(@num_categories, data, [])
    |> Enum.map(&(translate_category_by_id(&1)))
    |> Enum.reduce(fn x, acc -> Map.merge(x, acc) end)
  end

  def translate_category_by_id(id) do
    resp = HTTPoison.get!("http://jservice.io/api/category?id="<>Integer.to_string(id))
    data = Jason.decode!(resp.body)
    title = data["title"]
    clues = data["clues"]
    Map.put(%{}, title, get_random_qset(clues, %{}))
  end

  def get_random_qset(_clues, map) when map_size(map) == @num_questions, do: map
  def get_random_qset(clues, map) do
    random_clue = Enum.random(clues)
    clue_body = %{question: random_clue["question"], answer: random_clue["answer"]}
    if random_clue["value"] == nil do
      get_random_qset(clues, Map.put_new(map, Integer.to_string(Enum.random(1..5)*200), clue_body))
    else
      get_random_qset(clues, Map.put_new(map, get_clue_value(random_clue), clue_body))
    end
  end

  def get_clue_value(clue) do
    {_msg, date_aired, _} = DateTime.from_iso8601(clue["airdate"])
    if DateTime.compare(date_aired, @transition) == :lt do
      Integer.to_string(clue["value"] * 2)
    else
      Integer.to_string(clue["value"])
    end
  end

  def get_categories(0, _body, acc), do: acc
  def get_categories(number, body, acc) do
    if Enum.member?(acc, hd(body)["category_id"]) do
      get_categories(number, tl(body), acc)
    else
      get_categories(number-1, tl(body), [hd(body)["category_id"] | acc])
    end
  end

  def get_final_jeopardy do
    resp = HTTPoison.get!("http://jservice.io/api/random")
    Jason.decode!(resp.body)
  end
end
