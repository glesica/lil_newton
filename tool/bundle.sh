#!/usr/bin/env bash

set -e

esbuild src/game.ts --bundle --minify --sourcemap --outdir=web/
