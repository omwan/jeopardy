# Jeopardy

## Running the App
To start your Phoenix server:

  * Install dependencies with `mix deps.get`
  * Create and migrate your database with `mix ecto.setup`
  * Install Node.js dependencies with `cd assets && npm install`
  * Start Phoenix endpoint with `mix phx.server`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

## Design Decisions

### Accessing the Jeopardy API
  * Jeopardy API is accessed at most 7 times
    * once for to get categories
    * six times to get the questions for each category
  * Jeopardy questions from before November 26, 2001 have their point values doubled to match current values
  * Jeopardy questions with unknown values are assigned a random point value (200, 400, 600, 800, or 1000)

### User Sessions
  * Registering a new user does not immediately log the current user in under that account