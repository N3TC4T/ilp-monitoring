defmodule Monitoring.Peer do
  use Ecto.Schema
  import Ecto.Changeset


  alias Monitoring.{Repo, Peer}


  schema "peers" do
    field :up, :boolean
    field :hostname, :string
    field :last_sync, :utc_datetime
    field :lat, :float
    field :long, :float
    field :peers, {:array, :map}
    field :childs, {:array, :map}
    field :prefix, :string
    field :routingTable, {:array, :map}
    field :support_assets, {:array, :string}
    field :uptime, :string

    timestamps()
  end

  @doc false
  def changeset(peer, attrs) do
    peer
    |> cast(attrs, [:up, :prefix, :peers, :routingTable, :lat, :long, :hostname, :last_sync, :uptime, :support_assets])
    |> validate_required([:prefix])
    |> unique_constraint(:prefix)
  end



  @doc """
  Returns the list of peers.

  """
  def list_peers do
    Repo.all(Peer)
  end

  @doc """
  Gets a single peer.

  Raises `Ecto.NoResultsError` if the Peer does not exist.

  """
  def get_peer!(id), do: Repo.get!(Peer, id)


  @doc """
  Register Or Update peer.
  """
  def register_or_update peer do
    case Peer |> Repo.get_by(prefix: peer.prefix) do
      nil -> peer # build new peer struct
      peer -> peer   # pass through existing peer struct
    end
    |> Peer.changeset(peer |> Map.from_struct)
    |> Repo.insert_or_update
  end
end
