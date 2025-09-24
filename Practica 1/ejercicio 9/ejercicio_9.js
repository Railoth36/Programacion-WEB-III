// 9. Crear una promesa que devuelve un mensaje de éxito después de 3 segundos
function promesaExito3Segundos() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('¡Operación exitosa después de 3 segundos!');
        }, 3000);
    });
}

/* Ejemplo */

promesaExito3Segundos().then(msg => console.log('Ejercicio 9:', msg));

