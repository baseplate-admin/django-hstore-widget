import { Component, Host, h, Prop, State, Listen } from '@stencil/core';

@Component({
  tag: 'django-hstore-widget',
  styleUrl: 'django-hstore-widget.css',
  shadow: false,
})
export class DjangoHstoreWidget {
  @Prop() json: string;
  @Prop() field_name: string;

  // Image
  @Prop() delete_svg_src: string;

  // State
  @State() _json: { [key: string]: string } = {};

  connectedCallback() {
    this._json = JSON.parse(this.json);
    this._json['hello'] = 'world';
  }

  handleDelete(index: number) {
    let json = this._json;
    const keys = Object.keys(this._json);

    if (index >= 0 && index < keys.length) {
      const keyToDelete = keys[index];
      delete json[keyToDelete];
      this._json = json;
    } else {
      console.log('Invalid index');
    }
    console.log(this._json);
  }

  render() {
    return (
      <Host>
        <h2>{this.field_name}</h2>
        {this._json &&
          Object.entries(this._json).map((item, index) => {
            return (
              <div class="wrapper" data-index={index}>
                <input value={item[0]} class="left" />
                :
                <input value={item[1]} class="right" />
                <div
                  class="image-div"
                  onClick={() => {
                    this.handleDelete(index);
                  }}
                >
                  <img src={this.delete_svg_src} />X
                </div>
              </div>
            );
          })}
      </Host>
    );
  }
}
