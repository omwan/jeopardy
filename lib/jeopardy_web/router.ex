defmodule JeopardyWeb.Router do
  use JeopardyWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
    plug :fetch_session
    plug :fetch_flash
  end

  scope "/", JeopardyWeb do
    pipe_through :browser

    get "/", PageController, :index
    get "/game/:name", PageController, :index
    get "/users/new", PageController, :index
    get "/users/:id/edit", PageController, :index
    get "/users/:id/show", PageController, :index
  end

  # Other scopes may use custom stacks.
  scope "/api/v1", JeopardyWeb do
     pipe_through :api

     resources "/users", UserController, except: [:new, :edit]
     resources "/records", RecordController, except: [:new, :edit]

     post "/auth", AuthController, :authenticate
     delete "/auth", AuthController, :logout

     post "/sms", TwilioController, :receive
   end

end
