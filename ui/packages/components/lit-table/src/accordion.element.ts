import { customElement, LitElement, css, property } from 'lit-element';
import { html } from 'lit-html';

@customElement('my-accordion')
export class MyAccordion extends LitElement {
  public static styles = css`
    @tailwind base;
    @tailwind utilities;

    :host {
      @apply w-full block;
    }
  `;

  @property({ type: Boolean }) multiPanel = false;

  @property({ type: Array }) panels = [];

  render() {
    return html` <slot></slot> `;
  }
}
