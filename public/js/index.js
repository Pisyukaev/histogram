import { Histogram } from "./Histogram/index.js";
import { ContextMenu } from "./ContextMenu/index.js";

const frame = document.getElementById("frame");
const contextMenu = new ContextMenu(90, 50);
const histogram = new Histogram(56, 320, 28, contextMenu, frame);

document.getElementById("input").addEventListener("input", (e) => {
    histogram.refreshColumns(e.target.value);
})