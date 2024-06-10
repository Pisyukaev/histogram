const frame = document.getElementById("frame");
document.getElementById("input").addEventListener("keyup", (e) => {
    refresh(e.target.value);
})

function refresh(data) {
    const values = data.split(" ").filter(e => Number(e));
    const coof = Math.max(...values) / 320;
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
                column.className = "w-0 h-0 mx-auto bg-gradient-to-b from-[#43C7FF] to-[#003E9B] rounded-2xl transition-all duration-500";
                column.style = "box-shadow: 0px 0px 21.5px 0px rgba(36, 135, 209, 0.30);"; // тут точно смысла нет переводить в css, все стили уникальны для элемента;
                wrapper.appendChild(column); // а bg-gradient-to-b from-[#43C7FF] to-[#003E9B] тут к слову как один класс посути
                frame.appendChild(wrapper); // p.s. Я все же считаю что таилвинд это не случай с реакт разработчиком.
                requestAnimationFrame(() => { // Я начинал с чистого css и если бы я его не знал, то и таилвиндом бы ничего не сделал; А таилвинд куда быстрее ванил css'a.
                    column.style.height = desiredHeight + "px";
                    column.style.width = "56px";
                })
            }
        });
    }

    for(i = frame.children.length - 1; i >= values.length; i--) {
        const locali = i;
        column = frame.children[locali].children[0];
        if(!column.classList.contains('deleted')){
            column.classList.add('deleted');
            setTimeout(() => {  // Везде искал, нашел как сделать изчезновение после окончания анимации только так;
                frame.removeChild(frame.children[locali]); // event transitionend/animationend не получилось юзать, т.к срабатывает на ненужных транзишинах
            }, 300)
        }
    }

    frame.style.width = Math.abs(values.length * 56 + (values.length - 1) * 28) + "px";
}