export function valida(input) {
    const tipoDeInput = input.dataset.tipo;
    if (validadores[tipoDeInput]) {
        validadores[tipoDeInput](input);
    }
    console.log(input.parentElement);
    if (input.validity.valid) {
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = "";

    }else{
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput, input);
    }

}

const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",
]

const mensajesDeError = {
    nombre: {
        valueMissing:"El campo nombre no puede estar vacio",
    },
    email:{
        valueMissing:"el campo correo no puede estar vacio",
        typeMismatch:"El correo no es valido",
    },
    password: {
        valueMissing:"el campo contraseña no puede estar vacio",
        patternMismatch:"Al menos 8 caracteres maximo 10 caracteres"
    },
    nacimiento:{
        valueMissing:"El campo fecha no puede estar vacio",
        customError:"Debes tener al menos 18 años de edad",
    },
    numero:{
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "El formato requerido es xxxxxxxxxx 10 numeros",
    },
    direccion: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "La dirección debe contener entre 10 a 40 caracteres"
    },
    ciudad: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "La ciudad debe contener entre 10 a 40 caracteres"
    },
    estado: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "El estado debe contener entre 10 a 40 caracteres"
    },
}

const validadores = {
    nacimiento: (input) => validarNacimiento(input), 
}

function mostrarMensajeDeError(tipoDeInput, input) {
    let mensaje = "";
    tipoDeErrores.forEach( error => {
        if (input.validity[error]) {
            console.log(tipoDeInput, error);
            console.log(input.validity[error]);
            mensaje = mensajesDeError[tipoDeInput][error];
        }
    })
    return mensaje;
}

function validarNacimiento(input) {
    const fechaCliente = new Date(input.value);
    let mensaje = "";
    if (!mayoDeEdad(fechaCliente)) {
       mensaje = "Debes tener al menos 18 años de edad"; 
    }

    input.setCustomValidity(mensaje);
}

function mayoDeEdad(fecha) {
    const fechaActual = new Date();
    const diferenciasFechas = new Date(
        fecha.getUTCFullYear() + 18, 
        fecha.getUTCMonth(), 
        fecha.getUTCDate());
    return diferenciasFechas <= fechaActual;
}