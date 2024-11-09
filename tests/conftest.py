import os
import django
from django.conf import settings


def pytest_sessionstart(session):
    """
    This function is executed before the test session starts.
    It configures the Django settings dynamically, using environment variables where available.
    """
    settings.configure(
        DATABASES={
            "default": {
                "ENGINE": "django.db.backends.postgresql",
                "NAME": "django_hstore",  # Adjust the database name as needed
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
            "django_hstore_widget",  # Ensure this app is installed for hstore
            "cat",  # Your custom app
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
        SECRET_KEY="secret",  # Change to a secure secret in production
        BASE_DIR=os.path.dirname(os.path.dirname(__file__)),
        DEBUG=True,
        LANGUAGE_CODE="en-us",
        TIME_ZONE="UTC",
        USE_I18N=True,
        USE_L10N=True,
        USE_TZ=True,
        STATIC_URL="/static/",
        ROOT_URLCONF="cat.urls",  # Adjust to match your root URL config
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
    django.setup()  # Initialize Django settings
