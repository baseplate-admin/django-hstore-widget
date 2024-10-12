try:
    from django.contrib.admin.templatetags.admin_static import static
except ImportError:
    from django.templatetags.static import static
from django.contrib.admin.widgets import AdminTextareaWidget
from django.contrib.postgres.forms import forms
from django.template.loader import get_template
from django.utils.safestring import mark_safe


class HStoreFormWidget(AdminTextareaWidget):
    def render(self, name, value, attrs=None, renderer=None):
        if attrs is None:
            attrs = {}
            # it's called "original" because it will be replaced by a copy

        # get default HTML from AdminTextareaWidget
        html = super().render(name, value, attrs)

        # prepare template context
        template_context = {
            "field_name": name,
            "field_data": value,
        }

        # get template object
        template = get_template("django_admin_hstore_widget.html")
        # render additional html
        additional_html = template.render(template_context)

        # append additional HTML and mark as safe
        html = additional_html
        html = mark_safe(html)

        return html
