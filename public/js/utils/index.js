export function alterElementProperties(elem, data) {
    data.forEach((property) => {
        setNestedProp(elem, property.path, property.value)
    });

    function setNestedProp(obj = {}, keys, val) {
        const last = keys.pop()
        keys.reduce((o, k) => o[k] ??= {}, obj)[last] = val
    }
}