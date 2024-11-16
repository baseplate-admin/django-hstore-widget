import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

interface JSON_Data {
    key: string;
    value: string;
    index: number;
}

const djangoMapping = {
    input: 'vTextField',
    textarea: 'vLargeTextField',
};

@customElement('django-hstore-widget')
export class DjangoHstoreWidget extends LitElement {
    @property()
    accessor json = '';
    @property()
    accessor fieldName = '';
    @property({ type: Number })
    accessor cols = 40;
    @property({ type: Number })
    accessor rows = 10;
    @property()
    accessor deleteSvgSrc: string | null = null;
    @property()
    accessor addSvgSrc: string | null = null;
    @property()
    accessor editSvgSrc: string | null = null;

    @property({ type: Array }) private accessor jsonData =
        new Array<JSON_Data>();

    @property()
    private accessor error: string | null = null;
    @property()
    private accessor outputRenderType: 'rows' | 'textarea' = 'rows';

    // createRenderRoot() {
    //     return this;
    // }

    static styles = css`
        p {
            color: green;
        }
    `;

    parseJson(jsonString: string) {
        try {
            const jsonObject = JSON.parse(jsonString);
            this.jsonData = Object.keys(jsonObject).map((key, index) => ({
                key,
                value: jsonObject[key],
                index,
            }));
            this.error = null;
        } catch (err: any) {
            this.error = err.toString();
        }
    }

    handleDelete(index: number) {
        this.jsonData = this.jsonData.filter((obj) => obj.index !== index);
    }

    handleRowAdd() {
        const lastItem = this.jsonData[this.jsonData.length - 1];
        this.jsonData.push({
            index: lastItem ? lastItem.index + 1 : 0,
            key: '',
            value: '',
        });
    }

    handleToggleClick() {
        if (this.error) return;
        this.outputRenderType =
            this.outputRenderType === 'rows' ? 'textarea' : 'rows';
    }

    handleTextAreaInput(event: Event) {
        const target = event.currentTarget as HTMLTextAreaElement;
        this.parseJson(target.value || '{}');
        this.jsonData.forEach((item) => {
            if (typeof item.value === 'object') {
                this.error = `SyntaxError: 'ltree' doesn't support nested json`;
            }
        });
    }

    handleDictionaryInput(
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
        this.requestUpdate();
    }

    renderJsonComponent(item: { key: string; value: string; index: number }) {
        return html`
            <div class="form-row field-data" id="json_items">
                <div class="flex gap-2.5 items-center justify-start">
                    <input
                        .value=${item.key}
                        @input=${(event: Event) =>
                            this.handleDictionaryInput(event, item, 'key')}
                        placeholder="key"
                        class="${djangoMapping.input} min-width-150"
                    />
                    <strong>:</strong>
                    <input
                        .value=${item.value}
                        @input=${(event: Event) =>
                            this.handleDictionaryInput(event, item, 'value')}
                        placeholder="value"
                        class="${djangoMapping.input} min-width-300"
                    />
                    <div
                        class="items-center justify-center flex cursor-pointer select-none"
                        id="delete-button"
                        @click=${() => this.handleDelete(item.index)}
                    >
                        <img src=${this.deleteSvgSrc || '#'} alt="❌" />
                    </div>
                </div>
            </div>
        `;
    }

    protected render() {
        if (this.error) {
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
                        <a
                            href="https://github.com/baseplate-admin/django-hstore-widget/issues"
                            >file an issue at Github</a
                        >
                    </p>
                </div>
            `;
        }

        return html`
            <div class="flex gap-2.5 items-center">
                <textarea
                    class="${this.outputRenderType === 'textarea'
                        ? ''
                        : 'hidden invisible'} ${this.error === null
                        ? ''
                        : 'warning'} ${djangoMapping.textarea}"
                    .cols=${this.cols}
                    .name=${this.fieldName}
                    .rows=${this.rows}
                    @input=${this.handleTextAreaInput}
                    .value=${this.getJSONString}
                ></textarea>
                ${this.error !== null
                    ? html`
                          <div class="warning brightness-90" id="textbox_error">
                              ${this.error}
                          </div>
                      `
                    : null}
            </div>

            ${this.outputRenderType === 'rows' &&
            this.error === null &&
            this.jsonData
                ? html`
                      ${this.jsonData.map((item) =>
                          this.renderJsonComponent(item)
                      )}
                  `
                : null}

            <div class="form-row justify-between items-center flex">
                ${this.outputRenderType === 'rows'
                    ? html`
                          <div
                              class="items-center select-none justify-center flex gap-1 cursor-pointer"
                              id="add-button"
                              @click=${this.handleRowAdd}
                          >
                              <img src=${this.addSvgSrc || '#'} alt="➕" /> Add
                              row
                          </div>
                      `
                    : null}

                <div
                    class="items-center select-none justify-center flex gap-1 ${this
                        .error === null
                        ? 'cursor-pointer'
                        : 'opacity-60'}"
                    id="textarea_open_close_toggle"
                    @click=${this.handleToggleClick}
                >
                    ${this.outputRenderType === 'textarea'
                        ? html`
                              <div>
                                  <img
                                      src=${this.deleteSvgSrc || '#'}
                                      alt="❌"
                                  />
                                  Close TextArea
                              </div>
                          `
                        : this.outputRenderType === 'rows'
                        ? html`
                              <div>
                                  <img src=${this.editSvgSrc || '#'} alt="✏️" />
                                  Open TextArea
                              </div>
                          `
                        : html`
                              <div
                                  class="flex items-center justify-center w-full gap-1"
                              >
                                  <p>Output render type is</p>
                                  <code class="warning cursor-default"
                                      >${this.outputRenderType}</code
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
                                      <a
                                          href="https://github.com/baseplate-admin/django-hstore-widget/issues"
                                          >file an issue at Github</a
                                      >
                                  </p>
                              </div>
                          `}
                </div>
            </div>
        `;
    }

    get getJSONString() {
        const jsonObject = this.jsonData.reduce((acc, curr) => {
            acc[curr.key] = curr.value;
            return acc;
        }, {} as Record<string, string>);
        const indent = this.jsonData.length > 1 ? 4 : 0;
        return JSON.stringify(jsonObject, null, indent);
    }
}
