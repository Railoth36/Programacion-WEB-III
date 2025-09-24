// 2. Invierte el orden de las palabras en una frase
function invertirPalabras(frase) {
    let arrayCaracteres = frase.split('');
    let arrayInvertido = arrayCaracteres.reverse('');
    let fraseInvertida = arrayInvertido.join('');
    return fraseInvertida;

    //tambien se puede de la siguiente forma
    //return frase.split(' ').reverse().join(' ');
}

/* Ejemplo */

console.log('Ejercicio 2:', invertirPalabras('Hola'));
