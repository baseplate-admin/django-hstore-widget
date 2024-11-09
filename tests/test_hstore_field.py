from django.urls import reverse
from django.test import Client
from django.contrib.auth.models import User
from cat.models import Cat
import pytest
from playwright.sync_api import sync_playwright


@pytest.fixture
def admin_user(db):
    """Fixture to create an admin user."""
    user = User.objects.create(
        username="murphy",
        is_staff=True,
        is_superuser=True,
        is_active=True,
    )
    user.set_password("cat")
    user.save()
    return user


@pytest.fixture
def client_with_login(admin_user):
    """Fixture to log in the admin user."""
    client = Client()
    client.login(username=admin_user.username, password="cat")
    return client


@pytest.mark.django_db
def test_admin_cat_creation(client_with_login):
    """Test creating a Cat instance through the Django admin."""
    # Access the add view for the Cat model in the admin
    url = reverse("admin:cat_cat_add")
    response = client_with_login.get(url)
    assert response.status_code == 200  # Ensure the add view is accessible

    # POST data to create a new Cat instance
    data = {
        "name": "Whiskers",
        "data": '{"race": "Siamese", "gender": "female"}',
    }
    response = client_with_login.post(url, data, follow=True)


@pytest.mark.django_db
def test_hstore_field_edit_view_render_no_js(client_with_login):
    cat = Cat.objects.create(name="Murphy", data={"race": "", "gender": "male"})
    url = reverse("admin:cat_cat_change", args=(cat.pk,))
    response = client_with_login.get(url)

    assert response.status_code == 200
    assert "django-hstore-widget" in response.content.decode()


@pytest.mark.django_db
def test_hstore_field_edit_view_render_js(live_server, admin_user):
    """Playwright test to verify HStore widget renders correctly in the Django admin."""

    # Ensure all database interactions are completed before Playwright starts
    cat = Cat.objects.create(name="Murphy", data={"race": "", "gender": "male"})

    # Use sync_playwright() to interact with the browser synchronously
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Listen to console messages
        console_messages = []
        page.on("console", lambda msg: console_messages.append(msg.text))

        # Open the admin login page
        page.goto(f"{live_server.url}/admin/login/")

        # Log in to admin
        page.fill('input[name="username"]', admin_user.username)
        page.fill('input[name="password"]', "cat")
        page.click('input[type="submit"]')

        # Wait for login to complete
        page.wait_for_selector("body.dashboard")

        # Navigate to the Cat change page
        change_url = (
            f"{live_server.url}{reverse('admin:cat_cat_change', args=(cat.pk,))}"
        )
        page.goto(change_url)

        # Wait for the HStore widget to load
        page.wait_for_selector("django-hstore-widget")
        hstore_widget = page.query_selector("django-hstore-widget")
        assert hstore_widget is not None

        # Check if the textarea is within the widget
        hstore_widget_textarea = page.query_selector(
            "django-hstore-widget textarea.vLargeTextField"
        )
        assert hstore_widget_textarea is not None

        # Assert that no warnings are in the console logs
        assert not any("WARNING" in entry for entry in console_messages)
