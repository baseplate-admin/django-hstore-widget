import os
import sys

import django
import pytest
from django.conf import settings
from django.utils.encoding import force_str
from selenium import webdriver
from selenium.common.exceptions import WebDriverException


def _patch_django_template_context_copy_for_py314():
    """Work around Django 4.x context copying on Python 3.14 during tests."""
    if sys.version_info < (3, 14):
        return

    if django.VERSION >= (5, 0):
        return

    from django.template.context import BaseContext

    def _base_context_copy(self):
        duplicate = object.__new__(self.__class__)
        duplicate.__dict__ = self.__dict__.copy()
        duplicate.dicts = self.dicts[:]
        return duplicate

    BaseContext.__copy__ = _base_context_copy


@pytest.fixture(scope="session")
def driver():
    """Create a Selenium driver using remote webdriver in CI when available."""
    chrome_options = webdriver.ChromeOptions()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--window-size=1920,1200")
    chrome_options.set_capability("goog:loggingPrefs", {"browser": "ALL"})

    remote_url = os.environ.get("SELENIUM_REMOTE_URL")

    try:
        if remote_url:
            browser = webdriver.Remote(
                command_executor=remote_url, options=chrome_options
            )
        else:
            browser = webdriver.Chrome(options=chrome_options)
    except WebDriverException as exc:
        pytest.skip(force_str(exc))
    else:
        yield browser
        browser.quit()


def pytest_sessionstart(session):
    if settings.configured:
        return

    _patch_django_template_context_copy_for_py314()

    settings.configure(
        DATABASES={
            "default": {
                "ENGINE": "django.db.backends.postgresql",
                "NAME": os.environ.get("DJANGO_DATABASE_NAME", "postgres"),
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
        USE_TZ=True,
        STATIC_URL="/static/",
        ROOT_URLCONF="cat.urls",
        ALLOWED_HOSTS=["*"],
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
