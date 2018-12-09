defmodule Monitoring.Repo.Migrations.CreateAlerts do
  use Ecto.Migration

  def change do
    create table(:alerts) do
      add :type, :string
      add :status, :string
      add :peer_id, references(:peers, on_delete: :nothing)

      timestamps()
    end

    create index(:alerts, [:peer_id])
  end
end
