#!/usr/bin/env bash

set -e

esbuild src/game.ts --bundle --sourcemap --outdir=web/ --servedir=web/
