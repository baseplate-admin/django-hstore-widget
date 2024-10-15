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

    // Very Fragile state. Please update with care. This is the core state of the entire code
    @State() __json = new Array<{ key: string; value: string; index: number }>();

    // Watchers
    @Watch('json')
    jsonWatcher(newValue: string) {
        this.#parseJson(newValue);
    }

    // Callbacks
    connectedCallback() {
        this.#parseJson(this.json);
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
    #parseJson(json_string: string) {
        try {
            let json_object = globalThis.JSON.parse(json_string);
            this.__json = Object.keys(json_object).map((key, index) => ({
                key: key,
                value: json_object[key],
                index: index,
            }));
        } catch (err) {
            console.error(err);
            this.__json = [];
        } finally {
            this.__json = globalThis.structuredClone(this.__json);
        }
    }

    #handleDelete(index: number) {
        this.__json = this.__json.filter(obj => obj.index !== index);
        this.__json = globalThis.structuredClone(this.__json);
    }

    #handleRowAdd() {
        const last_item = this.__json.at(-1);
        const data = {
            index: last_item ? last_item.index + 1 : 0,
            key: '',
            value: '',
        };
        this.__json.push(data);
        this.__json = globalThis.structuredClone(this.__json);
    }

    #handleToggleClick() {
        if (this.output_render_type === 'rows') {
            this.output_render_type = 'textarea';
        } else if (this.output_render_type === 'textarea') {
            this.output_render_type = 'rows';
        } else {
            console.error(`Something is wrong with \`output_render_type\`. It is ${this.output_render_type}`);
        }
    }

    #handleTextAreaInput(event: Event) {
        const target = event.currentTarget as HTMLTextAreaElement;
        const value = target.value;
        this.json = value; // `jsonWatcher` invoked
    }

    #handleKeyInput(event: Event, item: (typeof this.__json)[0]) {
        const target = event.currentTarget as HTMLInputElement;
        const value = target.value;
        item.key = value;
        this.__json = globalThis.structuredClone(this.__json);
    }

    #handleValueInput(event: Event, item: (typeof this.__json)[0]) {
        const target = event.currentTarget as HTMLInputElement;
        const value = target.value;
        item.value = value;
        this.__json = globalThis.structuredClone(this.__json);
    }

    render() {
        return (
            <Host>
                {this.__json && this.__json.length > 0 && Array.isArray(this.__json) ? (
                    <Fragment>
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
                            <div
                                class={`items-center justify-center flex gap-1 ${this.output_render_type === 'textarea' ? 'invisible' : ''}`}
                                onClick={this.#handleRowAdd.bind(this)}
                            >
                                <img src={this.add_svg_src} alt="➕" />
                                Add row
                            </div>

                            <div class="items-center justify-center flex gap-1" onClick={this.#handleToggleClick.bind(this)}>
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
                                    <div>Output render type is {this.output_render_type} which doesn't fall in `rows` or `textarea`</div>
                                )}
                            </div>
                        </div>
                    </Fragment>
                ) : (
                    <div class="flex items-center justify-center gap-1">
                        <p>
                            The provided json is <code>{this.json}</code> which is not valid.
                        </p>
                        <p>
                            Please check the the json or <a href={this.#GITHUB_ISSUE_URL}>file an issue at Github</a>
                        </p>
                    </div>
                )}
            </Host>
        );
    }
}
