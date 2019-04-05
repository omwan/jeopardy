# Jeopardy

## Gameplay

* Post mocked texts to `localhost:4000/api/v1/sms` with the following format:

```
{
  "From": <phone number sending text>,
  "Body": <body of text>
}
```

* To join a game, text `<game name>:<username>`, eg: `demo:olivia`
* To select a question, text `<category letter>:<value>`, eg: `A:200`
* To answer a question, text your answer

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

### User Accounts
  * Registering a new user does not immediately log the current user in under that account
  * Users can only edit their own accounts information
  * Users must be logged in to edit their accounts
  * User passwords must be at least 8 characters long, and contain both upper and lower-case characters, as well as at least one number