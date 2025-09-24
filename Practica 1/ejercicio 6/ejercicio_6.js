// 6. Toma los dos primeros elementos de un arreglo usando desestructuración
function tomarDosPrimeros(arr) {
    const [primero, segundo] = arr;
    return { primero, segundo };
}

/* Ejemplo */

console.log('Ejercicio 6:', tomarDosPrimeros([10, 30, 20, 40])); 