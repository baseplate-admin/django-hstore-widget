import { Component, h, Host, Prop } from '@stencil/core';
import imageState from '$store/image';
@Component({
    tag: 'image-icon',
    shadow: true,
})
export class ImageIcon {
    @Prop() type!: 'delete' | 'add' | 'edit';

    render() {
        const mapping = {
            delete: { src: imageState.delete_svg_src, alt: '❌' },
            add: { src: imageState.add_svg_src, alt: '➕' },
            edit: { src: imageState.edit_svg_src, alt: '✏️' },
        };
        const icon = mapping[this.type];
        if (!icon?.src) console.error(`Icon type "${this.type}" src is missing`);
        return (
            <Host>
                <img src={icon.src} alt={icon.alt} />
            </Host>
        );
    }
}
