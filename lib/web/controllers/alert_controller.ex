defmodule MonitoringWeb.AlertController do
  use MonitoringWeb, :controller

  alias Monitoring.{Alert}

  action_fallback MonitoringWeb.FallbackController

  def index(conn, _params) do
    alerts = Alert.list_alerts()
    render(conn, "index.json", alerts: alerts)
  end

  def show(conn, %{"id" => id}) do
    alert = Alert.get_alert!(id)
    render(conn, "show.json", alert: alert)
  end

end
