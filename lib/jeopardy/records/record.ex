defmodule Jeopardy.Records.Record do
  use Ecto.Schema
  import Ecto.Changeset

  schema "records" do
    field :player, :string
    field :score, :integer
    belongs_to :user, Jeopardy.Users.User

    timestamps()
  end

  @doc false
  def changeset(record, attrs) do
    record
    |> cast(attrs, [:player, :score, :user_id])
    |> validate_required([:player, :score, :user_id])
  end
end
