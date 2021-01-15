import {
  customElement,
  LitElement,
  css,
  property,
  queryAssignedNodes,
  queryAll,
  query,
} from 'lit-element';
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

  @queryAssignedNodes('', true)
  _defaultSlotNodes!: NodeListOf<HTMLElement>;

  @query('slot') protected tabsSlot!: HTMLElement;

  get headerNodes() {
    return (this.tabsSlot as HTMLSlotElement).assignedNodes({flatten: true});
  }

  @queryAll('my-accordion-panel')
  _buttons!: NodeListOf<HTMLElement>;

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('tabindex', '-1');
  }

  render() {
    return html`
      Nodes: ${this._defaultSlotNodes?.length} Buttons :
      ${this._buttons?.length} Children : ${this.children?.length}
      Header : ${this.headerNodes?.length}
      <slot></slot>
    `;
  }
}
