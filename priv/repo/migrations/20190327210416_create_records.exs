defmodule Jeopardy.Repo.Migrations.CreateRecords do
  use Ecto.Migration

  def change do
    create table(:records) do
      add :player, :string, null: false
      add :score, :integer, null: false, default: 0
      add :game, :string, null: false
      add :user_id, references(:users, on_delete: :nilify_all)

      timestamps()
    end

    create index(:records, [:user_id])
  end
end
