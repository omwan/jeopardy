defmodule Jeopardy.JeopardyAPI do
  def create_board() do 
    resp = HTTPoison.get!("http://jservice.io/api/random?count=10")
    data = Jason.decode!(resp.body)
    categories = get_categories(6, data, [])
    categories
  end

  def get_categories(0, body, acc), do: acc
  def get_categories(number, body, acc) do
    if Enum.member?(acc, hd(body)["category_id"]) do
      get_categories(number, tl(body), acc)
    else
      get_categories(number-1, tl(body), [hd(body)["category_id"] | acc])
    end
  end
end
