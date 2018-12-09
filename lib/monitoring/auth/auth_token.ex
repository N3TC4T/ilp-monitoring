defmodule Monitoring.AuthToken do
  use Ecto.Schema
  import Ecto.Changeset

  alias Monitoring.{Repo, AuthToken}

  schema "auth_tokens" do
    field :prefix, :string
    field :revoked, :boolean, default: false
    field :revoked_at, :utc_datetime
    field :token, :string

    timestamps()
  end

  @doc false
  def changeset(auth_token, attrs) do
    auth_token
    |> cast(attrs, [:prefix, :token, :revoked, :revoked_at])
    |> validate_required([:prefix, :token, :revoked, :revoked_at])
    |> unique_constraint(:prefix)
    |> unique_constraint(:token)
  end


  def authorize(token, prefix) do
    case AuthToken |> Repo.get_by(token: token) do
      nil -> {:not_found , "TOKEN NOT FOUND"}
      token -> case token.prefix == prefix do
                true -> :ok
                false -> {:error , "UNAUTORIZED ACCESS"}
               end
    end
  end
end
