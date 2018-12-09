defmodule Monitoring.Agent.Service do
  import Ecto.Query, warn: false

  alias Monitoring.{Repo, Peer, Alert}

  @doc """
  Sync Peers with routing table
  """
  def sync params do

    try do

      currentPeer = params |> convert |> Peer.register_or_update

      currentPeers = (from u in Peer, select: %{id: u.id, prefix: u.prefix, up: u.up}) |> Repo.all

      syncedPeers = Enum.reduce(get_in(params, ["routing", "localRoutingTable"]), [] ,
        fn {k,v}, n ->
          case Map.get(v, "path") do
            "" -> case Map.get(v, "nextHop") do
                    "" -> [get_in(params, ["accounts", "address"]) | n]
                    _ -> n
                  end
            _ -> [k | n]
          end
        end
      )

#      syncedPeers = List.delete(syncedPeers, "g.africa")


      Enum.each syncedPeers, fn(p) ->
        with peer = [%{}] <- Enum.filter(currentPeers, fn c -> c.prefix == p  end) do
          peer = List.first(peer)
          case peer.up do
            false ->
              %Peer{id: peer.id, prefix: peer.prefix}
              |> Peer.changeset(%{up: true})
              |> Repo.update!()
              # resolve alert
              Alert.resolve peer.id, "DOWN"
            _ -> nil

          end
        else [] -> Repo.insert(%Peer{prefix: p, up: true})
        end
      end

      # in case of peer down
      Enum.each currentPeers , fn(p) ->
        case !Enum.member?(syncedPeers, p.prefix) and p.up == true do
          true ->
            %Peer{id: p.id, prefix: p.prefix}
            |> Peer.changeset(%{up: false})
            |> Repo.update!()
            #set an alert for peer
            Alert.set p.id , "DOWN"
          _ -> nil
        end
      end

      MonitoringWeb.Endpoint.broadcast("channel:notifications", "notify", %{type: "sync"})


      :ok

    rescue
      RuntimeError -> {:error, "Unexpected Error!"}
    end

  end

  @doc """
  Convert agent data to peer instance
  """
  def convert(params) do
    peers = Enum.reduce(get_in(params, ["accounts", "accounts"]), [] ,
      fn {k,v}, n ->
        case get_in(v, ["info", "relation"]) do
          "peer" -> n ++ [%{
            name: k,
            connected: Map.get(v, "connected", false),
            assetCode: get_in(v, ["info", "assetCode"]),
            plugin: get_in(v, ["info", "plugin"])
          }]
          _ -> n

        end
      end
    )

    childs = Enum.reduce(get_in(params, ["accounts", "accounts"]), [] ,
      fn {k,v}, n ->
        case get_in(v, ["info", "relation"]) do
          "child" -> n ++ [%{
            name: k,
            connected: Map.get(v, "connected", false),
            assetCode: get_in(v, ["info", "assetCode"]),
            plugin: get_in(v, ["info", "plugin"])
          }]
          _ -> n
        end
      end
    )

    routingTable = Enum.reduce(get_in(params, ["routing", "localRoutingTable"]), [] ,
      fn {k,v}, n ->
        n ++ [%{
          prefix: k,
          path: Map.get(v, "path")
        }]
      end
    )

    %Peer{
      prefix: get_in(params, ["accounts", "address"]),
      hostname: Map.get(params, "hostname", "-"),
      uptime: Map.get(params, "uptime", "-"),
      last_sync: Map.get(params, "capture_time", 0) |> DateTime.from_unix!(:millisecond),
      lat: Map.get(params, "latlng", 0) |> List.first,
      long: Map.get(params, "latlng", 0) |> List.last,
      peers: peers,
      childs: childs,
      routingTable: routingTable,
      up: true
    }
  end

end
