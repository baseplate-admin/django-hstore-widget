import json
from django.contrib.postgres.forms import HStoreField

from .widgets import HStoreFormWidget


from django.utils.html import format_html, html_safe

try:
    from django.contrib.admin.templatetags.admin_static import static
except ImportError:
    from django.templatetags.static import static


@html_safe
class Asset:
    """A generic asset that can be included in a template."""

    def __init__(self, path):
        self.path = path

    def __eq__(self, other):
        return (self.__class__ is other.__class__ and self.path == other.path) or (
            other.__class__ is str and self.path == other
        )

    def __hash__(self):
        return hash(self.path)

    def __str__(self):
        return self.absolute_path(self.path)

    def absolute_path(self, path):
        if path.startswith(("http://", "https://", "/")):
            return path
        return static(path)

    def __repr__(self):
        return f"{type(self).__qualname__}: {self.path!r}"


class ESM(Asset):
    """A JavaScript asset for ECMA Script Modules (ESM)."""

    def __str__(self):
        path = super().__str__()
        template = '<script src="{}" type="module"></script>'
        return format_html(template, self.absolute_path(path))


class HStoreFormField(HStoreField):
    widget = HStoreFormWidget

    def clean(self, value):
        if not value:
            value = "{}"
        return json.loads(value)

    class Media:
        js = [ESM("admin/js/django_hstore_widget/django-hstore-widget.esm.js")]
