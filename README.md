# Jeopardy

To start your Phoenix server:

  * Install dependencies with `mix deps.get`
  * Create and migrate your database with `mix ecto.setup`
  * Install Node.js dependencies with `cd assets && npm install`
  * Start Phoenix endpoint with `mix phx.server`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

Ready to run in production? Please [check our deployment guides](https://hexdocs.pm/phoenix/deployment.html).

## Learn more

  * Official website: http://www.phoenixframework.org/
  * Guides: https://hexdocs.pm/phoenix/overview.html
  * Docs: https://hexdocs.pm/phoenix
  * Mailing list: http://groups.google.com/group/phoenix-talk
  * Source: https://github.com/phoenixframework/phoenix

Accessing the Jeopardy API
- Jeopardy API is accessed at most 7 times
  + once for to get categories
  + six times to get the questions for each category
- Jeopardy questions from before November 26, 2001 have their point values doubled to match current values
- Jeopardy questions with unknown values are assigned a random point value (200, 400, 600, 800, or 1000)
