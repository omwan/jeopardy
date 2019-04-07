defmodule JeopardyWeb.RecordView do
  use JeopardyWeb, :view
  alias JeopardyWeb.RecordView

  def render("index.json", %{records: records}) do
    %{data: render_many(records, RecordView, "record.json")}
  end

  def render("show.json", %{record: record}) do
    %{data: render_one(record, RecordView, "record.json")}
  end

  def render("record.json", %{record: record}) do
    %{
      id: record.id,
      player: record.player,
      score: record.score,
      game: record.game,
      timestamp: record.updated_at,
      user_id: record.user_id
    }
  end
end
