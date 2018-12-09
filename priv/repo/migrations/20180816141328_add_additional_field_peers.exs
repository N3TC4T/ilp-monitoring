defmodule Monitoring.Repo.Migrations.AddAdditionalFieldPeers do
  use Ecto.Migration

  def change do
    alter table("peers") do
      add :childs,  {:array, :map}
    end
  end
end
