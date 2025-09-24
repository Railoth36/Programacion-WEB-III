// 12. Ejemplo donde anidamiento de callbacks se mejora con async/await
function ejemploCallbacks(callback) {
    setTimeout(() => {
        console.log('Primera llamada callback');
        setTimeout(() => {
            console.log('Segunda llamada callback');
            callback();
        }, 1000);
    }, 1000);
}

async function ejemploAsyncAwait() {
    await new Promise(resolve => setTimeout(() => {
        console.log('Primera llamada async/await');
        resolve();
    }, 1000));
    await new Promise(resolve => setTimeout(() => {
        console.log('Segunda llamada async/await');
        resolve();
    }, 1000));
}

console.log('Ejercicio 12: Ejemplo Callback Anidado');
ejemploCallbacks(() => console.log('Callback finalizado'));

(async () => {
    console.log('Ejercicio 12: Ejemplo Async/Await Mejorado');
    await ejemploAsyncAwait();
})();
