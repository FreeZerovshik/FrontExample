/* eslint-disable no-param-reassign */
import Prism from 'prismjs';
import { Directive } from 'vue';

const CodeHighlight: Directive = {
  beforeMount(el: any, binding: any) {
    const { modifiers } = binding;
    const { value } = binding;

    if (modifiers.script || value === 'script') {
      el.className = 'language-javascript';
    } else if (modifiers.css || value === 'css') {
      el.className = 'language-css';
    } else {
      el.className = 'language-markup';
    }

    Prism.highlightElement(el.children[0]);
  },
};

export default CodeHighlight;
