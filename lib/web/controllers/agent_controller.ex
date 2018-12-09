defmodule MonitoringWeb.AgentController do
  use MonitoringWeb, :controller

  alias Monitoring.{Agent}

  def handle(conn, %{"_json" => params}) do
    with {:ok , parsed } = {:ok, %{}} <- Agent.Schema.parse(params) do
      parsed
      |> Agent.Service.sync
      |> case do
           :ok -> json conn, %{success: true}
           {:error, reason} -> json conn, %{success: false, message: reason }
         end
    else
      {:error, reason} ->
        IO.inspect reason
        json conn, %{success: false, message: reason}
    end
  end
end
