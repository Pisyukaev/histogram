import { Histogram } from "./Histogram/index.js";
import { ContextMenu } from "./ContextMenu/index.js";

const frame = document.getElementById("frame");
const frame_wrapper = document.getElementById("frame_wrapper");
const contextMenu = new ContextMenu(90, 50);
const histogram = new Histogram(56, 320, 28, contextMenu, frame);

// document.getElementById("input").addEventListener("input", (e) => {
//     histogram.refreshColumns(e.target.value);
// })

const dataForm = document.getElementById('dataform');

fetchCurrencies();

dataForm.addEventListener('change', (e) => {
    const data = Object.fromEntries(new FormData(dataForm).entries());
    if(data.currency_from && data.currency_to && data.date_from && data.date_to) fetchData(data);
});

window.addEventListener("wheel",(e) => {
    if (e.deltaY > 0) frame_wrapper.scrollLeft += 50;
    else frame_wrapper.scrollLeft -= 50;
});

function fetchData(data) {
    fetch(`https://api.frankfurter.app/${data.date_from}..${data.date_to}?from=${data.currency_from}&to=${data.currency_to}`)
    .then(resp => resp.json())
    .then((response) => {
        histogram.refreshColumns(response.rates);
    });
}

function fetchCurrencies() {
    fetch('https://api.frankfurter.app/currencies')
    .then(resp => resp.json())
    .then((data) => {
        const currencies = Object.keys(data);
        const currency_from = document.getElementById("currency_from");
        const currency_to = document.getElementById("currency_to");

        currencies.forEach((currency) => {
            const currency_option = document.createElement('option');
            currency_option.innerText = currency;

            currency_from.appendChild(currency_option);
            currency_to.appendChild(currency_option.cloneNode(true));
        });
    });
}