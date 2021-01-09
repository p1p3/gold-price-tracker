export class Resizer {
  constructor(private onNewSizes: (size: { size: string }[]) => void, private columns: { ref: HTMLTableHeaderCellElement; size: string }[] = [], private minSize = 150) {
    columns.forEach(({ ref }) => {
      const resizeHandle = document.createElement('span');
      resizeHandle.classList.add('resize-handle');
      resizeHandle.addEventListener('mousedown', ({ target }) => this.initColumnResize((target as HTMLElement).parentNode as HTMLHeadingElement));
      ref.appendChild(resizeHandle);
    });
  }

  private initColumnResize = (header: HTMLHeadingElement) => {
    header.dataset.onResize = true.toString();
    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('mouseup', this.onMouseUp);
  };

  private onMouseMove = (e: MouseEvent) =>
    requestAnimationFrame(() => {
      // Calculate the desired width
      const horizontalScrollOffset = document.documentElement.scrollLeft;

      // Update the column object with the new size value
      const column = this.columns.find(({ ref }) => ref.dataset.onResize === 'true');
      if (!column) {
        return;
      }

      const width = horizontalScrollOffset + e.clientX - column.ref.offsetLeft;

      column.size = Math.max(this.minSize, width) + 'px'; // Enforce our minimum

      // For the other headers which don't have a set width, fix it to their computed width
      this.columns.forEach(column => {
        if (column.size.startsWith('minmax')) {
          // isn't fixed yet (it would be a pixel value otherwise)
          column.size = `${column.ref.clientWidth}px`;
        }
      });

      this.onNewSizes(this.columns);
      // this.setGridSize();
    });

  private onMouseUp = () => {
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('mouseup', this.onMouseUp);
    const column = this.columns.find(({ ref }) => ref.dataset.onResize);
    delete column.ref.dataset.onResize;
  };
}
