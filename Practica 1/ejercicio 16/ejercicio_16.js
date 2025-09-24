// 16. Migrar función con promesas a async/await
function promesaExito3Segundos() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('¡Operación exitosa después de 3 segundos!');
        }, 3000);
    });
}

function funcionConPromesas() {
    return promesaExito3Segundos()
        .then(res => {
            console.log(res);
            return 'Finalizado';
        });
}

async function funcionConAsyncAwait() {
    const res = await promesaExito3Segundos();
    console.log(res);
    return 'Finalizado';
}

(async () => {
    console.log('Ejercicio 16: Migrar promesas a async/await');
    await funcionConAsyncAwait();
})();
