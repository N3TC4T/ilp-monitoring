defmodule MonitoringWeb.AlertView do
  use MonitoringWeb, :view
  alias MonitoringWeb.AlertView

  def render("index.json", %{alerts: alerts}) do
    %{data: render_many(alerts, AlertView, "alert.json")}
  end

  def render("show.json", %{alert: alert}) do
    %{data: render_one(alert, AlertView, "alert.json")}
  end

  def render("alert.json", %{alert: alert}) do
    %{status: alert.status,
      type: alert.type,
      peer: alert.peer.prefix,
      create_time: alert.inserted_at,
      resolve_time: alert.updated_at,
      now: NaiveDateTime.utc_now
    }
  end
end
