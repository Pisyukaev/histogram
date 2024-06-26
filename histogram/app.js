const frame = document.getElementById("frame");
const COLUMN_WIDTH = 56;
const COLUMN_MAX_HEIGHT = 320;
const COLUMN_GAP = 28;
const CONTEXTMENU_HEIGHT = 90;
const PADDING_MENU_OFFSET = 50;

document.getElementById("input").addEventListener("input", (e) => {
    refresh(e.target.value);
})

function refresh(data) {
    const values = data.split(" ").filter(e => Number(e) || e == "0");
    const coof = Math.max(...values) / COLUMN_MAX_HEIGHT;

    for(let i = frame.children.length - 1; i >= values.length; i--) {
        const column = frame.children[i];
        if(!column.classList.contains('deleted')){
            column.classList.add('deleted');
            column.addEventListener("transitionend", (e) => {
                frame.removeChild(e.target);
            }, { once: true });
        }
    }

    if(data) {
        values.forEach((value, index) => {
            const elem = frame.children[index];
            const desiredHeight = value / coof;
            if(elem && !elem.classList.contains('deleted')) alterColumnProperties(elem, desiredHeight, index + 1, value);
            else {
                const column = document.createElement('div');
                column.className = `cursor-pointer hover:scale-[1.04] flex-none mr-7 w-0 h-0 min-h-[10px] bg-gradient-to-b from-[#43C7FF]
                to-[#003E9B] rounded-2xl transition-all duration-500 shadow-[0px_0px_21.5px_0px_rgba(36,135,209,0.30)]`;
                frame.appendChild(column);
                requestAnimationFrame(() => {
                    alterColumnProperties(column, desiredHeight, index + 1, value);
                    column.style.width = COLUMN_WIDTH + "px";
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

    frame.style.width = Math.abs(values.length * COLUMN_WIDTH + (values.length - 1) * COLUMN_GAP) + "px";
}

function handleContextMenu(e) {
    const menu = document.createElement('div');
    const info = document.createElement('h3');

    info.innerText = `#${e.target.id}\nValue: ${e.target.dataset.value}`;
    info.className = "text-slate-300 whitespace-nowrap w-fit";
    menu.className = `absolute top-[${e.pageY}px] left-[${e.pageX}px] bg-zinc-900 bg-opacity-40 border-[1px] overflow-hidden
    opacity-0 w-0 h-0 transition-all duration-[200ms] border-zinc-700 backdrop-blur-md rounded-xl py-3 px-5 shadow-lg`;
    menu.appendChild(info);
    document.body.appendChild(menu);
    requestAnimationFrame(() => {
        menu.style.height = CONTEXTMENU_HEIGHT + "px";
        menu.style.width = info.getBoundingClientRect().width + PADDING_MENU_OFFSET + "px";
        menu.style.opacity = "1";
    });

    function handleClickOutside(e) {
        if (!menu.contains(e.target)) {
            document.removeEventListener('click', handleClickOutside, true);
            menu.addEventListener("transitionend", (e) => {
                document.body.removeChild(e.target);
            }, { once: true });
            menu.classList.add('deleted');
        }
    }
    document.addEventListener('click', handleClickOutside, true);
}