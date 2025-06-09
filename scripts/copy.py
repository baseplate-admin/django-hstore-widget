import shutil
import brotli
import mmap
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent

DIST_DIR = Path(
    BASE_DIR.parent,
    "dist",
    "django-hstore-widget",
)

TARGET_DIR = Path(
    BASE_DIR.parent,
    "src",
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

if not files:
    raise Exception("There are no js files. Re-run `npm build`")

for js_file in files:
    if js_file.stat().st_size == 0:
        continue

    with js_file.open("rb") as f:
        with mmap.mmap(f.fileno(), 0, access=mmap.ACCESS_READ) as mm:
            compressed_data = brotli.compress(mm)

    compressed_file = TARGET_DIR / f"{js_file.name}.br"
    compressed_file.write_bytes(compressed_data)

print("DONE")
