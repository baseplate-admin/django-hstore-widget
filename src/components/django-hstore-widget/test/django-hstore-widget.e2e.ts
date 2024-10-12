import { newE2EPage } from '@stencil/core/testing';

describe('django-hstore-widget', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<django-hstore-widget></django-hstore-widget>');

    const element = await page.find('django-hstore-widget');
    expect(element).toHaveClass('hydrated');
  });
});
