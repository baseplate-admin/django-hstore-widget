import { createStore } from '@stencil/store';

const { state } = createStore({
    delete_svg_src: '',
    add_svg_src: '',
    edit_svg_src: '',
});
export default state;
