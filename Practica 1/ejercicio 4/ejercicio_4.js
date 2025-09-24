// 4. Recibe un arreglo y devuelve el número mayor y menor en un objeto
function mayorYMenor(arr) {
    return {
        mayor: Math.max(...arr),
        menor: Math.min(...arr)
    };
}

/* Ejemplo */

console.log('Ejercicio 4:', mayorYMenor([3,1,5,4,2])); 
