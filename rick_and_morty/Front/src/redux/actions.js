export const ADD_FAV = "ADD_FAV"
export const DELETE_FAV = "DELETE_FAV"
export const FILTER = "FILTER"
export const ORDER = "ORDER"

export const addFav = (character) => {
    return{type: ADD_FAV, payload: character}
}

export const deleteFav = (id) => {
    return{type: DELETE_FAV, payload: id}
}

export const filterCards = (status) =>{
    return {type: FILTER, payload: status}
}

export const orderCards = (id) =>{
    return {type: ORDER, payload: id}
}