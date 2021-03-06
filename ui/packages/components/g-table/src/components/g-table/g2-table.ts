import { Resizer } from './resizible-table';

const css = `
table.g-table {
  min-width: 100vw;
  width: auto;
  flex: 1;
  display: grid;
  border-collapse: collapse;
}

.g-table > thead,
.g-table > tbody,
.g-table > tbody > tr,
.g-table > thead > tr {
  display: contents;
}

th,
td {
  padding: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

th {
  top: 0;
  background: #6c7ae0;
  text-align: left;
  font-weight: normal;
  font-size: 1.1rem;
  color: white;
  position: relative;
}

th:last-child {
  border: 0;
}

th,
th * {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.resize-handle {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  background: black;
  opacity: 0;
  width: 3px;
  cursor: col-resize;
  border-right: 15px solid rgba(255, 0, 0, 0);
  border-left: 15px solid rgba(255, 0, 0, 0);
  background-clip: padding-box;
}

.resize-handle:hover,
[data-on-resize='true'] .resize-handle {
  opacity: 0.5;
}

th:hover .resize-handle {
  opacity: 0.3;
}

td {
  padding-top: 10px;
  padding-bottom: 10px;
  color: #808080;
}

tr:nth-child(even) td {
  background: #f8f6ff;
}

`;

export class G2Table extends HTMLTableElement {
  minSize = 150;

  private columnTypeToRatioMap = {
    'numeric': 1,
    'default': 1.67,
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

    const columns = Array.from((this.querySelectorAll('.g-table tr th') as NodeListOf<HTMLTableHeaderCellElement>) ?? []).map(r => ({ ref: r, size: this.formatSize(r.dataset) }));
    new Resizer(this.updateGridSize, columns, this.minSize);

    const style = document.createElement('style');
    style.innerHTML = css;

    this.appendChild(style);
    this.updateGridSize(columns);
  }

  private formatSize = (columnData: DOMStringMap) => `minmax(${this.minSize}px, ${this.maxSize(columnData)})`;

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
