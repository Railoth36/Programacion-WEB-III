// 13. Anidamiento de promesas mejor con async/await
function promesa1() {
    return new Promise(resolve => setTimeout(() => resolve('resultado 1'), 1000));
}
function promesa2() {
    return new Promise(resolve => setTimeout(() => resolve('resultado 2'), 1000));
}

async function promesasConAsyncAwait() {
    const r1 = await promesa1();
    console.log(r1);
    const r2 = await promesa2();
    console.log(r2);
}

(async () => {
    console.log('Ejercicio 13: Async/Await con promesas');
    await promesasConAsyncAwait();
})();