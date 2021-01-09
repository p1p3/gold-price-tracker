import { customElement, LitElement, css, property } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';

import { html } from 'lit-html';
import { ariaPropertyState } from './aria.states';
import { kebabCase } from './helpers';

@customElement('my-accordion-panel')
export class MyAccordionPanel extends LitElement {
  public static styles = css`
    @tailwind base;
    @tailwind utilities;

    :host {
      @apply block;
    }

    .icon {
      height: 0.5rem;
      width: 0.5rem;
      border: solid hsl(0, 0%, 62%);
      border-width: 0 2px 2px 0;
      transform: translateY(-50%) rotate(45deg);
    }

    .icon.expanded {
      transform: translateY(-50%) rotate(-135deg);
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
      <h3 class="p-5 w-full border-gray-400  border-solid border-2">
        <button
          id="${kebabCase(this.label)}-button"
          type="button"
          aria-controls="${kebabCase(this.label)}-panel"
          @click="${() => this.expand()}"
          class="w-full flex items-center justify-start pr-1"
        >
          <span class="flex-grow justify-self-start text-left"
            >${this.label}</span
          >
          <span
            class=${classMap({
              icon: true,
              'pointer-events-none': true,
              'justify-self-end': true,
              expanded: this.expanded,
            })}
          ></span>
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
