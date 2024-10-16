import { Component, Host, h, Prop, State, Fragment, Watch } from '@stencil/core';

@Component({
    tag: 'django-hstore-widget',
    styleUrl: 'django-hstore-widget.scss',
    shadow: false,
})
export class DjangoHstoreWidget {
    // Primary Attributes
    @Prop({ mutable: true }) json: string;
    @Prop() field_name: string;

    // Updateable from admin panel
    @Prop() cols = 40;
    @Prop() rows = 10;

    // Image
    @Prop() delete_svg_src: string = '/static/admin/img/icon-deletelink.svg'; // Overrideable
    @Prop() add_svg_src: string = '/static/admin/img/icon-addlink.svg'; // Overrideable
    @Prop() edit_svg_src: string = '/static/admin/img/icon-changelink.svg'; // Overrideable

    // State
    @State() output_render_type: 'rows' | 'textarea' = 'rows';
    @State() mounted = false;
    @State() close_textarea_clickable = true;

    // Very Fragile state. Please update with care. This is the core state of the entire code
    @State() __json = new Array<{ key: string; value: string; index: number }>();

    // Watchers
    @Watch('json')
    async jsonWatcher(newValue: string) {
        await this.#parseJson(newValue);
    }

    // Callbacks
    connectedCallback() {
        this.#parseJson(this.json).then(() => {
            this.mounted = true;
        });
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

        let indent: number = 0;
        if (Object.keys(jsonObject).length > 1) {
            indent = 4;
        }
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
        } finally {
            this.__json = globalThis.structuredClone(this.__json);
        }
    }

    // Handlers

    async #handleDelete(index: number) {
        this.__json = this.__json.filter(obj => obj.index !== index);
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
            if (this.close_textarea_clickable === false) return;
            this.output_render_type = 'rows';
        } else {
            console.error(`Something is wrong with \`output_render_type\`. It is ${this.output_render_type}`);
        }
    }

    async #handleTextAreaInput(event: Event) {
        const target = event.currentTarget as HTMLTextAreaElement;
        const value = target.value;
        if (value) {
            this.#parseJson(value)
                .then(() => {
                    if (target.classList.contains('warning')) target.classList.remove('warning');
                    this.close_textarea_clickable = true;
                })
                .catch(() => {
                    if (!target.classList.contains('warning')) target.classList.add('warning');
                    this.close_textarea_clickable = false;
                });
        } else {
            this.#parseJson('{}');
        }
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
            <div class="form-row field-data">
                <div class="flex gap-2.5">
                    <input value={item.key} onInput={event => this.#handleDictionaryInput(event, item, 'key')} placeholder="key" class="min-width-[150px]" />
                    <strong>:</strong>
                    <input value={item.value} onInput={event => this.#handleDictionaryInput(event, item, 'value')} placeholder="value" class="min-width-[300px]" />
                    <div class="items-center justify-center flex cursor-pointer" onClick={() => this.#handleDelete(item.index)}>
                        <img src={this.delete_svg_src} alt="❌" />
                    </div>
                </div>
            </div>
        );
    }

    render() {
        if (!this.mounted) {
            return (
                <Host>
                    <div class="flex items-center justify-center gap-1">
                        <p>
                            Failed to mount. Unexpected JSON from <code>django backend</code>
                        </p>
                        <p>
                            The provided json is <code>{this.json}</code> which is not valid.
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
                    <textarea
                        class={`${this.output_render_type === 'textarea' ? '' : 'hidden invisible'} vLargeTextField`}
                        cols={this.cols}
                        name={this.field_name}
                        rows={this.rows}
                        onInput={this.#handleTextAreaInput.bind(this)}
                    >
                        {this.#getJSONString}
                    </textarea>

                    {this.output_render_type === 'rows' && this.__json && (
                        <Fragment>
                            {this.__json.map(item => {
                                return this.JSONComponent(item);
                            })}
                        </Fragment>
                    )}
                    <div class="form-row justify-between items-center flex">
                        <div
                            class={`items-center justify-center flex gap-1 cursor-pointer ${this.output_render_type === 'textarea' ? 'invisible' : ''}`}
                            onClick={this.#handleRowAdd.bind(this)}
                        >
                            <img src={this.add_svg_src} alt="➕" />
                            Add row
                        </div>

                        <div
                            class={`items-center justify-center flex gap-1 ${this.close_textarea_clickable ? 'cursor-pointer' : 'opacity-60'}`}
                            onClick={this.#handleToggleClick.bind(this)}
                        >
                            {this.output_render_type === 'textarea' ? (
                                <Fragment>
                                    <img src={this.delete_svg_src} alt="❌" />
                                    Close TextArea
                                </Fragment>
                            ) : this.output_render_type === 'rows' ? (
                                <Fragment>
                                    <img src={this.edit_svg_src} alt="✏️" />
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
