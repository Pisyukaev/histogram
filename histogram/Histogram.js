class Histogram {
    constructor(column_width, column_max_height, column_gap, frame) {
        this.column_width = column_width;
        this.column_max_height = column_max_height;
        this.column_gap = column_gap;
        this.frame = frame;
    }

    manageData(data) {
        const values = data.split(" ").filter(e => Number(e) || e == "0");
        const coof = Math.max(...values) / this.column_max_height;

        return {values, coof}
    }

    addColumns(data, values, coof) {
        if(data) {
            values.forEach((value, index) => {
                const elem = this.frame.children[index];
                const desiredHeight = value / coof;
                if(elem && !elem.classList.contains('deleted')) alterColumnProperties(elem, desiredHeight, index + 1, value);
                else {
                    const column = document.createElement('div');
                    column.className = `cursor-pointer hover:scale-[1.04] flex-none mr-7 w-0 h-0 min-h-[10px] bg-gradient-to-b from-[#43C7FF]
                    to-[#003E9B] rounded-2xl transition-all duration-500 shadow-[0px_0px_21.5px_0px_rgba(36,135,209,0.30)]`;
                    this.frame.appendChild(column);
                    requestAnimationFrame(() => {
                        alterColumnProperties(column, desiredHeight, index + 1, value);
                        column.style.width = this.column_width + "px";
                    });
                    column.onclick = handleContextMenu;
                }
            });
        }
    
        function alterColumnProperties(elem, height, id, value) {
            elem.style.height = height + "px";
            elem.id = id;
            elem.dataset.value = value;
        }
    }

    autoRemoveColmns(values) {
        for(let i = this.frame.children.length - 1; i >= values.length; i--) {
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
        this.frame.style.width = Math.abs(values.length * this.column_width + (values.length - 1) * this.column_gap) + "px";
    }
}