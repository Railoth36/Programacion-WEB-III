// 7. Almacenar el resto de los elementos de un arreglo sin contar los dos primeros, usando desestructuración
function restoArreglo(arr) {
    const [, , ...resto] = arr;
    return resto;
}

/* Ejemplo */

console.log('Ejercicio 7:', restoArreglo([1,2,3,4,5])); // [3,4,5]

