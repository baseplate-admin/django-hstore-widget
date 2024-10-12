import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'django-hstore-widget',
  styleUrl: 'django-hstore-widget.css',
  shadow: false,
})
export class DjangoHstoreWidget {
  @Prop() _json = { test: 'val' };

  render() {
    return (
      <Host>
        <input class="left" />
        :
        <input class="right" />
      </Host>
    );
  }
}
