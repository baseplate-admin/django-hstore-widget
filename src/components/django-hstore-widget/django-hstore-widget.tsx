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

  // State
  @State() _json: { [key: string]: string } = {};

  connectedCallback() {
    this._json = JSON.parse(this.json);
    this._json['hello'] = 'world';
  }

  handleDelete(index: number) {
    const keys = Object.keys(this._json);

    if (index >= 0 && index < keys.length) {
      const keyToDelete = keys[index];
      const { [keyToDelete]: _, ...rest } = this._json;
      this._json = rest;
    } else {
      console.error('Invalid index');
    }
  }

  handleRowAdd() {
    console.log(this._json);
  }

  render() {
    return (
      <Host>
        <h2>{this.field_name}</h2>
        {this._json && (
          <Fragment>
            {Object.entries(this._json).map((item, index) => {
              return (
                <div class="form-row field-data">
                  <div class="wrapper">
                    <input value={item[0] ?? 'key'} class="left" />
                    <strong>:</strong>
                    <input value={item[1] ?? 'value'} class="right" />
                    <div
                      class="image-div"
                      onClick={() => {
                        this.handleDelete(index);
                      }}
                    >
                      <img src={this.delete_svg_src} alt="X" />
                    </div>
                  </div>
                </div>
              );
            })}
          </Fragment>
        )}
        <div class="form-row end-items">
          <div onClick={this.handleRowAdd}>
            <img src={this.add_svg_src} alt="+" />
            Add row
          </div>
          <div></div>
        </div>
      </Host>
    );
  }
}
