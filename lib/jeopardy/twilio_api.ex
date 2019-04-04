defmodule Jeopardy.TwilioAPI do

  alias ExTwilio.Message
  alias ExTwilio.Api

  def send_message(to, body) do
    #Api.create(Message, [to: to, from: System.get_env("TWILIO_NUMBER"), body: body])
    Api.create(Message, [to: to, from: "4245811119", body: body])
  end

end
