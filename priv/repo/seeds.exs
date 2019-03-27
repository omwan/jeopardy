# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Jeopardy.Repo.insert!(%Jeopardy.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

alias Jeopardy.Repo
alias Jeopardy.Users.User
alias Jeopardy.Records.Record

pwhash1 = Argon2.hash_pwd_salt("password1")
pwhash2 = Argon2.hash_pwd_salt("password2")

a = Repo.insert!(
  %User{
    username: "olivia@example.com",
    password_hash: pwhash1
  }
)

b = Repo.insert!(
  %User{
    username: "brendan@example.com",
    password_hash: pwhash2
  }
)

Repo.insert!(
  %Record{
    player: "olivia",
    score: 200,
    user: a
  }
)

Repo.insert!(
  %Record{
    player: "brendan",
    score: 400,
    user: a
  }
)
