'use strict';
/*----------------------------------------------------------------
Promises Workshop: construye la libreria de ES6 promises, pledge.js
----------------------------------------------------------------*/

// // TU CÓDIGO AQUÍ:

function $Promise(executor) {
    if (typeof executor !== "function") throw TypeError("el parametro executor debe ser una function")
    this._state = "pending";
    this._handlerGroups = []


    executor(this._internalResolve.bind(this), this._internalReject.bind(this))

}

$Promise.prototype._internalResolve = function (data) {
    if (this._state === 'pending') {
        this._state = 'fulfilled';
        this._value = data;
        this._callHandlers();
    }
};

$Promise.prototype._internalReject = function (error) {
    if (this._state === 'pending') {
        this._state = 'rejected';
        this._value = error;
        this._callHandlers();
    }
};

$Promise.prototype.catch = function (errorCb) {
    return this.then(null, errorCb)
}


$Promise.prototype._callHandlers = function () {

    while (this._handlerGroups.length) {
        const hd = this._handlerGroups.shift()
        if (this._state === "fulfilled") {
            if (hd.successCb) {
                try {
                    const result = hd.successCb(this._value)
                    if (result instanceof $Promise) {
                        //Handler resuelve promesa a este punto
                        return result.then(
                            data => hd.downstreamPromise._internalResolve(data),
                            error => hd.downstreamPromise._internalReject(error)
                        )
                    } else {
                        //handler se resuelve a value:
                        //Resuelva a la nueva promesa
                        hd.downstreamPromise._internalResolve(result)
                    }
                } catch (error) {
                    //Si existe error enta al catch:
                    hd.downstreamPromise._internalResolve(error)
                }
            }else{
                hd.downstreamPromise._internalResolve(this._value)
            }
        } else if (this._state === "rejected") {
            if (hd.errorCb) {
                try {

                } catch (error){

                }
                hd.errorCb(this._value)
            }
        }
    }

}

$Promise.prototype.then = function (successCb, errorCb) {
    if (typeof successCb !== 'function') successCb = false;
    if (typeof errorCb !== 'function') errorCb = false;
    const downstreamPromise = new $Promise(() => {
    });
    this._handlerGroups.push({successCb, errorCb, downstreamPromise});
    this._state !== "pending" && this._callHandlers();

    return downstreamPromise
};

module.exports = $Promise;
/*-------------------------------------------------------
El spec fue diseñado para funcionar con Test'Em, por lo tanto no necesitamos
realmente usar module.exports. Pero aquí está para referencia:

module.exports = $Promise;

Entonces en proyectos Node podemos esribir cosas como estas:

var Promise = require('pledge');
…
var promise = new Promise(function (resolve, reject) { … });
--------------------------------------------------------*/
