import { newSpecPage } from 'jest-stencil-runner';
import { DjangoHstoreWidget } from '../django-hstore-widget';
import { ImageIcon } from '../../image-icon/image-icon';

const withValidJson = async () => {
    const page = await newSpecPage({
        components: [DjangoHstoreWidget, ImageIcon],
        html: `<django-hstore-widget json='{"hello": "world"}'></django-hstore-widget>`,
    });
    await page.waitForChanges();
    return page;
};

describe('django-hstore-widget', () => {
    let originalRequestAnimationFrame: typeof globalThis.requestAnimationFrame;

    beforeAll(() => {
        originalRequestAnimationFrame = globalThis.requestAnimationFrame;
        globalThis.requestAnimationFrame = callback => {
            callback(0);
            return 0;
        };
    });

    afterAll(() => {
        globalThis.requestAnimationFrame = originalRequestAnimationFrame;
    });

    beforeEach(() => {
        jest.spyOn(console, 'error').mockImplementation(() => undefined);
        jest.spyOn(console, 'warn').mockImplementation(() => undefined);
        jest.spyOn(console, 'debug').mockImplementation(() => undefined);
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('renders', async () => {
        const page = await withValidJson();
        const element = page.root;

        expect(element).not.toBeNull();
        expect(page.root?.querySelector('#mount_error')).toBeNull();
    });

    it('json and field render', async () => {
        const page = await withValidJson();
        const rows = page.root?.querySelectorAll('div#json_items') ?? [];

        expect(rows.length).toBe(1);
    });

    it('error from django backend', async () => {
        const page = await newSpecPage({
            components: [DjangoHstoreWidget, ImageIcon],
            html: `<django-hstore-widget json='{'></django-hstore-widget>`,
        });
        await page.waitForChanges();

        const element = page.root?.querySelector('div#mount_error');
        expect(element).not.toBeNull();
    });

    it('test input textbox component', async () => {
        const page = await withValidJson();
        const openTextboxToggle = page.root?.querySelector('div#textarea_open_close_toggle button') as HTMLButtonElement;

        expect(openTextboxToggle).not.toBeNull();
        openTextboxToggle.click();
        await page.waitForChanges();

        const textbox = page.root?.querySelector('textarea') as HTMLTextAreaElement;
        expect(textbox).not.toBeNull();
        expect(textbox.classList.contains('hidden')).toBe(false);

        textbox.value = `{"my":"World'"}`;
        textbox.dispatchEvent(new Event('input'));
        await page.waitForChanges();

        expect(textbox.value).toBe(`{"my":"World'"}`);

        const textboxError = page.root?.querySelector('#textbox_error');
        expect(textboxError).not.toBeNull();
    });

    it('test delete click', async () => {
        const page = await withValidJson();
        const deleteButton = page.root?.querySelector('div#delete-button') as HTMLDivElement;

        expect(deleteButton).not.toBeNull();
        deleteButton.click();
        await page.waitForChanges();

        const rows = page.root?.querySelectorAll('div#json_items') ?? [];
        expect(rows.length).toBe(0);
    });

    it('test add click', async () => {
        const page = await withValidJson();
        const addButton = page.root?.querySelector('button#add-button') as HTMLButtonElement;

        expect(addButton).not.toBeNull();
        addButton.click();
        await page.waitForChanges();

        const rows = page.root?.querySelectorAll('div#json_items') ?? [];
        expect(rows.length).toBe(2);
    });

    it("test all buttons should have type='button'", async () => {
        const page = await withValidJson();
        const buttons = page.root?.querySelectorAll('button') ?? [];

        expect(buttons.length).not.toBe(0);

        buttons.forEach(button => {
            expect(button.getAttribute('type')).toBe('button');
        });
    });
});
