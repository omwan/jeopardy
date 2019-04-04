#!/bin/bash

source .env
export MIX_ENV=prod
export PORT=4797

echo "Stopping old copy of app, if any..."

_build/prod/rel/jeopardy/bin/jeopardy stop || true

echo "Starting app..."

_build/prod/rel/jeopardy/bin/jeopardy foreground
