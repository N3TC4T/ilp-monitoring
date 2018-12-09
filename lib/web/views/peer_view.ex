defmodule MonitoringWeb.PeerView do
  use MonitoringWeb, :view
  alias MonitoringWeb.PeerView

  def render("index.json", %{peers: peers}) do
    %{data: render_many(peers, PeerView, "peer.json")}
  end

  def render("show.json", %{peer: peer}) do
    %{data: render_one(peer, PeerView, "peer.json")}
  end

  def render("peer.json", %{peer: peer}) do
    %{id: peer.id,
      up: peer.up,
      prefix: peer.prefix,
      peers: peer.peers,
      routingTable: peer.routingTable,
      lat: peer.lat,
      long: peer.long,
      last_sync: peer.last_sync,
      uptime: peer.uptime,
      support_assets: peer.support_assets,
      childs: peer.childs,
      register_time: peer.inserted_at
    }
  end
end
