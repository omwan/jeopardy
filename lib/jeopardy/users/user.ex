defmodule Jeopardy.Users.User do
  use Ecto.Schema
  import Ecto.Changeset

  schema "users" do
    field :admin, :boolean, default: false
    field :password_hash, :string
    field :username, :string
    has_many :records, Jeopardy.Records.Record

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:username, :password_hash, :admin])
    |> validate_required([:username, :password_hash])
  end
end
