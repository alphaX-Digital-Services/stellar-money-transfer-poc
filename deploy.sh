#!/usr/bin/env sh

set -e

ENV=${ENV:-local}

cd _deployment/$ENV
./deploy.sh