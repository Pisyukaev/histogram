import { alterElementProperties } from "../utils/index.js";

const menuClassname = (x, y) => {
    return `absolute top-[${y}px] left-[${x}px] bg-zinc-900 bg-opacity-40 border-[1px] overflow-hidden
        opacity-0 w-0 h-0 transition-all duration-[200ms] border-zinc-700 backdrop-blur-md rounded-xl py-3 px-5 shadow-lg`
}
const INFO_CLASSNAME = 'text-slate-300 whitespace-nowrap w-fit';

export class ContextMenu {
    constructor(height, offset) {
        this.height = height;
        this.offset = offset;
    }
    
    draw(e) {
        const menu = document.createElement('div');
        const info = document.createElement('h3');

        alterElementProperties(info, [
            {'path': ['innerText'], 'value': `#${e.target.id}\nValue: ${e.target.dataset.value}`},
            {'path': ['className'], 'value': INFO_CLASSNAME},
        ]);
        menu.className = menuClassname(e.pageX, e.pageY);
        menu.appendChild(info);
        document.body.appendChild(menu);
        requestAnimationFrame(() => {
            alterElementProperties(menu, [
                {'path': ['style', 'height'], 'value': `${this.height}px`},
                {'path': ['style', 'width'], 'value': `${info.getBoundingClientRect().width + this.offset}px`},
                {'path': ['style', 'opacity'], 'value': `1`},
            ]);
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
}