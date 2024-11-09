from django.urls import reverse
from django.test import Client
from django.contrib.auth.models import User
from cat.models import Cat
import pytest
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.action_chains import ActionChains


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
def test_hstore_field_edit_view_render_js(driver, live_server, admin_user):
    """Selenium test to verify HStore widget renders correctly in the Django admin."""

    # Open the admin login page
    driver.get(f"{live_server.url}/admin/login/")
    WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.CSS_SELECTOR, 'input[name="username"]'))
    )

    # Log in to admin
    driver.find_element(By.CSS_SELECTOR, 'form input[name="username"]').send_keys(
        admin_user.username
    )
    driver.find_element(By.CSS_SELECTOR, 'form input[name="password"]').send_keys("cat")
    driver.find_element(By.CSS_SELECTOR, 'form input[type="submit"]').click()

    # Wait for login
    WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.CSS_SELECTOR, "body.dashboard"))
    )

    # Go to the Cat change page
    cat = Cat.objects.create(name="Murphy", data={"race": "", "gender": "male"})
    change_url = f"{live_server.url}{reverse('admin:cat_cat_change', args=(cat.pk,))}"
    driver.get(change_url)

    actions = ActionChains(driver)
    actions.move_to_element(
        driver.find_element(By.CSS_SELECTOR, "django-hstore-widget")
    ).perform()
    WebDriverWait(driver, 10).until(
        EC.presence_of_element_located(
            (By.CSS_SELECTOR, "django-hstore-widget textarea.vLargeTextField")
        )
    )
    # Assert the widget is present
    hstore_widget = driver.find_element(By.CSS_SELECTOR, "django-hstore-widget")
    assert hstore_widget is not None

    # Assert that console is empty
    console_logs = driver.get_log("browser")
    warnings = [entry for entry in console_logs if entry["level"] == "WARNING"]
    assert warnings == []

    # Assert that there is the hidden textarea
    hstore_widget_textarea = driver.find_element(
        By.CSS_SELECTOR, "django-hstore-widget textarea.vLargeTextField"
    )
    assert hstore_widget_textarea is not None

    # __import__('time').sleep(100)
