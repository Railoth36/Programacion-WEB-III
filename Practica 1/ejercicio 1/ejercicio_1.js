// 1. Cuenta cuántas veces aparece cada vocal en un texto y devuelve un objeto
function contarVocales(texto) {
    const vocales = { a: 0, e: 0, i: 0, o: 0, u: 0 };
    texto.toLowerCase().split('').forEach(char => {
        if (vocales.hasOwnProperty(char)) {
            vocales[char]++;
        }
    });
    return vocales;
}

/* Ejemplo */

console.log('Ejercicio 1:', contarVocales('euforia')); 

