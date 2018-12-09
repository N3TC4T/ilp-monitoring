defmodule Monitoring.Alert do
  use Ecto.Schema
  import Ecto.Query
  import Ecto.Changeset

  alias Monitoring.{Repo, Alert}

  schema "alerts" do
    field :status, :string
    field :type, :string
    belongs_to :peer, Monitoring.Peer

    timestamps()
  end

  @doc false
  def changeset(alert, attrs) do
    alert
    |> cast(attrs, [:type, :status])
    |> validate_required([:type, :status])
  end


  @doc """
  Returns the list of peers.

  """
  def list_alerts do
    Alert
    |> Repo.all()
    |> Repo.preload([:peer])
  end

  @doc """
  Gets a single peer.

  Raises `Ecto.NoResultsError` if the Peer does not exist.

  """
  def get_alert!(id), do: Repo.get!(Alert, id)


  @doc """
  Get list unresolved alerts
  """
  def list_problem_alerts peer, type do
    Alert
    |> where(status: "PROBLEM")
    |> Repo.all
  end

  @doc """
  Set and alert for peer
  """
  def set peer, type do
    %Alert{
      status: "PROBLEM",
      type: type,
      peer_id: peer
    }
    |> Repo.insert!

    MonitoringWeb.Endpoint.broadcast("channel:notifications", "alert", %{peer: peer, type: type, status: 'DOWN'})
  end

  @doc """
  Resolve alert
  """
  def resolve peer, type do
    Alert
    |> where(type: ^type)
    |> where(peer_id: ^peer)
    |> where(status: "PROBLEM")
    |> Repo.one
    |> Alert.changeset(%{type: type, status: "RESOLVED"})
    |> Repo.update!

    MonitoringWeb.Endpoint.broadcast("channel:notifications", "alert", %{peer: peer, type: type, status: 'RESOLVED'})
  end
end
