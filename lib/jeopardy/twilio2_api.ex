defmodule Jeopardy.Twilio2API do

  ## 4245811119


  def send_message(to, body) do
    hackney = [
      basic_auth: {System.get_env("TWILIO_ACCOUNT_SID"),
        System.get_env("TWILIO_AUTH_TOKEN")}
    ]
    url = "https://api.twilio.com/2010-04-01/Accounts/#{System.get_env("TWILIO_ACCOUNT_SID")}/Messages.json"
    body = {:form, [{"To", to}, {"From", System.get_env("TWILIO_TEST_NUMBER")}, {"Body", body}]}
    headers = [{"Content-Type", "application/x-www-form-urlencoded"}]
    with {:ok, response} <- HTTPoison.post(url, body, headers, hackney: hackney) do
      {:ok, response_body} = Jason.decode(response.body)
      response_body
    end
  end

end
