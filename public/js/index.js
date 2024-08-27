import { Histogram } from "./Histogram/index.js";
import { ContextMenu } from "./ContextMenu/index.js";

const API_URL = 'https://api.frankfurter.app';
const SCROLL_SENSITIVITY = 50;

const frame = document.getElementById("frame");
const frame_wrapper = document.getElementById("frame_wrapper");
const contextMenu = new ContextMenu(90, 50);
const histogram = new Histogram(56, 320, 28, contextMenu, frame);

const dataForm = document.getElementById('dataform');

function fetchData(data) {
    if(data.date_from != data.date_to && data.currency_from != data.currency_to) {
        fetch(`${API_URL}/${data.date_from}..${data.date_to}?from=${data.currency_from}&to=${data.currency_to}`)
        .then(resp => resp.json())
        .then((response) => {
            const values = [];
            Object.entries(response.rates).forEach(([key, property]) => {
                const [[unit, value]] = Object.entries(property);
                const obj = {
                    'value': value,
                    'title': key,
                    'unit': unit,
                }
                values.push(obj);
            });
            console.log(values);
            histogram.refreshColumns(values);
        });
    }
}

function fetchCurrencies() {
    fetch(`${API_URL}/currencies`)
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

fetchCurrencies();

dataForm.addEventListener('change', (e) => {
    const data = Object.fromEntries(new FormData(dataForm).entries());
    if(data.currency_from && data.currency_to && data.date_from && data.date_to) {
        fetchData(data);
    } 
});

window.addEventListener("wheel",(e) => {
    if (e.deltaY > 0) frame_wrapper.scrollLeft += SCROLL_SENSITIVITY;
    else frame_wrapper.scrollLeft -= SCROLL_SENSITIVITY;
});