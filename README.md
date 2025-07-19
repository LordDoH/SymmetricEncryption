# Symmetric Encryption API

## Índice

Inicialización  
Posibilidades  
Uso de llaves simétricas  
Librerías utilizadas  
Instrucciones de uso

## Inicialización

Para inicializar la aplicación, ejecuta el comando npm start en la terminal.  
Esto iniciará el servidor en el puerto 3000.

## Posibilidades

Esta aplicación proporciona dos endpoints para cifrar y descifrar texto utilizando llaves simétricas:

### \_ /encrypt

Recibe un texto en el body en formato JSON y devuelve el texto cifrado en formato hexadecimal.

### \_ /decrypt

Recibe un texto en el body cifrado en formato hexadecimal y devuelve el texto descifrado en formato UTF-8.

## Uso de llaves simétricas

La aplicación utiliza llaves simétricas para cifrar y descifrar el texto.  
Una llave simétrica es una cadena de bytes que se utiliza tanto para cifrar como para descifrar el texto. En este caso, se genera una llave aleatoria de 256 bits y un vector de inicialización de 128 bits utilizando la librería crypto.

La llave y el vector de inicialización se almacenan en archivos binarios (key.bin y iv.bin) para su posterior uso.

## Librerías utilizadas

- **express**: Framework para crear aplicaciones web en Node.js.
- **crypto**: Librería para cifrar y descifrar datos en Node.js.
- **nodemon** (solo para desarrollo): Herramienta para reiniciar el servidor automáticamente cuando se realizan cambios en el código.

## Instrucciones de uso

Inicializa la aplicación ejecutando npm start.  
Utiliza un cliente HTTP (como curl o Postman) para enviar solicitudes a los endpoints /encrypt y /decrypt.  
Enviar un texto en formato JSON a /encrypt para cifrarlo.  
Enviar un texto cifrado en formato hexadecimal a /decrypt para descifrarlo.

## Ejemplos de solicitud

Enviar un texto a /encrypt  
`curl -X POST -H "Content-Type: application/json" -d '{"text": "Hola, mundo!"}' http://localhost:3000/encrypt\`

Enviar un texto cifrado a /decrypt  
`curl -X POST -H "Content-Type: application/json" -d '{"encrypted": "cifrado_en_hexadecimal"}' http://localhost:3000/decrypt\`

## Caso de uso llaves simétricas

Alice y Bob quieren comunicarse de manera segura mediante un canal de comunicación no seguro. Deciden utilizar cifrado simétrico con una llave compartida.

### Paso 1: Generación de la llave

Alice genera una llave simétrica aleatoria de 256 bits, que se denomina K.

### Paso 2: Compartir la llave

Alice y Bob necesitan compartir la llave K de manera segura. Para ello, utilizan un protocolo de intercambio de claves, como el protocolo de Diffie-Hellman.

### Protocolo de Diffie-Hellman:

Alice y Bob acuerdan un número primo grande p y un número entero g que es un generador de un grupo cíclico de orden p-1.
Alice elige un número secreto a y calcula A = g^a mod p.
Bob elige un número secreto b y calcula B = g^b mod p.
Alice envía A a Bob, y Bob envía B a Alice.
Alice calcula K = B^a mod p, y Bob calcula K = A^b mod p.

## Paso 3: Cifrado y descifrado

Ahora que Alice y Bob comparten la llave K, pueden cifrar y descifrar mensajes utilizando cifrado simétrico.

Alice quiere enviar un mensaje M a Bob. Cifra el mensaje con la llave K utilizando un algoritmo de cifrado simétrico, como AES.
El mensaje cifrado C se envía a Bob.
Bob descifra el mensaje C con la llave K utilizando el mismo algoritmo de cifrado simétrico.

## Ventajas y desventajas

### Ventajas

El cifrado simétrico es más rápido y eficiente que el cifrado asimétrico.
La llave compartida se puede utilizar para cifrar y descifrar mensajes de manera segura

### Desventajas:

La llave compartida debe ser generada y compartida de manera segura.
Si la llave compartida es comprometida, la seguridad de la comunicación se ve afectada.

En resumen, el cifrado simétrico con una llave compartida es una forma segura de comunicarse, siempre y cuando la llave se genere y se comparta de manera segura. El protocolo de Diffie-Hellman es un ejemplo de cómo se puede compartir una llave simétrica de manera segura.
