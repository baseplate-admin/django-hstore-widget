#!/bin/bash

# Set directories
BASE_DIR=$(dirname "$(realpath "$0")")
DIST_DIR="$BASE_DIR/../dist/django-hstore-widget"
TARGET_DIR="$BASE_DIR/../django_hstore_widget/static/admin/js/django_hstore_widget"

# Remove target directory if it exists
if [ -d "$TARGET_DIR" ]; then
    rm -rf "$TARGET_DIR"
fi

# Recreate target directory
mkdir -p "$TARGET_DIR"

# Check if there are any .js files in the distribution directory
FILES=("$DIST_DIR"/*.js)
if [ ${#FILES[@]} -eq 0 ]; then
    echo "There are no .js files. Re-run 'npm build'."
    exit 1
fi

# Copy non-empty .js files to target directory
for js_file in "$DIST_DIR"/*.js; do
    if [ -s "$js_file" ]; then
        cp "$js_file" "$TARGET_DIR/"
    fi
done

echo "DONE"
