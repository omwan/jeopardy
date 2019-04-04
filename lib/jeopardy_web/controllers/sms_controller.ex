defmodule JeopardyWeb.SmsController do

  use JeopardyWeb, :controller

  alias JeopardyWeb.Sms

  def index(conn, %{"Body" => body, "From" => from, "To" => to}) do
    IO.inspect(body)
    response = ExTwilio.Api.create(ExTwilio.Message, [to: to, from: from, body: body])
    # response = send_message(from, body)
    IO.inspect(response)
    conn
    |> send_resp(:ok, Jason.encode!(%{data: response}))
  end

  def send_message(to, body) do
    account_sid = System.get_env("TWILIO_ACCOUNT_SID")
    auth_token = System.get_env("TWILIO_AUTH_TOKEN")
    trial_numer = "4245811119"
    hackney = [basic_auth: {account_sid, auth_token}]
    url = "https://api.twilio.com/2010-04-01/Accounts/" <> account_sid <> "/Messages.json"
    body = {:form, [{"To", to}, {"From", trial_number}, {"Body", body}]}
    headers = [{"Content-Type", "application/x-www-form-urlencoded"}]
    with {:ok, response} <- HTTPoison.post(url, body, headers, hackney: hackney) do
      {:ok, response_body} = Jason.decode(response.body)
      response_body
    end
  end


end
