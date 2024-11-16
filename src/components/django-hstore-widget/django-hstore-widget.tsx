import { Component, Host, h, Prop, State, Fragment, Watch, Element } from '@stencil/core';
import { addGlobalStylesToShadowRoot } from '$lib/injectStyles';

const django_mapping = {
    input: 'vTextField',
    textarea: 'vLargeTextField',
};

@Component({
    tag: 'django-hstore-widget',
    styleUrl: 'django-hstore-widget.scss',
    shadow: true,
})
export class DjangoHstoreWidget {
    // Element
    @Element() el!: HTMLElement;

    // Primary Attributes
    @Prop({ reflect: true }) json!: string;
    @Prop({ reflect: true }) field_name!: string;

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
    @State() output_render_type: 'rows' | 'textarea' | null = 'rows'; // `null` here is only used for testing. It should never be null in the code

    // Very Fragile state. Please update with care. This is the core state of the entire component
    @State() __json = new Array<{ key: string; value: string; index: number }>();

    // Watchers
    @Watch('json')
    async jsonWatcher(newValue: string) {
        await this.#parseJson(newValue);
    }

    // Callbacks
    async connectedCallback() {
        if (this.el.shadowRoot) {
            addGlobalStylesToShadowRoot(this.el.shadowRoot);
        }

        await this.#parseJson(this.json);
        if (this.error) {
            this.mounted = false;
        } else {
            this.mounted = true;
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

        const indent = Object.keys(jsonObject).length > 1 ? 4 : 0;
        return globalThis.JSON.stringify(jsonObject, null, indent);
    }

    // Functions
    async #parseJson(json_string: string) {
        try {
            const json_object = globalThis.JSON.parse(json_string);
            this.__json = Object.keys(json_object).map((key, index) => ({
                key: key,
                value: json_object[key],
                index: index,
            }));
            this.error = null;
        } catch (err) {
            if (err instanceof Error) {
                this.error = err.toString();
            } else {
                this.error = 'An unknown error occurred';
            }
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
        if (this.error) return;

        if (this.output_render_type === 'rows') {
            this.output_render_type = 'textarea';
        } else if (this.output_render_type === 'textarea') {
            this.output_render_type = 'rows';
        } else {
            console.error(`Something is wrong with 'output_render_type'. It is ${this.output_render_type}`);
        }
    }

    async #handleTextAreaInput(event: Event) {
        const target = event.currentTarget as HTMLTextAreaElement;
        this.#parseJson(target.value || '{}');

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
                    <div class="items-center justify-center flex cursor-pointer select-none" id="delete-button" onClick={this.#handleDelete.bind(this, item.index)}>
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
                            The provided json is: <code class="warning">{this.json}</code> which is not valid.
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
                            value={this.#getJSONString}
                        />
                        {this.error !== null && (
                            <div class="warning brightness-90" id="textbox_error">
                                {this.error}
                            </div>
                        )}
                    </div>

                    {this.output_render_type === 'rows' && this.error === null && this.__json && <Fragment>{this.__json.map(item => this.JSONComponent(item))}</Fragment>}

                    <div class="form-row justify-between items-center flex">
                        {this.output_render_type === 'rows' && (
                            <div class={`items-center select-none justify-center flex gap-1 cursor-pointer`} id="add-button" onClick={this.#handleRowAdd.bind(this)}>
                                <img src={this.add_svg_src || '#'} alt="➕" />
                                Add row
                            </div>
                        )}

                        <div class={`items-center select-none justify-center flex gap-1 ${this.error === null ? 'cursor-pointer' : 'opacity-60'}`} id="textarea_open_close_toggle">
                            {this.output_render_type === 'textarea' ? (
                                <div onClick={this.#handleToggleClick.bind(this)}>
                                    <img src={this.delete_svg_src || '#'} alt="❌" />
                                    Close TextArea
                                </div>
                            ) : this.output_render_type === 'rows' ? (
                                <div onClick={this.#handleToggleClick.bind(this)}>
                                    <img src={this.edit_svg_src || '#'} alt="✏️" />
                                    Open TextArea
                                </div>
                            ) : (
                                <div class="flex items-center justify-center w-full gap-1">
                                    <p>Output render type is </p>
                                    <code class="warning curosr-default">{this.output_render_type}</code>
                                    <p>which doesn't fall in</p>
                                    <code class="warning curosr-default">rows</code>
                                    <p>or</p>
                                    <code class="warning curosr-default">textarea</code>
                                    <p>
                                        Please <a href={this.#GITHUB_ISSUE_URL}>file an issue at Github</a>
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </Host>
            );
        }
    }
}
