from pathlib import Path
import shutil

BASE_DIR = Path(__file__).resolve().parent

DIST_DIR = Path(BASE_DIR.parent, "dist", "components")
TARGET_DIR = Path(
    BASE_DIR.parent, "django_admin_hstore_widget", "static", "admin", "js"
)

for js_file in DIST_DIR.glob("*.js"):
    shutil.copy(js_file, TARGET_DIR / js_file.name)


