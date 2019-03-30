defmodule Jeopardy.Users.User do
  use Ecto.Schema
  import Ecto.Changeset

  schema "users" do
    field :admin, :boolean, default: false
    field :password_hash, :string
    field :username, :string
    has_many :records, Jeopardy.Records.Record

    field :password, :string, virtual: true

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:username, :password, :admin])
    |> validate_password(:password)
    |> put_pass_hash()
    |> validate_required([:username, :password_hash])
    |> unique_constraint(:username)
  end

  # from Comeonin docs
  def validate_password(changeset, field, options \\ []) do
    validate_change(changeset, field, fn _, password ->
      case valid_password?(password) do
        {:ok, _} -> []
        {:error, msg} -> [{field, options[:message] || msg}]
      end
    end)
  end
  def valid_password?(password) when byte_size(password) > 7 do
    {:ok, password}
  end
  def valid_password?(_), do: {:error, "The password is too short"}

  # from class notes: http://khoury.neu.edu/~ntuck/courses/2019/01/cs4550/notes/14-multi-and-passwords/
  def put_pass_hash(%Ecto.Changeset{
      valid?: true, changes: %{password: password}} = changeset) do
    change(changeset, Argon2.add_hash(password))
  end
  def put_pass_hash(changeset), do: changeset
end
