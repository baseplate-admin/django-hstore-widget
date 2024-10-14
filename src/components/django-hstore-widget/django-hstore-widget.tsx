import { Component, Host, h, Prop, State, Fragment, Watch } from '@stencil/core';

const GITHUB_ISSUE_URL = 'https://github.com/baseplate-admin/django-hstore-widget/issues';

@Component({
    tag: 'django-hstore-widget',
    styleUrl: 'django-hstore-widget.scss',
    shadow: false,
})
export class DjangoHstoreWidget {
    // Primary Attributes
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
        try {
            let json_object = JSON.parse(json_string);
            let json = Object.keys(json_object).map((key, index) => ({
                key: key,
                value: json_object[key],
                index: index,
            }));
            this._json = json;
        } catch (err) {
            console.error(err);
            this._json = [];
        }
    }

    #handleDelete(index: number) {
        const json = this._json.filter(obj => obj.index !== index);
        this._json = structuredClone(json);
    }

    #handleRowAdd() {
        const last_item = this._json.at(-1);
        const data = {
            index: last_item ? last_item.index + 1 : 0,
            key: '',
            value: '',
        };
        this._json.push(data);
        this._json = structuredClone(this._json);
    }

    #handleToggleClick() {
        if (this.output_render_type === 'rows') {
            this.output_render_type = 'textarea';
        } else if (this.output_render_type === 'textarea') {
            this.output_render_type = 'rows';
        } else {
            console.error('Something is wrong with `output_render_type`');
        }
    }

    #handleTextAreaInput(event: Event) {
        const target = event.currentTarget as HTMLTextAreaElement;
        const value = target.value;
        this.json = value;
        this.#parseJson(value);
    }

    #handleKeyInput(event: Event, item: (typeof this._json)[0]) {
        const target = event.currentTarget as HTMLInputElement;
        const value = target.value;
        item.key = value;
        this._json = structuredClone(this._json);
    }

    #handleValueInput(event: Event, item: (typeof this._json)[0]) {
        const target = event.currentTarget as HTMLInputElement;
        const value = target.value;
        item.value = value;
        this._json = structuredClone(this._json);
    }

    // Getters
    #getJSONString() {
        const jsonObject = this._json.reduce((acc, curr) => {
            acc[curr.key] = curr.value;
            return acc;
        }, {} as Record<string, string>);
        return JSON.stringify(jsonObject, null, Object.keys(jsonObject).length === 1 ? 0 : 4);
    }

    render() {
        if (this._json.length > 0 && Array.isArray(this._json)) {
            return (
                <Host>
                    <textarea
                        class={`${this.output_render_type === 'textarea' ? '' : 'hidden'} vLargeTextField`}
                        cols={40}
                        name={this.field_name}
                        rows={10}
                        onInput={event => this.#handleTextAreaInput(event)}
                    >
                        {this.#getJSONString()}
                    </textarea>

                    {this.output_render_type === 'rows' && this._json && (
                        <Fragment>
                            {this._json.map(item => {
                                return (
                                    <div class="form-row field-data" key={item.index}>
                                        <div class="flex gap-2.5">
                                            <input value={item.key} onInput={event => this.#handleKeyInput(event, item)} placeholder="key" class="min-width-[150px]" />
                                            <strong>:</strong>
                                            <input value={item.value} onInput={event => this.#handleValueInput(event, item)} placeholder="value" class="min-width-[300px]" />
                                            <div class="items-center justify-center flex" onClick={() => this.#handleDelete(item.index)}>
                                                <img src={this.delete_svg_src} alt="❌" />
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </Fragment>
                    )}
                    <div class="form-row justify-between items-center flex">
                        {this.output_render_type === 'rows' ? (
                            <Fragment>
                                <div class="items-center justify-center flex gap-1" onClick={() => this.#handleRowAdd()}>
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
                            class="items-center justify-center flex gap-1"
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
        } else {
            return (
                <Host>
                    <div class="flex items-center justify-center gap-1">
                        <p>
                            The provided json is <code>{this.json}</code> which is not valid.
                        </p>
                        <p>
                            Please check the the json or <a href={GITHUB_ISSUE_URL}>file an issue at Github</a>
                        </p>
                    </div>
                </Host>
            );
        }
    }
}
