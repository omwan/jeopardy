#!/bin/bash

export MIX_ENV=prod
export PORT=4797
export NODEBIN=`pwd`/assets/node_modules/.bin
export PATH="$PATH:$NODEBIN"

echo "Building..."

mkdir -p ~/.config
mkdir -p priv/static

mix deps.get
mix compile
(cd assets && webpack --mode production)
mix phx.digest
mix ecto.reset

echo "Generating release..."
mix release

#echo "Stopping old copy of app, if any..."

echo "Starting app..."

_build/prod/rel/task_manager_spa/bin/task_manager_spa foreground

