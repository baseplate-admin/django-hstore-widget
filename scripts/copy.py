from pathlib import Path
import shutil

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

shutil.rmtree(TARGET_DIR)

TARGET_DIR.mkdir(parents=True, exist_ok=True)

for js_file in DIST_DIR.glob("*.js"):
    shutil.copy(js_file, TARGET_DIR / js_file.name)
