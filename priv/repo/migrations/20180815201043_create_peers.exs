defmodule Monitoring.Repo.Migrations.CreatePeers do
  use Ecto.Migration

  def change do
    create table(:peers) do
      add :prefix, :string
      add :peers, {:array, :map}
      add :routingTable, {:array, :map}
      add :lat, :float
      add :long, :float
      add :hostname, :string
      add :last_sync, :utc_datetime
      add :uptime, :string
      add :support_assets, {:array, :string}

      timestamps()
    end

    create unique_index(:peers, [:prefix])
  end
end
