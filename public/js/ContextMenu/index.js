export class ContextMenu {
    constructor(contextmenu_height, padding_menu_offset) {
        this.contextmenu_height = contextmenu_height;
        this.padding_menu_offset = padding_menu_offset;
    }
    
    draw(e) {
        const menu = document.createElement('div');
        const info = document.createElement('h3');
    
        info.innerText = `#${e.target.id}\nValue: ${e.target.dataset.value}`;
        info.className = "text-slate-300 whitespace-nowrap w-fit";
        menu.className = `absolute top-[${e.pageY}px] left-[${e.pageX}px] bg-zinc-900 bg-opacity-40 border-[1px] overflow-hidden
        opacity-0 w-0 h-0 transition-all duration-[200ms] border-zinc-700 backdrop-blur-md rounded-xl py-3 px-5 shadow-lg`;
        menu.appendChild(info);
        document.body.appendChild(menu);
        requestAnimationFrame(() => {
            menu.style.height = this.contextmenu_height + "px";
            menu.style.width = info.getBoundingClientRect().width + this.padding_menu_offset + "px";
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
}