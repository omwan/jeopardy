defmodule Jeopardy.Records.Record do
  use Ecto.Schema
  import Ecto.Changeset

  schema "records" do
    field :player, :string
    field :score, :integer
    field :game, :string
    belongs_to :user, Jeopardy.Users.User

    timestamps()
  end

  @doc false
  def changeset(record, attrs) do
    record
    |> cast(attrs, [:player, :score, :game, :user_id])
    |> validate_required([:player, :score, :game, :user_id])
  end
end
