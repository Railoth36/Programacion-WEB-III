// 15. Convertir callback en promesa
function callbackAPromesa(funcConCallback) {
    return new Promise((resolve, reject) => {
        funcConCallback((error, resultado) => {
            if(error) reject(error);
            else resolve(resultado);
        });
    });
}

(async () => {
    console.log('Ejercicio 15: Convertir Callback a Promesa');
    // Ejemplo con función callback simple
    function funcionCallback(cb) {
        setTimeout(() => cb(null, '¡Callback convertido en promesa!'), 1000);
    }
    const prom = callbackAPromesa(funcionCallback);
    prom.then(console.log).catch(console.error);
})();