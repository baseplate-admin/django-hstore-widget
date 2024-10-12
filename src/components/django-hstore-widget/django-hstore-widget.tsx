import { Component, Host, h, Prop, State, Fragment } from '@stencil/core';

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
    @State() _json: Array<{ key: string; value: string; index: number }> = new Array();
    @State() output_render_type: 'rows' | 'textarea' = 'rows';

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

    private handleDelete(index: number) {
        const json = this._json.filter(obj => obj.index !== index);
        this._json = structuredClone(json);
    }

    private handleRowAdd() {
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

    private handleToggleClick() {
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

    private getJSONWithoutIndex() {
        return this._json.reduce((acc, curr) => {
            acc[curr.key] = curr.value;
            return acc;
        }, {} as Record<string, string>);
    }

    private handleTextAreaInput(text: string) {
        this.json = text;
        this.connectedCallback();
    }

    render() {
        return (
            <Host>
                <textarea
                    class={`${this.output_render_type === 'textarea' ? '' : 'hidden'} vLargeTextField`}
                    cols={40}
                    name={`${this.field_name}`}
                    rows={10}
                    onInput={event => {
                        const target = event.currentTarget as HTMLTextAreaElement;
                        const value = target.value;
                        this.handleTextAreaInput(value);
                    }}
                    value={JSON.stringify(this.getJSONWithoutIndex(), null, Object.keys(this._json).length === 1 ? 0 : 4)}
                />

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
                                                this.handleDelete(index);
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
                                onClick={() => {
                                    this.handleRowAdd();
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
                        class="centered"
                        onClick={() => {
                            this.handleToggleClick();
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
