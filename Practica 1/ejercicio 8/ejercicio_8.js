// 8. Ejecutar una función callback después de 2 segundos
function ejecutarCallbackDespues2Segundos(callback) {
    setTimeout(callback, 2000);
}

/* Ejemplo */

ejecutarCallbackDespues2Segundos(() => console.log('Ejercicio 8: callback ejecutado después de 2 segundos'));

