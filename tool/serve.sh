#!/usr/bin/env bash

set -e

esbuild src/game.ts --bundle --outdir=web/ --servedir=web/
