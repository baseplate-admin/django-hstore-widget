import { LitElement, html, css } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { customElement, property, state } from 'lit/decorators.js';

const cn = (...classes: (string | false | undefined | null)[]) =>
    classes.filter(Boolean).join(' ');

const django_mapping = Object.freeze({
    input: 'vTextField',
    textarea: 'vLargeTextField',
});

@customElement('django-hstore-widget')
class DjangoHstoreWidget extends LitElement {
    static styles = css`
        django-hstore-widget {
            button {
                all: unset;
            }

            /* Arbitrary min-width */
            .min-width-\[150px\] {
                min-width: 150px;
            }

            .min-width-\[300px\] {
                min-width: 300px;
            }

            /* Display types */

            .flex {
                display: flex;
            }

            .hidden {
                display: none;
            }

            /* User Select */

            .select-none {
                user-select: none;
            }

            /* Justify Items */

            .justify-center {
                justify-content: center;
            }

            .justify-start {
                justify-content: flex-start;
            }

            .justify-between {
                justify-content: space-between;
            }

            /* Align items */

            .items-center {
                align-items: center;
            }

            /* Flex Direction */

            .flex-col {
                flex-direction: column;
            }

            /* Visibility */

            .invisible {
                visibility: hidden;
            }

            /* Gaps */

            .gap-1 {
                gap: 0.25rem;
                /* 4px */
            }

            .gap-2\.5 {
                gap: 0.625rem;
                /* 10px */
            }

            /* Opacity */

            .opacity-60 {
                opacity: 0.6;
            }

            /* Cursor types */

            .cursor-pointer {
                cursor: pointer;
            }

            .cursor-default {
                cursor: default;
            }

            /* Brightness */

            .brightness-90 {
                filter: brightness(0.9);
            }

            /* Colors */

            .warning {
                color: var(--error-fg, red);
                border-color: var(--error-fg, red);
            }
        }
    `;

    // Properties

    @property({ type: String, reflect: true }) json = '';
    @property({ type: String, reflect: true }) field_name = '';

    @property({ type: Number, reflect: true }) cols = 40;
    @property({ type: Number, reflect: true }) rows = 10;

    @property({ type: String }) delete_svg_src = undefined;
    @property({ type: String }) add_svg_src = undefined;
    @property({ type: String }) edit_svg_src = undefined;

    // State

    @state() private mounted = false;
    @state() private error: string | null = null;
    @state() private textarea_value = '';
    @state() private output_render_type: 'rows' | 'textarea' = 'rows';
    @state() private __json: Array<{
        key: string;
        value: string;
        index: number;
    }> = [];

    // Lifecycle

    connectedCallback() {
        super.connectedCallback();
        this.#parseJson(this.json).then(() => {
            this.mounted = !this.error;
        });
    }

    updated(changedProperties: Map<string, unknown>) {
        if (changedProperties.has('json')) {
            this.#parseJson(this.json);
        }
        if (changedProperties.has('__json')) {
            if (this.output_render_type === 'rows') {
                // Silent update
                this.textarea_value = this.#getJSONString({ indent: 0 });
            }
        }
    }

    // Private getters

    get #GITHUB_ISSUE_URL() {
        return 'https://github.com/baseplate-admin/django-hstore-widget/issues';
    }

    #getJSONString({ indent }: { indent?: number } = {}) {
        const jsonObject = this.__json.reduce((acc, curr) => {
            if (curr.key || curr.value) acc[curr.key ?? ''] = curr.value ?? '';
            return acc;
        }, {} as Record<string, string>);

        if (indent === undefined) {
            indent = Object.keys(jsonObject).length > 1 ? 4 : 0;
        }
        return JSON.stringify(jsonObject, null, indent);
    }

    // Private methods

    async #parseJson(json_string: string) {
        try {
            const json_object = JSON.parse(json_string);
            this.__json = Object.keys(json_object).map((key, index) => ({
                key,
                value: json_object[key],
                index,
            }));
            this.error = null;
        } catch (err) {
            if (err instanceof Error) {
                this.error = err.toString();
            } else {
                this.error = 'An unknown error occurred';
            }
        } finally {
            this.__json = structuredClone(this.__json);
        }
    }

    // Handlers

    #handleDelete(index: number) {
        this.__json = this.__json.filter((obj) => obj.index !== index);
    }

    #handleRowAdd() {
        const last_item = this.__json.at(-1);
        this.__json = [
            ...this.__json,
            {
                index: last_item ? last_item.index + 1 : 0,
                key: '',
                value: '',
            },
        ];
    }

    #handleToggleClick() {
        if (this.error) return;

        if (this.output_render_type === 'rows') {
            this.output_render_type = 'textarea';
            this.textarea_value = this.#getJSONString();
        } else if (this.output_render_type === 'textarea') {
            this.output_render_type = 'rows';
        } else {
            console.error(
                `Something is wrong with 'output_render_type'. It is ${this.output_render_type}`
            );
        }
    }

    #handleTextAreaInput(event: Event) {
        const target = event.currentTarget as HTMLTextAreaElement;
        this.#parseJson(target.value || '{}');

        this.__json.forEach((item) => {
            if (typeof item.value === 'object') {
                this.error = `SyntaxError: 'ltree' doesn't support nested json`;
            }
        });
    }

    #handleDictionaryInput(
        event: Event,
        item: { key: string; value: string; index: number },
        type: 'key' | 'value'
    ) {
        const target = event.currentTarget as HTMLInputElement;
        const value = target.value;

        if (type === 'key') {
            item.key = value;
        } else if (type === 'value') {
            item.value = value;
        }

        // Trigger re-render by cloning array
        this.__json = structuredClone(this.__json);
    }

    // Render helpers

    #JSONComponent(item: { key: string; value: string; index: number }) {
        return html`
            <div class="form-row field-data" id="json_items" key=${item.index}>
                <div class="flex gap-2.5 items-center justify-start">
                    <input
                        .value=${item.key}
                        @input=${(e: Event) =>
                            this.#handleDictionaryInput(e, item, 'key')}
                        placeholder="key"
                        class=${cn(
                            `min-width-[150px]`,
                            django_mapping['input']
                        )}
                    />
                    <strong>:</strong>
                    <input
                        .value=${item.value}
                        @input=${(e: Event) =>
                            this.#handleDictionaryInput(e, item, 'value')}
                        placeholder="value"
                        class=${cn(
                            'min-width-[300px]',
                            django_mapping['input']
                        )}
                    />
                    <div
                        role="button"
                        aria-label="Delete ${item.key}:${item.value} at index ${item.index}"
                        class="items-center justify-center flex cursor-pointer select-none"
                        id="delete-button"
                        @click=${() => this.#handleDelete(item.index)}
                    >
                        ${this.#ImageIconComponent({ type: 'delete' })}
                    </div>
                </div>
            </div>
        `;
    }

    #ImageIconComponent({ type }: { type: 'delete' | 'add' | 'edit' }) {
        const mapping = {
            delete: { src: this.delete_svg_src, alt: '❌' },
            add: { src: this.add_svg_src, alt: '➕' },
            edit: { src: this.edit_svg_src, alt: '✏️' },
        };

        const icon = mapping[type];
        if (!icon)
            throw new Error(
                `Icon type "${type}" is not defined in the mapping.`
            );
        return html`<img src=${icon.src} alt=${icon.alt} />`;
    }

    // Render

    render() {
        if (!this.mounted) {
            return html`
                <div
                    class="flex items-center justify-center gap-1"
                    id="mount_error"
                >
                    <p>
                        Failed to mount. Unexpected JSON from
                        <code>django backend</code>
                    </p>
                    <p>
                        The provided json is:
                        <code class="warning">${this.json}</code> which is not
                        valid.
                    </p>
                    <p>
                        Please check the json or
                        <a href=${this.#GITHUB_ISSUE_URL}
                            >file an issue at Github</a
                        >
                    </p>
                </div>
            `;
        }

        return html`
            <div class="flex gap-2.5 items-center">
                <textarea
                    class=${cn(
                        this.output_render_type === 'rows' &&
                            'hidden invisible',
                        this.error && 'warning',
                        django_mapping['textarea']
                    )}
                    cols=${this.cols}
                    name=${this.field_name}
                    rows=${this.rows}
                    @input=${this.#handleTextAreaInput}
                    .value=${this.textarea_value}
                ></textarea>
                <div
                    class=${cn(
                        'warning brightness-90',
                        this.error ? '' : 'invisible'
                    )}
                    id="textbox_error"
                >
                    ${this.error}
                </div>
            </div>

            <!-- Render JSON only in rows mode -->
            ${this.output_render_type === 'rows' && !this.error && this.__json
                ? html`${this.__json.map((item) => this.#JSONComponent(item))}`
                : null}

            <div class="form-row justify-between items-center flex">
                <button
                    type="button"
                    class=${cn(
                        'items-center select-none justify-center flex gap-1 cursor-pointer',
                        this.output_render_type === 'rows' ? '' : 'invisible'
                    )}
                    id="add-button"
                    aria-label="Add Row"
                    @click=${this.#handleRowAdd}
                >
                    ${this.#ImageIconComponent({ type: 'add' })} Add row
                </button>

                <div
                    class=${cn(
                        'items-center select-none justify-center flex gap-1',
                        this.error ? 'opacity-60' : 'cursor-pointer'
                    )}
                    id="textarea_open_close_toggle"
                >
                    ${this.output_render_type === 'textarea'
                        ? html`
                              <button
                                  type="button"
                                  class="items-center select-none justify-center flex gap-1 cursor-pointer"
                                  aria-label="Close TextArea"
                                  @click=${this.#handleToggleClick}
                              >
                                  ${this.#ImageIconComponent({
                                      type: 'delete',
                                  })}
                                  Close TextArea
                              </button>
                          `
                        : this.output_render_type === 'rows'
                        ? html`
                              <button
                                  type="button"
                                  class="items-center select-none justify-center flex gap-1 cursor-pointer"
                                  aria-label="Open TextArea"
                                  @click=${this.#handleToggleClick}
                              >
                                  ${this.#ImageIconComponent({ type: 'edit' })}
                                  Open TextArea
                              </button>
                          `
                        : html`
                              <div
                                  class="flex items-center justify-center w-full gap-1"
                              >
                                  <p>Output render type is</p>
                                  <code class="warning cursor-default"
                                      >${this.output_render_type}</code
                                  >
                                  <p>which doesn't fall in</p>
                                  <code class="warning cursor-default"
                                      >rows</code
                                  >
                                  <p>or</p>
                                  <code class="warning cursor-default"
                                      >textarea</code
                                  >
                                  <p>
                                      Please
                                      <a href=${this.#GITHUB_ISSUE_URL}
                                          >file an issue at Github</a
                                      >
                                  </p>
                              </div>
                          `}
                </div>
            </div>
        `;
    }
}
