import { alterElementProperties } from "../utils/index.js";

const COLUMN_CLASSNAME = `cursor-pointer hover:scale-[1.04] flex-none mr-7 w-0 h-0
min-h-[10px] bg-gradient-to-b from-[#43C7FF] to-[#003E9B] rounded-2xl transition-all
duration-500 shadow-[0px_0px_21.5px_0px_rgba(36,135,209,0.30)]`;

export class Histogram {
    constructor(column_width, column_max_height, column_gap, contextMenu, frame) {
        this.column_width = column_width;
        this.column_max_height = column_max_height;
        this.column_gap = column_gap;
        this.contextMenu = contextMenu;
        this.frame = frame;
    }

    manageData(data) {
        const values = data;
        const numbers = Object.values(values).map(value => Object.values(value)[0]);
        const coof = Math.max(...numbers) / this.column_max_height;

        return {values, coof}
    }

    addColumns(values, coof) {
        if(values) {
            values.forEach((data, index) => {
                const elem = this.frame.children[index];
                const desiredHeight = Number(data.value) / Number(coof);
                if(elem && !elem.classList.contains('deleted')){
                    alterElementProperties(elem, [
                        {'path': ['style', 'height'], 'value': `${desiredHeight}px`},
                        {'path': ['id'], 'value': index + 1},
                        {'path': ['dataset', 'value'], 'value': `${data.value} ${data.unit}`},
                        {'path': ['dataset', 'date'], 'value': data.title},
                    ]);
                } else {
                    const column = document.createElement('div');
                    column.className = COLUMN_CLASSNAME;
                    this.frame.appendChild(column);
                    requestAnimationFrame(() => {
                        alterElementProperties(column, [
                            {'path': ['style', 'height'], 'value': `${desiredHeight}px`},
                            {'path': ['style', 'width'], 'value': `${this.column_width}px`},
                            {'path': ['id'], 'value': index + 1},
                            {'path': ['dataset', 'value'], 'value': `${data.value} ${data.unit}`},
                            {'path': ['dataset', 'date'], 'value': data.title},
                        ]);
                    });
                    column.onclick = (e) => this.contextMenu.draw(e);
                }
            });
        }
    }

    removeColmns(values) {
        for(let i = this.frame.children.length - 1; i >= values; i--) {
            const column = this.frame.children[i];
            if(!column.classList.contains('deleted')){
                column.classList.add('deleted');
                column.addEventListener("transitionend", (e) => {
                    this.frame.removeChild(e.target);
                }, { once: true });
            }
        }
    
    }
    
    adjustWidth(values) {
        alterElementProperties(this.frame, [
            {'path': ['style', 'width'], 'value': `${Math.abs(values.length * this.column_width + (values.length - 1) * this.column_gap)}px`},
        ]);
    }

    refreshColumns(data) {
        const {values, coof} = this.manageData(data);
        this.removeColmns(values);
        this.addColumns(values, coof);
    }
}