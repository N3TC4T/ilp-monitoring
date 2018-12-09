defmodule MonitoringWeb.PeerController do
  use MonitoringWeb, :controller

  alias Monitoring.{Peer}

  action_fallback MonitoringWeb.FallbackController

  def index(conn, _params) do
    peers = Peer.list_peers()
    render(conn, "index.json", peers: peers)
  end

  def show(conn, %{"id" => id}) do
    peer = Peer.get_peer!(id)
    render(conn, "show.json", peer: peer)
  end

end
