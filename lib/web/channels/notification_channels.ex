defmodule Monitoring.NotificationChannel do
  use Phoenix.Channel

  def join("channel:notifications", _message, socket) do
    {:ok, socket}
  end

  def handle_in(_) do
    nil
  end
end
