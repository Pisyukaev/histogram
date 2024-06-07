const frame = document.getElementById("frame");
document.querySelector("input").addEventListener("keyup", (e) => {
    refresh(e.target.value);
})

function refresh(data) {
    const values = data.split(" ");
    const coof = Math.max(...values) / 320
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
                column.style = "box-shadow: 0px 0px 21.5px 0px rgba(36, 135, 209, 0.30);";
                wrapper.appendChild(column);
                frame.appendChild(wrapper);
                setTimeout(() => {
                    column.style.height = desiredHeight + "px";
                    column.style.width = "56px";
                }, 1);   
            }

        });
        for(i = frame.children.length - 1; i >= values.length; i--) {
            frame.removeChild(frame.children[i]);
        }
    } else frame.innerHTML = "";
    frame.style.width = values.length * 56 + (values.length - 1) * 28 + "px";
}