defmodule Monitoring.Repo.Migrations.CreateAuthTokens do
  use Ecto.Migration

  def change do
    create table(:auth_tokens) do
      add :prefix, :text
      add :token, :text
      add :revoked, :boolean, default: false, null: false
      add :revoked_at, :utc_datetime

      timestamps()
    end

    create unique_index(:auth_tokens, [:prefix])
    create unique_index(:auth_tokens, [:token])
  end
end
