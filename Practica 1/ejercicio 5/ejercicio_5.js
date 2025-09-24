// 5. Determina si una cadena es palíndromo
function esPalindromo(cadena) {
    const limpio = cadena.toLowerCase().replace(/[\W_]/g, '');
    const alReves = limpio.split('').reverse().join('');
    return limpio === alReves;
}

/* Ejemplo */

console.log('Ejercicio 5:', esPalindromo('oruro')); 
console.log('Ejercicio 5:', esPalindromo('hola')); 
