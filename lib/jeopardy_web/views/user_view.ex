defmodule JeopardyWeb.UserView do
  use JeopardyWeb, :view
  alias JeopardyWeb.UserView

  def render("index.json", %{users: users}) do
    %{data: render_many(users, UserView, "user.json")}
  end

  def render("show.json", %{user: user}) do
    %{data: render_one(user, UserView, "user.json")}
  end

  def render("user.json", %{user: user}) do
    %{
      id: user.id,
      username: user.username,
      admin: user.admin,
      records: JeopardyWeb.RecordView.render(
        "index.json",
        %{records: user.records}
      ).data
    }
  end
end
