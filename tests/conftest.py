import os
import django
from django.conf import settings
import pytest
from selenium import webdriver
from selenium.common.exceptions import WebDriverException
from django.utils.encoding import force_str


@pytest.fixture(scope="session")
def driver():
    chrome_options = webdriver.ChromeOptions()
    # chrome_options.add_argument("--headless")
    chrome_options.add_argument("--window-size=1920,1200")

    # Set up console logging preferences
    chrome_options.set_capability("goog:loggingPrefs", {"browser": "ALL"})

    try:
        b = webdriver.Chrome(options=chrome_options)
    except WebDriverException as e:
        pytest.skip(force_str(e))
    else:
        yield b
        b.quit()


def pytest_sessionstart(session):
    settings.configure(
        DATABASES={
            "default": {
                "ENGINE": "django.db.backends.postgresql",
                "NAME": "django_hstore",
                "HOST": os.environ.get("DJANGO_DATABASE_HOST", "localhost"),
                "USER": os.environ.get("DJANGO_DATABASE_USER", "postgres"),
                "PASSWORD": os.environ.get(
                    "DJANGO_DATABASE_PASSWORD", "supersecretpassword"
                ),
            },
        },
        INSTALLED_APPS=(
            "django.contrib.admin",
            "django.contrib.auth",
            "django.contrib.contenttypes",
            "django.contrib.sessions",
            "django.contrib.messages",
            "django.contrib.staticfiles",
            "django.contrib.postgres",
            "django_hstore_widget",
            "cat",
        ),
        MIDDLEWARE=[
            "django.middleware.security.SecurityMiddleware",
            "django.contrib.sessions.middleware.SessionMiddleware",
            "django.middleware.common.CommonMiddleware",
            "django.middleware.csrf.CsrfViewMiddleware",
            "django.contrib.auth.middleware.AuthenticationMiddleware",
            "django.contrib.messages.middleware.MessageMiddleware",
            "django.middleware.clickjacking.XFrameOptionsMiddleware",
        ],
        SECRET_KEY="secret",
        BASE_DIR=os.path.dirname(os.path.dirname(__file__)),
        DEBUG=True,
        LANGUAGE_CODE="en-us",
        TIME_ZONE="UTC",
        USE_I18N=True,
        USE_L10N=True,
        USE_TZ=True,
        STATIC_URL="/static/",
        ROOT_URLCONF="cat.urls",
        ALLOWED_HOSTS=[],
        TEMPLATES=[
            {
                "BACKEND": "django.template.backends.django.DjangoTemplates",
                "DIRS": [],
                "APP_DIRS": True,
                "OPTIONS": {
                    "context_processors": [
                        "django.template.context_processors.debug",
                        "django.template.context_processors.request",
                        "django.contrib.auth.context_processors.auth",
                        "django.contrib.messages.context_processors.messages",
                    ],
                },
            },
        ],
    )
    django.setup()
