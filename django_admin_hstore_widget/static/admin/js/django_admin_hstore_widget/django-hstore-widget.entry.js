import { r as registerInstance, h, a as Host, F as Fragment } from './index-d4b3491e.js';

const djangoHstoreWidgetCss = "django-hstore-widget .wrapper{display:flex;gap:10px}django-hstore-widget .left{min-width:150px}django-hstore-widget .right{min-width:300px}django-hstore-widget .centered{display:flex;align-items:center;justify-content:center}django-hstore-widget .end-items{display:flex;justify-content:space-between;align-items:center}";

const DjangoHstoreWidget = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.json = undefined;
        this.field_name = undefined;
        this.delete_svg_src = '/static/admin/img/icon-deletelink.svg';
        this.add_svg_src = '/static/admin/img/icon-addlink.svg';
        this.edit_svg_src = '/static/admin/img/icon-changelink.svg';
        this._json = new Array();
        this.output_render_type = 'rows';
    }
    connectedCallback() {
        let json_object = JSON.parse(this.json);
        let json = Object.keys(json_object).map((key, index) => ({
            key: key,
            value: json_object[key],
            index: index,
        }));
        this._json = json;
        console.log(this._json);
    }
    handleDelete(index) {
        const json = this._json.filter(obj => obj.index !== index);
        this._json = structuredClone(json);
    }
    handleRowAdd() {
        let json = this._json;
        const last_item = json.at(-1);
        const data = {
            index: last_item.index + 1,
            key: '',
            value: '',
        };
        json.push(data);
        this._json = structuredClone(json);
    }
    handleToggleClick() {
        switch (this.output_render_type) {
            case 'rows':
                this.output_render_type = 'textarea';
                break;
            case 'textarea':
                this.output_render_type = 'rows';
                break;
            default:
                console.error('Something is wrong with `output_render_type`');
                break;
        }
    }
    getJSONWithoutIndex() {
        return this._json.reduce((acc, curr) => {
            acc[curr.key] = curr.value;
            return acc;
        }, {});
    }
    handleTextAreaInput(text) {
        this.json = text;
        this.connectedCallback();
    }
    render() {
        return (h(Host, { key: 'c7106a732f10e5ba8ab934f4feccac2ad03ce55c' }, this.output_render_type === 'textarea' && (h(Fragment, { key: 'bac0ef27ef236715c1217bea70d9e5ab40a79eb8' }, h("textarea", { key: '4e003c7a27c08b90355a5a7e373e2c124bbd8d89', class: "vLargeTextField", cols: 40, name: `${this.field_name}`, rows: 10, onInput: event => {
                const target = event.currentTarget;
                const value = target.value;
                this.handleTextAreaInput(value);
            }, value: JSON.stringify(this.getJSONWithoutIndex(), null, Object.keys(this._json).length === 1 ? 0 : 4) }))), this.output_render_type === 'rows' && this._json && (h(Fragment, { key: '5d8a6c2545c2d6b2ca1dda9ffccdebcb3bee987b' }, this._json.map((item, index) => {
            return (h("div", { class: "form-row field-data" }, h("div", { class: "wrapper" }, h("input", { value: item.key, onInput: event => {
                    const target = event.currentTarget;
                    const value = target.value;
                    item.key = value;
                }, placeholder: "key", class: "left" }), h("strong", null, ":"), h("input", { value: item.value, onInput: () => {
                    const target = event.currentTarget;
                    const value = target.value;
                    item.value = value;
                }, placeholder: "value", class: "right" }), h("div", { class: "centered", onClick: () => {
                    this.handleDelete(index);
                } }, h("img", { src: this.delete_svg_src, alt: "\u274C" })))));
        }))), h("div", { key: '6d2818022e4f655c9b79d1f06329879eaf92cad5', class: "form-row end-items" }, this.output_render_type === 'rows' ? (h(Fragment, null, h("div", { onClick: () => {
                this.handleRowAdd();
            } }, h("img", { src: this.add_svg_src, alt: "\u2795" }), "Add row"))) : (h(Fragment, null, h("div", null))), h("div", { key: 'bcdcc74ce0103cdc89c0e091d9e0c920db988633', class: "centered", onClick: () => {
                this.handleToggleClick();
            } }, this.output_render_type === 'textarea' && (h(Fragment, { key: '8c6bc08e881c693a8c3c3725d3b188caef1abaec' }, h("img", { key: '89555c898cf32c485294aed8d166ab8f306dc356', src: this.delete_svg_src, alt: "\u274C" }), "Close TextArea")), this.output_render_type === 'rows' && (h(Fragment, { key: 'e4c4cf6e53e6fab5e48e244f6a53af4731b02849' }, h("img", { key: '59f98f49c41a79d68c5f64f064549be6630d4c21', src: this.edit_svg_src, alt: "\u270F\uFE0F" }), "Open TextArea"))))));
    }
};
DjangoHstoreWidget.style = djangoHstoreWidgetCss;

export { DjangoHstoreWidget as django_hstore_widget };

//# sourceMappingURL=django-hstore-widget.entry.js.map