// 3. Recibe un arreglo de números y devuelve un objeto con los pares e impares
function paresEImpares(arr) {
    const resultado = { pares: [], impares: [] };
    arr.forEach(num => {
        if (num % 2 === 0) {
            resultado.pares.push(num);
        } else {
            resultado.impares.push(num);
        }
    });
    return resultado;
}

/* Ejemplo */

console.log('Ejercicio 3:', paresEImpares([1,2,3,4,5])); 

