# Jeopardy

## Running the App

To start your Phoenix server:

  * Install dependencies with `mix deps.get`
  * Create and migrate your database with `mix ecto.setup`
  * Install Node.js dependencies with `cd assets && npm install`
  * Start Phoenix endpoint with `mix phx.server`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

## Mocking Texts

Use [Postman](https://www.getpostman.com/) to post mocked texts to `localhost:4000/api/v1/sms` with the following format:

```
{
  "From": <phone number sending text>,
  "Body": <body of text>
}
```
* The phone number should be a string
* The body of the text should follow the formats detailed in the "Playing The Game" section below

## Playing the Game

1. Log in
2. Create a new game by giving it a name
3. Have players join the game by texting `<game name>:<username>`, eg: `demo:olivia` to the number shown on screen
4. When all players have joined, click "Start Game"
5. Select a question by texting `<category letter>:<value>`, eg: `A:200`, to the number shown on screen. Or, you can click the desired category (the app will assume it is the player whose turn it is doing the selecting)
6. To answer a question, text your answer to the number shown on screen as fast as you can
7. The game ends when all questions have been answered

_Please note:_ You must verify your phone number with Twilio (through their API admin console) in order to play the game.

## Design Decisions

### Accessing the Jeopardy API
  * Jeopardy API is accessed at most 7 times
    * once to get categories
    * six times to get the questions for each category
  * Jeopardy questions from before November 26, 2001 have their point values doubled to match current values
  * Jeopardy questions with unknown values are assigned a random point value (200, 400, 600, 800, or 1000)

### User Accounts
  * Registering a new user does not immediately log the current user in under that account
  * Users can only edit their own accounts information
  * Users must be logged in to edit their accounts
  * User passwords must be at least 8 characters long, and contain both upper and lower-case characters, as well as at least one number

### Records
  * Records represent the results of past games
  * Records are associated with a user account
  * If a user deletes their account, associated records will not be deleted to preserve any high scores despite the fact that the user responsible has quit the app
  * The UI does not provide a way to delete records, to mimic the behavior of a genuine high score leaderboard

## Modified Jeopardy Rules
For ease of implementation, we chose to slightly modify the rules of Jeopardy. 

  * In normal Jeopardy, players must phrase their answers in the form of a question. In our implementation, they can omit the "What is/are..." and simply submit their answer without phrasing it as a question.
  * In normal Jeopardy, players must race to buzz in before answering a question. In our implementation, players race to submit their answer as quickly as they can. The first person to type and submit their answer will get their answer checked.
  * In normal Jeopardy, if the player that buzzed answers incorrectly, the player who buzzed the second-fastest gets to try to answer the question. In our implementation, if the first person to submit their answer was wrong, no one gets that point and the question cannot be answered again. 
  * In normal Jeopardy, the last round consists of "Final Jeopardy", where contestants can wager up to all of their score, and all contestants have the chance to submit an answer for the last question. Our implementation does not include Final Jeopardy.
  
## Game Implemention
* You must verify your phone number with Twilio (through their API admin console) in order to play the game
* Categories will always come back in alphabetical order from left to right, and therefore are assigned letters A-F. To select a question via text, users can text the letter of the category followed by the point vlaue of the question
* If a user submits an incorrect answer, the next turn goes to the next player in the game based on alphabetical order
* Answer-checking is imperfect: it looks for "majority correct" words by string-splitting both the correct and submitted answer and comparing them. We also don't handle plurals (ex: "zebra" will be marked as incorrect if the expected answer was "zebras")
* If a user navigates back to the lobby in the middle of the game, the game name will not populate in the "Start A Game" input, but the user can click "Join" to re-join the game they were just in

## Known Issues
* Sometimes, the jService API returns unusable questions: either they contain images, and thus are incomplete, or are entirely blank (and the answer tends to repeat from another question)
* A user can join a game multiple times from the same phone number, however, this will result in points being awarded only to the username that comes alphabetically first
