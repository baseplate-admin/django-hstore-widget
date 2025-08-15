import { newE2EPage } from '@stencil/core/testing';

describe('django-hstore-widget', () => {
    it('renders', async () => {
        const page = await newE2EPage();
        await page.setContent('<django-hstore-widget></django-hstore-widget>');

        const element = await page.find('django-hstore-widget');
        expect(element).toHaveAttribute('hydrated');
    });

    it('json and field render', async () => {
        const page = await newE2EPage();
        await page.setContent(`<django-hstore-widget json='{"hello": "world"}'></django-hstore-widget>`);

        const form_element = await page.findAll('django-hstore-widget >>> div#json_items');
        expect(form_element.length).toBe(1);
    });

    it('error from django backend', async () => {
        const page = await newE2EPage();
        await page.setContent(`<django-hstore-widget json='{"hello": "wor"ld"}'></django-hstore-widget>`);

        const element = await page.find('django-hstore-widget >>> div#mount_error');
        expect(element).not.toBeNull();
    });

    it('test input textbox component', async () => {
        const page = await newE2EPage();
        await page.setContent(`<django-hstore-widget json='{"hello": "world"}'></django-hstore-widget>`);

        const open_textbox_toggle = await page.find('django-hstore-widget >>> div#textarea_open_close_toggle');
        await open_textbox_toggle.click();

        const textbox_element = await page.find('django-hstore-widget >>> textarea');
        expect(textbox_element).not.toBeNull();
        expect(textbox_element).not.toHaveClasses(['hidden', 'invisible']);

        await page.$eval('django-hstore-widget >>> textarea', el => {
            el.value = '';
        });

        await textbox_element.type(`{"my":"World'}`);
        const value = await textbox_element.getProperty('value');
        expect(value).toBe(`{"my":"World'}`);

        const textbox_error = await page.find('django-hstore-widget >>> #textbox_error');
        expect(textbox_error).not.toBeNull();
    });

    it('test delete click', async () => {
        const page = await newE2EPage();
        await page.setContent(`<django-hstore-widget json='{"hello": "world"}'></django-hstore-widget>`);

        const delete_button = await page.find('django-hstore-widget >>> div#delete-button');
        await delete_button.click();

        const form_element = await page.findAll('django-hstore-widget >>> div#json_items');
        expect(form_element.length).toBe(0);
    });

    it('test add click', async () => {
        const page = await newE2EPage();
        await page.setContent(`<django-hstore-widget json='{"hello": "world"}'></django-hstore-widget>`);

        const delete_button = await page.find('django-hstore-widget >>> button#add-button');
        await delete_button.click();

        const form_element = await page.findAll('django-hstore-widget >>> div#json_items');
        expect(form_element.length).toBe(2);
    });

    it("test all buttons should have type='button'", async () => {
        const page = await newE2EPage();
        await page.setContent(`<django-hstore-widget json='{"hello": "world"}'></django-hstore-widget>`);

        const buttons = await page.findAll('django-hstore-widget >>> button');
        expect(buttons.length).not.toBeNull();
        for (const button of buttons) {
            const type = await button.getAttribute('type');
            expect(type).toBe('button');
        }
    });
});
