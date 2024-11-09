import { Component, Host, h, Prop, State, Fragment, Watch } from '@stencil/core';

const django_mapping = {
    input: 'vTextField',
    textarea: 'vLargeTextField',
};

@Component({
    tag: 'django-hstore-widget',
    styleUrl: 'django-hstore-widget.scss',
    shadow: false,
})
export class DjangoHstoreWidget {
    // Primary Attributes
    @Prop({ reflect: true }) json: string;
    @Prop({ reflect: true }) field_name: string;

    // Updateable from admin panel
    @Prop({ reflect: true }) cols = 40;
    @Prop({ reflect: true }) rows = 10;

    // Image
    @Prop() delete_svg_src: string | null = null; // Overrideable
    @Prop() add_svg_src: string | null = null; // Overrideable
    @Prop() edit_svg_src: string | null = null; // Overrideable

    // State
    @State() mounted = false;
    @State() error: string | null = null;
    @State() output_render_type: 'rows' | 'textarea' = 'rows';

    // Very Fragile state. Please update with care. This is the core state of the entire code
    @State() __json = new Array<{ key: string; value: string; index: number }>();

    // Watchers
    @Watch('json')
    async jsonWatcher(newValue: string) {
        await this.#parseJson(newValue);
    }

    // Callbacks
    async connectedCallback() {
        await this.#parseJson(this.json);
        if (this.error === null) {
            this.mounted = true;
        } else {
            this.mounted = false;
        }
    }

    // Getters
    get #GITHUB_ISSUE_URL() {
        return 'https://github.com/baseplate-admin/django-hstore-widget/issues';
    }
    get #getJSONString() {
        const jsonObject = this.__json.reduce((acc, curr) => {
            acc[curr.key] = curr.value;
            return acc;
        }, {} as Record<string, string>);

        let indent: number = Object.keys(jsonObject).length > 1 ? 4 : 0;
        return globalThis.JSON.stringify(jsonObject, null, indent);
    }

    // Functions
    async #parseJson(json_string: string) {
        try {
            let json_object = globalThis.JSON.parse(json_string);
            this.__json = Object.keys(json_object).map((key, index) => ({
                key: key,
                value: json_object[key],
                index: index,
            }));
            this.error = null;
        } catch (err) {
            this.error = err.toString();
        } finally {
            this.__json = globalThis.structuredClone(this.__json);
        }
    }

    // Handlers

    async #handleDelete(index: number) {
        this.__json = this.__json.filter(obj => {
            return obj.index !== index;
        });
        this.__json = globalThis.structuredClone(this.__json);
    }

    async #handleRowAdd() {
        const last_item = this.__json.at(-1);
        const data = {
            index: last_item ? last_item.index + 1 : 0,
            key: '',
            value: '',
        };
        this.__json.push(data);
        this.__json = globalThis.structuredClone(this.__json);
    }

    async #handleToggleClick() {
        if (this.output_render_type === 'rows') {
            this.output_render_type = 'textarea';
        } else if (this.output_render_type === 'textarea') {
            if (this.error !== null) return;
            this.output_render_type = 'rows';
        } else {
            console.error(`Something is wrong with 'output_render_type'. It is ${this.output_render_type}`);
        }
    }

    async #handleTextAreaInput(event: Event) {
        const target = event.currentTarget as HTMLTextAreaElement;
        const value = target.value || '{}';
        this.#parseJson(value);

        this.__json.forEach(item => {
            if (typeof item.value === 'object') {
                this.error = `SyntaxError: 'ltree' doesn't support nested json`;
            }
        });
    }

    async #handleDictionaryInput(event: Event, item: (typeof this.__json)[0], type: 'key' | 'value') {
        const target = event.currentTarget as HTMLInputElement;
        const value = target.value;

        if (type === 'key') {
            item.key = value;
        } else if (type === 'value') {
            item.value = value;
        }

        this.__json = globalThis.structuredClone(this.__json);
    }

    // Reusuable components
    JSONComponent(item: (typeof this.__json)[0]) {
        return (
            <div class="form-row field-data" id="json_items">
                <div class="flex gap-2.5 items-center justify-start">
                    <input
                        value={item.key}
                        onInput={event => this.#handleDictionaryInput(event, item, 'key')}
                        placeholder="key"
                        class={`min-width-[150px] ${django_mapping['input']}`}
                    />
                    <strong>:</strong>
                    <input
                        value={item.value}
                        onInput={event => this.#handleDictionaryInput(event, item, 'value')}
                        placeholder="value"
                        class={`min-width-[300px] ${django_mapping['input']}`}
                    />
                    <div class="items-center justify-center flex cursor-pointer select-none" id="delete-button" onClick={() => this.#handleDelete(item.index)}>
                        <img src={this.delete_svg_src || '#'} alt="❌" />
                    </div>
                </div>
            </div>
        );
    }

    render() {
        if (!this.mounted) {
            return (
                <Host>
                    <div class="flex items-center justify-center gap-1" id="mount_error">
                        <p>
                            Failed to mount. Unexpected JSON from <code>django backend</code>
                        </p>
                        <p>
                            The provided json is <code class="warning">{this.json}</code> which is not valid.
                        </p>
                        <p>
                            Please check the json or <a href={this.#GITHUB_ISSUE_URL}>file an issue at Github</a>
                        </p>
                    </div>
                </Host>
            );
        } else {
            return (
                <Host>
                    <div class="flex gap-2.5 items-center">
                        <textarea
                            class={`${this.output_render_type === 'textarea' ? '' : 'hidden invisible'} ${this.error === null ? '' : 'warning'} ${django_mapping['textarea']}`}
                            cols={this.cols}
                            name={this.field_name}
                            rows={this.rows}
                            onInput={this.#handleTextAreaInput.bind(this)}
                        >
                            {this.#getJSONString}
                        </textarea>
                        {this.error !== null && (
                            <div class="warning brightness-90" id="textbox_error">
                                {this.error}
                            </div>
                        )}
                    </div>
                    {this.output_render_type === 'rows' && this.error === null && this.__json && (
                        <Fragment>
                            {this.__json.map(item => {
                                return this.JSONComponent(item);
                            })}
                        </Fragment>
                    )}
                    <div class="form-row justify-between items-center flex">
                        <div
                            class={`items-center select-none justify-center flex gap-1 cursor-pointer ${this.output_render_type === 'textarea' ? 'invisible' : ''}`}
                            id="add-button"
                            onClick={this.#handleRowAdd.bind(this)}
                        >
                            <img src={this.add_svg_src || '#'} alt="➕" />
                            Add row
                        </div>

                        <div
                            class={`items-center select-none justify-center flex gap-1 ${this.error === null ? 'cursor-pointer' : 'opacity-60'}`}
                            onClick={async () => {
                                if (this.error === null) {
                                    await this.#handleToggleClick();
                                }
                            }}
                            id="textarea_open_close_toggle"
                        >
                            {this.output_render_type === 'textarea' ? (
                                <Fragment>
                                    <img src={this.delete_svg_src || '#'} alt="❌" />
                                    Close TextArea
                                </Fragment>
                            ) : this.output_render_type === 'rows' ? (
                                <Fragment>
                                    <img src={this.edit_svg_src || '#'} alt="✏️" />
                                    Open TextArea
                                </Fragment>
                            ) : (
                                <div>
                                    Output render type is {this.output_render_type} which doesn't fall in <code>rows</code> or <code>textarea</code>
                                </div>
                            )}
                        </div>
                    </div>
                </Host>
            );
        }
    }
}
