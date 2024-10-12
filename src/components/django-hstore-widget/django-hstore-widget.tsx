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
    @State() _json: { [key: string]: string } = {};
    @State() output_render_type: 'rows' | 'textarea' = 'rows';

    connectedCallback() {
        this._json = JSON.parse(this.json);
        this._json['hello'] = 'world';
    }

    private handleDelete(index: number) {
        const keys = Object.keys(this._json);

        if (index >= 0 && index < keys.length) {
            const keyToDelete = keys[index];
            const { [keyToDelete]: _, ...rest } = this._json;
            this._json = rest;
        } else {
            console.error('Invalid index');
        }
    }

    private handleRowAdd() {
        this._json[''] = '';
        this._json = { ...this._json };
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
    private handleDataInput(old_key: string, key: string, value: string) {
        if (old_key in this._json && old_key !== key) {
            delete this._json[old_key];
        }

        this._json[key] = value;

        if (old_key !== key) {
            const orderedJson = {};
            for (const k of Object.keys(this._json)) {
                if (k !== key) {
                    orderedJson[k] = this._json[k];
                }
            }
            orderedJson[key] = value;
            this._json = orderedJson;
        }
    }

    render() {
        return (
            <Host>
                <h2>{this.field_name}</h2>
                {this.output_render_type === 'textarea' && (
                    <Fragment>
                        <textarea
                            class="vLargeTextField"
                            cols={40}
                            name={`${this.field_name}`}
                            rows={10}
                            onInput={event => {
                                const target = event.currentTarget as HTMLTextAreaElement;
                                const value = target.value;
                                this._json = { ...JSON.parse(value) };
                            }}
                            value={JSON.stringify(this._json, null, Object.keys(this._json).length === 1 ? 0 : 4)}
                        />
                    </Fragment>
                )}

                {this.output_render_type === 'rows' && this._json && (
                    <Fragment>
                        {Object.entries(this._json).map((item, index) => {
                            return (
                                <div class="form-row field-data">
                                    <div class="wrapper">
                                        <input
                                            value={item[0]}
                                            onInput={event => {
                                                const target = event.currentTarget as HTMLInputElement;
                                                const value = target.value;
                                                const old_key = item[0];
                                                item[0] = value;

                                                this.handleDataInput(old_key, item[0], item[1]);
                                            }}
                                            placeholder="key"
                                            class="left"
                                        />
                                        <strong>:</strong>
                                        <input
                                            value={item[1]}
                                            onInput={event => {
                                                const target = event.currentTarget as HTMLInputElement;
                                                const value = target.value;
                                                const old_key = item[1];
                                                item[1] = value;

                                                this.handleDataInput(old_key, item[0], item[1]);
                                            }}
                                            placeholder="value"
                                            class="right"
                                        />
                                        <div
                                            class="image-div"
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
