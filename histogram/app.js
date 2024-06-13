const frame = document.getElementById("frame");
const COLUMN_WIDTH = 56;
const COLUMN_MAX_HEIGHT = 320;
const COLUMN_GAP = 28;
document.getElementById("input").addEventListener("input", (e) => {
    refresh(e.target.value);
})

function refresh(data) {
    const values = data.split(" ").filter(e => Number(e) || e == "0");
    const coof = Math.max(...values) / COLUMN_MAX_HEIGHT;

    for(let i = frame.children.length - 1; i >= values.length; i--) {
        column = frame.children[i].children[0];
        if(!column.classList.contains('deleted')){
            column.classList.add('deleted');
            column.addEventListener("transitionend", (e) => {
                frame.removeChild(e.target.parentElement);
            }, { once: true });
        }
    }

    if(data) {
        values.forEach((value, index) => {
            const elem = frame.children[index];
            const desiredHeight = value / coof;
            if(elem && !elem?.children[0].classList.contains('deleted')) {
                elem.children[0].style.height = desiredHeight + "px";
            } else {
                const column = document.createElement('div');
                const wrapper = document.createElement('div');
                wrapper.className = "flex flex-col justify-end";
                column.className = `mr-7 w-0 h-0 min-h-[10px] bg-gradient-to-b from-[#43C7FF]
                to-[#003E9B] rounded-2xl transition-all duration-500 shadow-[0px_0px_21.5px_0px_rgba(36,135,209,0.30)]`;
                wrapper.appendChild(column);
                frame.appendChild(wrapper);
                requestAnimationFrame(() => {
                    column.style.height = desiredHeight + "px";
                    column.style.width = COLUMN_WIDTH + "px";
                })
            }
        });
    }

    frame.style.width = Math.abs(values.length * COLUMN_WIDTH + (values.length - 1) * COLUMN_GAP) + "px";
}