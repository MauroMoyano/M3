import {ADD_FAV, DELETE_FAV, FILTER, ORDER} from "./actions";

const initialState = {
    myFavorites: [],
    allCharacters: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_FAV:
            console.log("reducer - arreglo My favorite de estado global ->",state.myFavorites)
            return {
                myFavorites: [...state.myFavorites, action.payload],
                allCharacters: [...state.myFavorites, action.payload]
            }

        case DELETE_FAV:
            return {
                ...state,
                myFavorites: state.myFavorites.map((char) => char.id !== action.payload)
            }

        case FILTER:
            return {
                ...state,
                myFavorites: state.allCharacters.filter((char) => char.gender === action.payload)
            }

        case ORDER:
            return {...state,
                myFavorites: action.payload === "Ascendente" ?
                    [...state.allCharacters.sort((a,b) => a.id-b.id)]:
                    [...state.allCharacters.sort((a,b) => b.id-a.id)]}
           /* const aux = [...state.allCharacters];
            if(action.payload === "Ascendente"){
                aux.sort(function (a, b){
                    if(a.id > b.id) return 1;
                    if(a.id < b.id) return -1;
                    return 0;
                })
            }else if(action.payload === "Descendente"){
                    aux.sort(function (a, b){
                        if(a.name < b.name) return 1;
                        if(a.name > b.name) return -1;
                        return 0;
                    })
            }
            return {
                ...state,
                myFavorites: aux

            }*/

        default:
            return {...state}
    }
}
export default reducer;