import { newSpecPage } from '@stencil/core/testing';
import { DjangoHstoreWidget } from '../django-hstore-widget';

describe('django-hstore-widget', () => {
    it('renders', async () => {
        const page = await newSpecPage({
            components: [DjangoHstoreWidget],
            html: `<django-hstore-widget></django-hstore-widget>`,
        });
        expect(page.root).toEqualHtml(`
      <django-hstore-widget>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </django-hstore-widget>
    `);
    });
});
