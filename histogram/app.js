const frame = document.getElementById("frame");
const columnWidth = 56;
const columnMaxHeight = 320;
const columnGap = 28;
document.getElementById("input").addEventListener("input", (e) => {
    refresh(e.target.value);
})

function refresh(data) {
    const values = data.split(" ").filter(e => Number(e) || e == "0");
    console.log(values)
    const coof = Math.max(...values) / columnMaxHeight;
    if(data) {
        values.forEach((value, index) => {
            const elem = frame.children[index];
            const desiredHeight = value / coof;
            if(elem) {
                elem.children[0].style.height = desiredHeight + "px";
            } else {
                const column = document.createElement('div');
                const wrapper = document.createElement('div');
                wrapper.className = "flex flex-col justify-end"
                column.className = `w-0 h-0 min-h-[10px] mx-auto bg-gradient-to-b from-[#43C7FF]
                to-[#003E9B] rounded-2xl transition-all duration-500 shadow-[0px_0px_21.5px_0px_rgba(36,135,209,0.30)]`;
                wrapper.appendChild(column);
                frame.appendChild(wrapper);
                requestAnimationFrame(() => {
                    column.style.height = desiredHeight + "px";
                    column.style.width = columnWidth + "px";
                })
            }
        });
    }

    for(let i = frame.children.length - 1; i >= values.length; i--) {
        column = frame.children[i].children[0];
        if(!column.classList.contains('deleted')){
            column.classList.add('deleted');
            column.addEventListener("transitionend", (e) => {
                frame.removeChild(e.target.parentElement);
            }, { once: true });
        }
    }

    frame.style.width = Math.abs(values.length * columnWidth + (values.length - 1) * columnGap) + "px";
}