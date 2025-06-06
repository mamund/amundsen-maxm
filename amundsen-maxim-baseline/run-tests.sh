#!/bin/bash

set -e

echo "Backing up data folder..."
cp -r data data-backup

echo "Running tests..."
npx jest

echo "Restoring original data folder..."
rm -rf data
mv data-backup data

echo "Tests complete. Data restored."
