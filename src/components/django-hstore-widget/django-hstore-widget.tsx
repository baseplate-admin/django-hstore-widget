import { Component, Host, h, Prop, State, Fragment, Watch } from '@stencil/core';

@Component({
    tag: 'django-hstore-widget',
    styleUrl: 'django-hstore-widget.scss',
    shadow: false,
})
export class DjangoHstoreWidget {
    @Prop() json: string;
    @Prop() field_name: string;

    // Image
    @Prop() delete_svg_src: string = '/static/admin/img/icon-deletelink.svg'; // Overrideable
    @Prop() add_svg_src: string = '/static/admin/img/icon-addlink.svg'; // Overrideable
    @Prop() edit_svg_src: string = '/static/admin/img/icon-changelink.svg'; // Overrideable

    // State
    @State() output_render_type: 'rows' | 'textarea' = 'rows';

    // Very Fragile state. Please update with care
    @State() _json = new Array<{ key: string; value: string; index: number }>();
    @State() _json_string: string = '';

    // Watchers
    @Watch('json')
    jsonWatcher(newValue: string) {
        this.#parseJson(newValue);
    }

    // Callbacks
    connectedCallback() {
        this.#parseJson(this.json);
    }

    // Functions
    #parseJson(json_string: string) {
        let json_object = JSON.parse(json_string);
        let json = Object.keys(json_object).map((key, index) => ({
            key: key,
            value: json_object[key],
            index: index,
        }));
        this._json = json;
    }

    #handleDelete(index: number) {
        const json = this._json.filter(obj => obj.index !== index);
        this._json = structuredClone(json);
    }

    #handleRowAdd() {
        let json = this._json;
        const last_item = json.at(-1);
        if (!last_item) {
            console.error('`this._json` is empty.');
            return;
        }

        const data = {
            index: last_item.index + 1,
            key: '',
            value: '',
        };
        json.push(data);
        this._json = structuredClone(json);
    }

    #handleToggleClick() {
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

    private getJSONString() {
        const jsonObject = this._json.reduce((acc, curr) => {
            acc[curr.key] = curr.value;
            return acc;
        }, {} as Record<string, string>);

        return JSON.stringify(jsonObject, null, Object.keys(jsonObject).length === 1 ? 0 : 4);
    }

    private handleTextAreaInput(text: string) {
        this.json = text;
        this.connectedCallback();
    }

    render() {
        const jsonString = this.getJSONString();

        return (
            <Host>
                <textarea
                    class={`${this.output_render_type === 'textarea' ? '' : 'hidden'} vLargeTextField`}
                    cols={40}
                    name={`${this.field_name}`}
                    rows={10}
                    onInput={this.handleTextAreaInput.bind(this)}
                >
                    {jsonString}
                </textarea>

                {this.output_render_type === 'rows' && this._json && (
                    <Fragment>
                        {this._json.map((item, index) => {
                            return (
                                <div class="form-row field-data">
                                    <div class="wrapper">
                                        <input
                                            value={item.key}
                                            onInput={event => {
                                                const target = event.currentTarget as HTMLInputElement;
                                                const value = target.value;
                                                item.key = value;
                                            }}
                                            placeholder="key"
                                            class="left"
                                        />
                                        <strong>:</strong>
                                        <input
                                            value={item.value}
                                            onInput={() => {
                                                const target = event.currentTarget as HTMLInputElement;
                                                const value = target.value;
                                                item.value = value;
                                            }}
                                            placeholder="value"
                                            class="right"
                                        />
                                        <div
                                            class="centered"
                                            onClick={() => {
                                                this.#handleDelete(index);
                                            }}
                                        >
                                            <img src={this.delete_svg_src} alt="❌" />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </Fragment>
                )}
                <div class="form-row end-items">
                    {this.output_render_type === 'rows' ? (
                        <Fragment>
                            <div
                                class="centered gap-1"
                                onClick={() => {
                                    this.#handleRowAdd();
                                }}
                            >
                                <img src={this.add_svg_src} alt="➕" />
                                Add row
                            </div>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <div></div>
                        </Fragment>
                    )}
                    <div
                        class="centered gap-1"
                        onClick={() => {
                            this.#handleToggleClick();
                        }}
                    >
                        {this.output_render_type === 'textarea' && (
                            <Fragment>
                                <img src={this.delete_svg_src} alt="❌" />
                                Close TextArea
                            </Fragment>
                        )}
                        {this.output_render_type === 'rows' && (
                            <Fragment>
                                <img src={this.edit_svg_src} alt="✏️" />
                                Open TextArea
                            </Fragment>
                        )}
                    </div>
                </div>
            </Host>
        );
    }
}
