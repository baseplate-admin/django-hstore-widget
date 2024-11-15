import shutil
import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent

DIST_DIR = Path(BASE_DIR.parent, "dist", "django-hstore-widget")
TARGET_DIR = Path(
    BASE_DIR.parent,
    "django_hstore_widget",
    "static",
    "admin",
    "js",
    "django_hstore_widget",
)
if TARGET_DIR.exists() and TARGET_DIR.is_dir():
    shutil.rmtree(TARGET_DIR)

TARGET_DIR.mkdir(parents=True, exist_ok=True)

files = list(DIST_DIR.glob("*.js"))

if len(files):
    for js_file in files:
        if os.path.getsize(js_file) > 0:
            shutil.copy(js_file, os.path.join(TARGET_DIR, js_file.name))

    print("DONE")
else:
    raise Exception("There are no js files.Re-Run `npm build`")
