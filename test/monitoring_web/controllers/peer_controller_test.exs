defmodule MonitoringWeb.PeerControllerTest do
  use MonitoringWeb.ConnCase

  alias Monitoring.Monitoring
  alias Monitoring.Monitoring.Peer

  @create_attrs %{childs: [], last_sync: "2010-04-17 14:00:00.000000Z", lat: 120.5, long: 120.5, peers: [], prefix: "some prefix", routingTable: [], support_assets: [], uptime: ~T[14:00:00.000000]}
  @update_attrs %{childs: [], last_sync: "2011-05-18 15:01:01.000000Z", lat: 456.7, long: 456.7, peers: [], prefix: "some updated prefix", routingTable: [], support_assets: [], uptime: ~T[15:01:01.000000]}
  @invalid_attrs %{childs: nil, last_sync: nil, lat: nil, long: nil, peers: nil, prefix: nil, routingTable: nil, support_assets: nil, uptime: nil}

  def fixture(:peer) do
    {:ok, peer} = Monitoring.create_peer(@create_attrs)
    peer
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all peers", %{conn: conn} do
      conn = get conn, peer_path(conn, :index)
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create peer" do
    test "renders peer when data is valid", %{conn: conn} do
      conn = post conn, peer_path(conn, :create), peer: @create_attrs
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get conn, peer_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id,
        "childs" => [],
        "last_sync" => "2010-04-17 14:00:00.000000Z",
        "lat" => 120.5,
        "long" => 120.5,
        "peers" => [],
        "prefix" => "some prefix",
        "routingTable" => [],
        "support_assets" => [],
        "uptime" => ~T[14:00:00.000000]}
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post conn, peer_path(conn, :create), peer: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update peer" do
    setup [:create_peer]

    test "renders peer when data is valid", %{conn: conn, peer: %Peer{id: id} = peer} do
      conn = put conn, peer_path(conn, :update, peer), peer: @update_attrs
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get conn, peer_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id,
        "childs" => [],
        "last_sync" => "2011-05-18 15:01:01.000000Z",
        "lat" => 456.7,
        "long" => 456.7,
        "peers" => [],
        "prefix" => "some updated prefix",
        "routingTable" => [],
        "support_assets" => [],
        "uptime" => ~T[15:01:01.000000]}
    end

    test "renders errors when data is invalid", %{conn: conn, peer: peer} do
      conn = put conn, peer_path(conn, :update, peer), peer: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete peer" do
    setup [:create_peer]

    test "deletes chosen peer", %{conn: conn, peer: peer} do
      conn = delete conn, peer_path(conn, :delete, peer)
      assert response(conn, 204)
      assert_error_sent 404, fn ->
        get conn, peer_path(conn, :show, peer)
      end
    end
  end

  defp create_peer(_) do
    peer = fixture(:peer)
    {:ok, peer: peer}
  end
end
