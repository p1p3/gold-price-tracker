import { customElement, LitElement, css, property } from 'lit-element';
import { html } from 'lit-html';
import { ariaPropertyState } from './aria.states';
import { kebabCase } from './helpers';

@customElement('my-accordion-panel')
export class MyAccordionPanel extends LitElement {
  public static styles = css`
    @tailwind base;
    @tailwind utilities;

    :host {
      @apply p-5 w-full bg-red-500 block;
    }
  `;

  @property({ type: String }) label = '';

  @ariaPropertyState({ state: 'expanded' })
  expanded = false;

  expand() {
    return (this.expanded = !this.expanded);
  }

  render() {
    return html`
      <h3 class="">
        <button
          id="${kebabCase(this.label)}-button"
          type="button"
          aria-controls="${kebabCase(this.label)}-panel"
          @click="${() => this.expand()}"
          class="bg-red-500"
        >
          ${this.label}
        </button>
      </h3>
      <div
        id="${kebabCase(this.label)}-panel"
        role="region"
        aria-labelledby="${kebabCase(this.label)}-button"
        .hidden="${!this.expanded}"
      >
        <slot></slot>
      </div>
    `;
  }
}
