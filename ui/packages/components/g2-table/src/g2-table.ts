import { Resizer } from './resizible-table';
import styles from './g2-table.scss';

export class G2Table extends HTMLTableElement {
  minSize = 150;

  private columnTypeToRatioMap = {
    numeric: 1,
    default: 1.67,
    'text-short': 1.67,
    'text-long': 3.33,
  };

  constructor() {
    super();
  }

  private updateGridSize = (columns: { size: string }[]) => {
    this.style.gridTemplateColumns = columns.map(({ size }) => size).join(' ');
  };

  connectedCallback() {
    // const rows = Array.from(this.querySelectorAll(".tr")?.rows ?? []);
    this.classList.add('g-table');

    const columns = Array.from(
      (this.querySelectorAll('.g-table tr th') as NodeListOf<HTMLTableHeaderCellElement>) ?? []
    ).map((r) => ({ ref: r, size: this.formatSize(r.dataset) }));
    new Resizer(this.updateGridSize, columns, this.minSize);

    const style = document.createElement('style');
    style.innerHTML = styles;

    this.appendChild(style);
    this.updateGridSize(columns);
  }

  private formatSize = (columnData: DOMStringMap) =>
    `minmax(${this.minSize}px, ${this.maxSize(columnData)})`;

  private maxSize = (columnData: DOMStringMap) => {
    if ('type' in columnData === false) {
      return this.columnTypeToRatioMap.default;
    }
    const type = columnData.type;

    if (type in this.columnTypeToRatioMap === false) {
      return this.columnTypeToRatioMap.default;
    }

    return this.columnTypeToRatioMap[type] + 'fr';
  };
}
