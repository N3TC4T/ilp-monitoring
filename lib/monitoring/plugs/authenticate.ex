defmodule Monitoring.Plug.HookAuthenticate do

  import Plug.Conn,          only: [get_req_header: 2, put_status: 2, halt: 1]
  import Phoenix.Controller, only: [json: 2]

  alias Monitoring.{AuthToken}

  def init( opts ), do: opts

  def call(conn, _) do
    case authorize conn do
      {:error, message} ->
        conn
        |> put_status(:unauthorized)
        |> json(%{message: message})
        |> halt
      {:not_found, message} ->
        conn
        |> put_status(:unauthorized)
        |> json(%{message: message})
        |> halt
      :ok -> conn
    end
  end

  defp authorize( conn ) do
    token = get_req_header( conn, "x-token" ) |> List.first
    prefix = get_req_header( conn, "x-prefix" ) |> List.first

    case is_nil(token) or is_nil(prefix) do
      true -> {:error, "AUTH HEADERS REQUIRED"}
      _ -> AuthToken.authorize(token, prefix)
    end
  end
end
