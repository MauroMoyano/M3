const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const regexNum = /[0-9]/;
export default function validation({username, password}){

    const errors = {
        username : "",
        password : ""
    };

    errors.username = (!username) ? "El nombre de Usuario no puede estar vacío" : errors.username;
    errors.username = (username.length > 35) ? "El nombre de usuario es demasiado largo" : errors.username;
    errors.username = regexEmail.test(username) ? errors.username : "Debe ser un correo electrónico";
    errors.password = (password.length > 5 && password.length < 11) ? errors.password : "La contraseña tiene que tener una longitud entre 6 y 10 caracteres.";
    errors.password = regexNum.test(password)?errors.password :"La contraseña tiene que tener al menos un número.";

    return errors;
}