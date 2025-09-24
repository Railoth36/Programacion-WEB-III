// 11. Ejemplo de encadenamiento de promesas
function encadenarPromesas() {
    return new Promise((resolve) => {
        setTimeout(() => resolve(5), 1000);
    })
    .then(result => {
        console.log('Primer resultado:', result);
        return result * 2;
    })
    .then(result2 => {
        console.log('Segundo resultado:', result2);
        return result2 + 3;
    });
}

encadenarPromesas().then(final => console.log('Ejercicio 11: Resultado final', final));
