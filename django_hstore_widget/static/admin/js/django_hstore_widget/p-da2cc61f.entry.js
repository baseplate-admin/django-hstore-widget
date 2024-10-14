import{r as e,h as t,F as s,H as i}from"./p-f350f2d0.js";const a=class{constructor(t){e(this,t),this.json=void 0,this.field_name=void 0,this.delete_svg_src="/static/admin/img/icon-deletelink.svg",this.add_svg_src="/static/admin/img/icon-addlink.svg",this.edit_svg_src="/static/admin/img/icon-changelink.svg",this.output_render_type="rows",this._json=new Array,this._json_string=""}connectedCallback(){let e=JSON.parse(this.json),t=Object.keys(e).map(((t,s)=>({key:t,value:e[t],index:s})));this._json=t,this.updateJSONString()}handleDelete(e){const t=this._json.filter((t=>t.index!==e));this._json=structuredClone(t)}handleRowAdd(){let e=this._json;const t=e.at(-1);t?(e.push({index:t.index+1,key:"",value:""}),this._json=structuredClone(e)):console.error("`this._json` is empty.")}handleToggleClick(){switch(this.output_render_type){case"rows":this.output_render_type="textarea";break;case"textarea":this.output_render_type="rows";break;default:console.error("Something is wrong with `output_render_type`")}}getJSONWithoutIndex(){return this._json.reduce(((e,t)=>(e[t.key]=t.value,e)),{})}updateJSONString(){this._json_string=JSON.stringify(this.getJSONWithoutIndex(),null,1===Object.keys(this._json).length?0:4)}handleTextAreaInput(e){this.json=e,this.connectedCallback()}render(){return t(i,{key:"3939c313ce28b1c8adcaebcc963c7233b219a274"},t("textarea",{key:"5ebbbe37ed60845279c7066f755b0482be766c28",class:("textarea"===this.output_render_type?"":"hidden")+" vLargeTextField",cols:40,name:`${this.field_name}`,rows:10,onInput:e=>{this.handleTextAreaInput(e.currentTarget.value)}},this._json_string),"rows"===this.output_render_type&&this._json&&t(s,{key:"aace4acc5c7732e1599e2770c44454939e34ad6f"},this._json.map(((e,s)=>t("div",{class:"form-row field-data"},t("div",{class:"wrapper"},t("input",{value:e.key,onInput:t=>{e.key=t.currentTarget.value,this.updateJSONString()},placeholder:"key",class:"left"}),t("strong",null,":"),t("input",{value:e.value,onInput:()=>{const t=event.currentTarget;e.value=t.value,this.updateJSONString()},placeholder:"value",class:"right"}),t("div",{class:"centered",onClick:()=>{this.handleDelete(s)}},t("img",{src:this.delete_svg_src,alt:"❌"}))))))),t("div",{key:"7c0673377ced2cf4ba08c5ef514ba3589bef1581",class:"form-row end-items"},t(s,null,"rows"===this.output_render_type?t("div",{class:"centered gap-1",onClick:()=>{this.handleRowAdd()}},t("img",{src:this.add_svg_src,alt:"➕"}),"Add row"):t("div",null)),t("div",{key:"aa11e0678a00af89474fa737b8659955a06fd8f3",class:"centered gap-1",onClick:()=>{this.handleToggleClick()}},"textarea"===this.output_render_type&&t(s,{key:"c923fff331885529802debc6b5f6ff62a1c2d368"},t("img",{key:"8c158ec1391d7ca3ee73df85c012c275d0b8c1d5",src:this.delete_svg_src,alt:"❌"}),"Close TextArea"),"rows"===this.output_render_type&&t(s,{key:"16864340c642ab6d8dad986939b61a0cfb0e4035"},t("img",{key:"a2c8b3aec4ba01fe65d390e8053998012c3fc2e6",src:this.edit_svg_src,alt:"✏️"}),"Open TextArea"))))}};a.style="django-hstore-widget .wrapper{display:flex;gap:10px}django-hstore-widget .left{min-width:150px}django-hstore-widget .right{min-width:300px}django-hstore-widget .centered{display:flex;align-items:center;justify-content:center}django-hstore-widget .end-items{display:flex;justify-content:space-between;align-items:center}django-hstore-widget .hidden{display:none;visibility:hidden}django-hstore-widget .gap-1{gap:0.25rem;}";export{a as django_hstore_widget}