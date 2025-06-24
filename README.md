# django-hstore-widget


> [!NOTE]  
If you want a field based implementation, please check [django-hstore-field](https://github.com/baseplate-admin/django-hstore-field). The package builds on top of this to give an ergonomic implementation. 


[![Downloads](https://static.pepy.tech/badge/django-hstore-widget)](https://pepy.tech/project/django-hstore-widget)  [![CI](https://github.com/baseplate-admin/django-hstore-widget/actions/workflows/CI.yml/badge.svg)](https://github.com/baseplate-admin/django-hstore-widget/actions/workflows/test.yml) [![Pypi Badge](https://img.shields.io/pypi/v/django-hstore-widget.svg)](https://pypi.org/project/django-hstore-widget/) [![pre-commit.ci status](https://results.pre-commit.ci/badge/github/baseplate-admin/django-hstore-widget/master.svg)](https://results.pre-commit.ci/latest/github/baseplate-admin/django-hstore-widget/master)


FormField that properly renders HStoreField Data in django Admin based on [`djangoauts package`](https://github.com/djangonauts/django-hstore) and an updated fork of [`django-admin-hstore-widget`](https://github.com/PokaInc/django-admin-hstore-widget)


## Requirements

-   Python 3.9 and Up ( well technically any python version from 3.6 should work )
-   Django 3.2 and Up
-   Modern browsers ( Chrome 112+, Firefox 117+, Safari 16.5+ )

Using pip:

```bash
pip install django-hstore-widget
```

## Installation

```python

# settings.py

INSTALLED_APPS = [
    ...,
    'django_hstore_widget',
    ...
]

```

## Usage


```python
# yourmodel/forms.py
from django import forms
from django_hstore_widget.forms import HStoreFormField
from .models import Yourmodel

class MyModelAdminForm(forms.ModelForm):
    my_hstore_field = HStoreFormField()

    class Meta:
       model = Yourmodel

# yourmodel/admin.py
from django.contrib import admin
from .models import Yourmodel
from .forms import MyModelAdminForm


@admin.register(Yourmodel)
class YourmodelAdmin(admin.ModelAdmin):
    form = MyModelAdminForm
```

## Result

![Rendered result](./assets/rendered.png)
