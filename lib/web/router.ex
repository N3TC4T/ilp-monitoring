defmodule MonitoringWeb.Router do
  use MonitoringWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  pipeline :webhook do
    plug :accepts, ["json"]
    plug Monitoring.Plug.HookAuthenticate
  end

  scope "/", MonitoringWeb do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
  end

  scope "/webhook", MonitoringWeb do
    pipe_through :webhook

    post "/agent", AgentController, :handle
  end

  scope "/api", MonitoringWeb do
    pipe_through :api

    resources "/peers", PeerController
    resources "/alerts", AlertController
  end

  # Other scopes may use custom stacks.
  # scope "/api", MonitoringWeb do
  #   pipe_through :api
  # end
end
