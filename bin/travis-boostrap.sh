#!/usr/bin/env bash
set -ev

# Script for bootstrapping the monorepo into a working state for Travis.
#
# Runs the following tasks in order:
#   - Install top level dependencies
#   - Install package dependencies and symlink them together


LERNA=$TRAVIS_BUILD_DIR/node_modules/.bin/lerna

(cd $TRAVIS_BUILD_DIR && npm install)

$LERNA bootstrap