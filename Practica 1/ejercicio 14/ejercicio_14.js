// 14. Convertir promesa en callback

function promesaExito3Segundos() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('¡Operación exitosa después de 3 segundos!');
        }, 3000);
    });
}

function promesaACallback(callback) {
    promesaExito3Segundos()
        .then(mensaje => callback(null, mensaje))
        .catch(error => callback(error));
}

promesaACallback((error, mensaje) => {
    if (error) {
        console.error('Error:', error);
    } else {
        console.log('Mensaje:', mensaje);
    }
});

