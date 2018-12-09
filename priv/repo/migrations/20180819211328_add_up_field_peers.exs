defmodule Monitoring.Repo.Migrations.AddAdditionalFieldPeers do
  use Ecto.Migration

  def change do
    alter table("peers") do
      add :up , :boolean
    end
  end
end
