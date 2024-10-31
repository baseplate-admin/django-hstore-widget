import json
from django.contrib.postgres.forms import HStoreField

from .widgets import HStoreFormWidget


from django.utils.html import format_html, html_safe


class HStoreFormField(HStoreField):
    widget = HStoreFormWidget

    def clean(self, value):
        if not value:
            value = "{}"
        return json.loads(value)
