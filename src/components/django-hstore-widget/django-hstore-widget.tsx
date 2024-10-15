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

    // Functions
    #parseJson(json_string: string) {
        try {
            let json_object = JSON.parse(json_string);
            let json = Object.keys(json_object).map((key, index) => ({
                key: key,
                value: json_object[key],
                index: index,
            }));
            this.__json = json;
        } catch (err) {
            console.error(err);
            this.__json = [];
        }
    }

    #handleDelete(index: number) {
        const json = this.__json.filter(obj => obj.index !== index);
        this.__json = structuredClone(json);
    }

    #handleRowAdd() {
        const last_item = this.__json.at(-1);
        const data = {
            index: last_item ? last_item.index + 1 : 0,
            key: '',
            value: '',
        };

        this.__json.push(data);
        this.__json = structuredClone(this.__json);
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
        this.json = value; // `jsonWatcher` invoked
    }

    #handleKeyInput(event: Event, item: (typeof this.__json)[0]) {
        const target = event.currentTarget as HTMLInputElement;
        const value = target.value;
        item.key = value;
        this.__json = structuredClone(this.__json);
    }

    #handleValueInput(event: Event, item: (typeof this.__json)[0]) {
        const target = event.currentTarget as HTMLInputElement;
        const value = target.value;
        item.value = value;
        this.__json = structuredClone(this.__json);
    }

    // Getters
    #getJSONString() {
        const jsonObject = this.__json.reduce((acc, curr) => {
            acc[curr.key] = curr.value;
            return acc;
        }, {} as Record<string, string>);

        let indent: number | null = null;
        if (Object.keys(jsonObject).length === 1) {
            indent = 0;
        } else {
            indent = 4;
        }

        return JSON.stringify(jsonObject, null, indent);
    }

    render() {
        if (this?.__json.length > 0 && Array.isArray(this?.__json)) {
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

                    {this.output_render_type === 'rows' && this.__json && (
                        <Fragment>
                            {this.__json.map(item => {
                                return (
                                    <div class="form-row field-data" key={item.index}>
                                        <div class="wrapper">
                                            <input value={item.key} onInput={event => this.#handleKeyInput(event, item)} placeholder="key" class="left" />
                                            <strong>:</strong>
                                            <input value={item.value} onInput={event => this.#handleValueInput(event, item)} placeholder="value" class="right" />
                                            <div class="items-center justify-center flex" onClick={() => this.#handleDelete(item.index)}>
                                                <img src={this.delete_svg_src} alt="❌" />
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </Fragment>
                    )}
                    <div class="form-row end-items flex">
                        {this.output_render_type === 'rows' ? (
                            <div class="items-center justify-center flex gap-1" onClick={() => this.#handleRowAdd()}>
                                <img src={this.add_svg_src} alt="➕" />
                                Add row
                            </div>
                        ) : (
                            <div></div>
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
