import { newE2EPage } from '@stencil/core/testing';

describe('django-hstore-widget', () => {
    it('renders', async () => {
        const page = await newE2EPage();
        await page.setContent('<django-hstore-widget></django-hstore-widget>');
        await page.waitForChanges();

        const element = await page.find('django-hstore-widget');
        expect(element).toHaveAttribute('hydrated');
    });

    it('json and field render', async () => {
        const page = await newE2EPage();
        await page.setContent(`<django-hstore-widget json='{"hello": "world"}'></django-hstore-widget>`);
        await page.waitForChanges();

        // Wait for async componentDidLoad parsing
        await page.waitForChanges();

        const form_element = await page.findAll('div#json_items');
        expect(form_element.length).toBe(1);
    });

    it('error from django backend', async () => {
        const page = await newE2EPage();
        await page.setContent(`<django-hstore-widget json='{"hello": "wor"ld"}'></django-hstore-widget>`);
        await page.waitForChanges();

        const element = await page.find('div#mount_error');
        expect(element).not.toBeNull();
    });

    it('test input textbox component', async () => {
        const page = await newE2EPage();
        await page.setContent(`<django-hstore-widget json='{"hello": "world"}'></django-hstore-widget>`);
        await page.waitForChanges();

        const open_textbox_toggle = await page.find('div#textarea_open_close_toggle button');
        expect(open_textbox_toggle).not.toBeNull();
        await open_textbox_toggle.click();
        await page.waitForChanges();

        const textbox_element = await page.find('textarea');
        expect(textbox_element).not.toBeNull();
        expect(textbox_element).not.toHaveClass('hidden');

        await page.$eval('textarea', el => {
            (el as HTMLTextAreaElement).value = '';
        });
        await textbox_element.type(`{"my":"World'"}`);
        await page.waitForChanges();

        const value = await textbox_element.getProperty('value');
        expect(value).toBe(`{"my":"World'"}`);

        const textbox_error = await page.find('#textbox_error');
        expect(textbox_error).not.toBeNull();
    });

    it('test delete click', async () => {
        const page = await newE2EPage();
        await page.setContent(`<django-hstore-widget json='{"hello": "world"}'></django-hstore-widget>`);
        await page.waitForChanges();

        const delete_button = await page.find('div#delete-button');
        expect(delete_button).not.toBeNull();
        await delete_button.click();
        await page.waitForChanges();

        const form_element = await page.findAll('div#json_items');
        expect(form_element.length).toBe(0);
    });

    it('test add click', async () => {
        const page = await newE2EPage();
        await page.setContent(`<django-hstore-widget json='{"hello": "world"}'></django-hstore-widget>`);
        await page.waitForChanges();

        const add_button = await page.find('button#add-button');
        expect(add_button).not.toBeNull();
        await add_button.click();
        await page.waitForChanges();

        const form_element = await page.findAll('div#json_items');
        expect(form_element.length).toBe(2);
    });

    it("test all buttons should have type='button'", async () => {
        const page = await newE2EPage();
        await page.setContent(`<django-hstore-widget json='{"hello": "world"}'></django-hstore-widget>`);
        await page.waitForChanges();

        const buttons = await page.findAll('button');
        expect(buttons.length).not.toBe(0);

        for (const button of buttons) {
            const type = await button.getAttribute('type');
            expect(type).toBe('button');
        }
    });
});
