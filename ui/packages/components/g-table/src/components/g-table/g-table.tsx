// /* @jsx h */
// import { h, Component, State, Prop } from '@stencil/core';
// import { Resizer } from './resizible-table';

// @Component({
//   tag: 'g-table',
//   styleUrl: 'g-table.css',
//   shadow: true,
// })
// export class GTable {
//   @Prop() minSize = 150;

//   private columnTypeToRatioMap = {
//     'numeric': 1,
//     'default': 1.67,
//     'text-short': 1.67,
//     'text-long': 3.33,
//   };

//   @State() gridTemplateColumns: string;
//   private updateGridSize = (columns: { size: string }[]) => {
//     this.gridTemplateColumns = columns.map(({ size }) => size).join(' ');
//   };

//   table!: HTMLTableElement;
//   rows: HTMLTableRowElement[] = [];
//   columns: { ref: HTMLTableHeaderCellElement; size: string }[] = [];

//   componentDidRender() {
//     this.rows = Array.from(this.table?.rows ?? []);
//     this.columns = Array.from((this.table?.tHead?.rows[0].childNodes as NodeListOf<HTMLTableHeaderCellElement>) ?? []).map(r => ({ ref: r, size: this.formatSize(r.dataset) }));

//     new Resizer(this.updateGridSize, this.columns, this.minSize);
//   }

//   componentDidLoad() {
//     this.updateGridSize(this.columns);
//   }

//   private formatSize = (columnData: DOMStringMap) => `minmax(${this.minSize}px, ${this.maxSize(columnData)})`;

//   private maxSize = (columnData: DOMStringMap) => {
//     if ('type' in columnData === false) {
//       return this.columnTypeToRatioMap.default;
//     }
//     const type = columnData.type;

//     if (type in this.columnTypeToRatioMap === false) {
//       return this.columnTypeToRatioMap.default;
//     }

//     return this.columnTypeToRatioMap[type] + 'fr';
//   };

//   render() {
//     return (
//       <table ref={el => (this.table = el as HTMLTableElement)} style={{ 'grid-template-columns': `${this.gridTemplateColumns}` }}>
//         <slot></slot>
//       </table>
//     );
//   }
// }
/* @jsx h */
import { h, Component, State, Prop } from "@stencil/core";

@Component({
  tag: "g-table",
  styleUrl: "g-table.css",
  shadow: false,
})
export class MyCounter {
@Prop() minSize = 150;

private columnTypeToRatioMap = {
  numeric: 1,
  default :  1.67,
  'text-short': 1.67,
  'text-long': 3.33,
};

@State() gridTemplateColumns:string;
private setGridSize = (columns: {size: string}[])=>{
    this.gridTemplateColumns = columns
    .map( ({size})  => size)
    .join(' ');
}

@State() table!: HTMLTableElement;
rows: HTMLTableRowElement[] = [];
columns: {ref : HTMLTableHeaderCellElement, size: string}[] = [];


private onMouseMove = (e:MouseEvent) => requestAnimationFrame(() => {
  // Calculate the desired width
  const horizontalScrollOffset = document.documentElement.scrollLeft;

  // Update the column object with the new size value
  const column = this.columns.find(({ ref }) => ref.dataset.onResize === 'true');
  if(!column){return}

  const width = (horizontalScrollOffset + e.clientX) - column.ref.offsetLeft;

  column.size = Math.max(this.minSize, width) + 'px'; // Enforce our minimum

  // For the other headers which don't have a set width, fix it to their computed width
  this.columns.forEach((column) => {
    if(column.size.startsWith('minmax')){ // isn't fixed yet (it would be a pixel value otherwise)
      column.size = `${column.ref.clientWidth}px`;
    }
  });

  this.setGridSize(this.columns);
});

private onMouseUp = () => {
  window.removeEventListener('mousemove', this.onMouseMove);
  window.removeEventListener('mouseup', this.onMouseUp);
  const column = this.columns.find(({ ref }) => ref.dataset.onResize);

  delete column.ref.dataset.onResize
};

// Get ready, they're about to resize
private initResize = ({ target } : {target:EventTarget}) => {
  const header = (target as HTMLElement).parentNode as HTMLHeadingElement;
  header.dataset.onResize = true.toString();
  window.addEventListener('mousemove', this.onMouseMove);
  window.addEventListener('mouseup', this.onMouseUp);
};



  componentDidRender(){
        this.rows = Array.from(this.table?.rows ?? [])

        this.columns = Array.from(this.table?.tHead?.rows[0].childNodes as NodeListOf<HTMLTableHeaderCellElement> ?? [])
                       .map(r => ({ref: r, size : this.formatSize(r.dataset)}));;

        this.columns.forEach(h => {
          h.ref.querySelector('.resize-handle').addEventListener('mousedown', this.initResize);
        });
  }

componentDidLoad(){
        this.setGridSize(this.columns);
}

  private formatSize = (columnData:DOMStringMap) => `minmax(${this.minSize}px, ${this.maxSize(columnData)})`


  private maxSize = (columnData:DOMStringMap) => {
      if('type' in columnData === false){
        return this.columnTypeToRatioMap.default;
      }

      const type = columnData.type;

      if(type in this.columnTypeToRatioMap === false){
          return this.columnTypeToRatioMap.default;
        }

      return this.columnTypeToRatioMap[type] + 'fr'
    };


  render() {
    return (
      <table ref={(el) => this.table = el as HTMLTableElement} style={{
          'grid-template-columns': `${this.gridTemplateColumns}`,

 }}>
         <slot>
           <tr></tr>
         </slot>
      </table>
    );
  }
}
