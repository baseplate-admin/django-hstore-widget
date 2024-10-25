# Generated migration file
from django.db import migrations, models
import django.contrib.postgres.fields

from django.contrib.postgres.operations import HStoreExtension


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        HStoreExtension(),
        migrations.CreateModel(
            name="Cat",
            fields=[
                (
                    "id",
                    models.AutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=32)),
                ("data", django.contrib.postgres.fields.HStoreField()),
            ],
        ),
    ]
