from django.urls import reverse
from django.test import Client
from django.contrib.auth.models import User
from cat.models import Cat
import pytest


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
def test_hstore_field_edit_view_render(client_with_login):
    cat = Cat.objects.create(name="Murphy", data={"race": "", "gender": "male"})
    url = reverse("admin:cat_cat_change", args=(cat.pk,))
    response = client_with_login.get(url)

    print(response.content.decode())
    assert response.status_code == 200
    assert "django-hstore-widget" in response.content.decode()
