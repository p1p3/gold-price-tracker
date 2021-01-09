import { css, customElement } from '@microsoft/fast-element';
import { DataGrid, DataGridRow, createDataGridTemplate, DataGridCell, createDataGridRowTemplate, createDataGridCellTemplate } from '@microsoft/fast-foundation';

export const DataGridStyles = css`
  :host {
    display: flex;
    position: relative;
    flex-direction: column;
  }
`;

export const DataGridRowStyles = css`
    :host {
        display: grid;
        padding: 1px 0;
        box-sizing: border-box;
        width: 100%;
        border-bottom: calc(var(--outline-width) * 1px) solid var(--neutral-divider-rest);
    }
    :host(.header) {
    }
`

@customElement({
  name: 'gf-data-grid',
  template: createDataGridTemplate('gf'),
  styles: DataGridStyles,
})
export class FastTable extends DataGrid {}

@customElement({
  name: 'gf-data-grid-row',
  template: createDataGridRowTemplate('fast'),
  styles: DataGridRowStyles,
})
export class FASTDataGridRow extends DataGridRow {}


export const DataGridCellStyles = css`
    :host {
        padding: calc(var(--design-unit) * 1px) calc(var(--design-unit) * 3px);
        color: blue;
        box-sizing: border-box,
        font-family: var(--body-font);
        font-size: var(--type-ramp-base-font-size);
        line-height: var(--type-ramp-base-line-height);
        font-weight: 400;
        border: transparent calc(var(--outline-width) * 1px) solid;
        overflow: hidden;
        white-space: nowrap;
        border-radius: calc(var(--corner-radius) * 1px);
    }
    :host(.column-header) {
        font-weight: 600;
    }
`

@customElement({
  name: 'gf-data-grid-cell',
  template: createDataGridCellTemplate('fast'),
  styles: DataGridCellStyles
})
export class FASTDataGridCell extends DataGridCell {}

export * from '@microsoft/fast-foundation/dist/esm/data-grid';
