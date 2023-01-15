# HW 06: AsyncAwait | Integración

## **🕒 Duración estimada**

x minutos

<br />

---

## **💻 Rick & Morty App**

### **📝 INTRO**

En esta homework vamos a seguir trabajando en nuetra App de Rick & Morty del lado del servidor. En base a las rutas asincrónicas ya creadas, vamos a pasarlas de promesas a AsyncAwait.

Las rutas que tenemos creadas hasta el momento son:

- GET onSearch
- GET Detail
- GET favorites
- POST favorites
- DELETE favorites

<br />

---

## **📋 INSTRUCCIONES**

### **👩‍💻 EJERCICIO 1**

### **GET Search**

1. Dirígete a tu carpeta `controllers` y en el archivo llamado `getCharById.js`, en la función llamada _getCharById_ ya estás haciendo una petición (_código asincrónico_) a la URL `https://rickandmortyapi.com/api/character/`. Así que sólo debes cambiar de promesas a `async await`.

2. Para el manejo de errores, en el caso de que la promesa falle, envuelve el código dentro del bloque try-catch:

   - Dentro del bloque `try` inyecta el código donde haces el llamado y la lógica antes realizada.

   - Dentro del bloque `catch`, éste debe recibir como parámetro el `error` y devuelve una respuesta con status `500`y enviar un mensaje de error y/o con la propiedad **message** del error que recibe el catch como parámetro.

<br />

---

### **👩‍💻 EJERCICIO 2**

### **GET Detail**

Ahora modificaremos la ruta de detalle de promesas a async await.

1. Dirígete a tu carpeta `controllers`, en el archivo llamado `getCharDetail.js`, en la función llamada _getCharDetail_ implementa los mismos pasos del ejercicio anterior.

<br />

---

### **👩‍💻 EJERCICIO 3**

### **GET Favorites**

Ahora trabajaremos en la ruta de favoritos, en el método get creada en la **homework 05-Express** y la pasaremos de promesas a async await.

1. Dirígete a tu carpeta `controllers`, en el archivo llamado `getFavorites.js`, en la función llamada _getFavorites_ implementa los mismos pasos del ejercicio anterior.

<br />

---

### **👩‍💻 EJERCICIO 4**

### **POST Favorites**

Ahora trabajaremos en la ruta de favoritos, en el método post creada en la **homework 05-Express** y la pasaremos de promesas a async await.

1. Dirígete a tu carpeta `controllers`, en el archivo llamado `postFavorites.js`, en la función llamada _postFavorites_ implementa los mismos pasos del ejercicio anterior.

<br />

---

### **👩‍💻 EJERCICIO 5**

### **DELETE Favorites**

Ahora trabajaremos en la ruta de favoritos, en el método delete creada en la **homework 05-Express** y la pasaremos de promesas a async await.

1. Dirígete a tu carpeta `controllers`, en el archivo llamado `deleteFavorites.js`, en la función llamada _deleteFavorites_ implementa los mismos pasos del ejercicio anterior.

<br />

---

### **👀 COMPROBEMOS...**

Levanta el servidor con el comando:

```bash
    npm start
```

Una vez levantado, verifica lo siguiente:

</br >

### **FRONTEND**

### **ACTIONS**

Haremos un par de cambios en el lado frontend:

1. La action `addFavorites`, ahora debe ser una función asíncrona, promisificada con async/await, manejando errores con try/catch que envíe el personaje favorito al endpoint con el método POST **http://localhost:3001/rickandmorty/fav**.

2. La action `removeFavorites`, ahora debe ser una función asíncrona, promisificada con async/await, manejando errores con try/catch que elimine el personaje favorito con el método DELETE al endpoint **http://localhost:3001/rickandmorty/fav**.

3. Crea una action `getFavorites`, debe ser una función asíncrona, promisificada con async/await, manejando errores con try/catch que solicite el personaje favorito con el método GET al endpoint **http://localhost:3001/rickandmorty/fav**.

4. Levanta también tu aplicación en **http://localhost:3000** para ver tu aplicación Rick & Morty funcionando completamente.

---

</br >

## **🚨 A TENER EN CUENTA**

Si tu servidor no está levantado, o si los links no fueron bien escritos, tu aplicación no funcionará correctamente.

</br >

---

¡Felicitaciones! Ahora tienes una comunicación front-back completa!🥳🥳
