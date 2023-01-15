import Card from "./Card";
import {connect, useDispatch} from "react-redux";
import {filterCards, orderCards} from "../redux/actions";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

export function Favorites({myFavorites}) {

   /* const navegar = useNavigate()
    useEffect(()=>navegar("/favorites"),[myFavorites])*/

    const dispatch = useDispatch();

    const handleOrder = (event)=>{
        dispatch(orderCards(event.target.value))
    }

    const handleFilter = (event)=>{
        dispatch(filterCards(event.target.value))
    }

    return (
        <div>
            <div>
                <select onChange={handleOrder}>
                    <option value="Ascendente" >Ascendente</option>
                    <option value="Descendente" >Descendente</option>
                </select>
                <select onChange={handleFilter}>
                    <option value="Male" >Male</option>
                    <option value="Female" >Female</option>
                    <option value="Genderless" >Genderless</option>
                    <option value="unknown" >unknown</option>
                </select>
            </div>
            <>
                {
                    myFavorites.map(({name, species, gender, image, id}, index) => {
                        return (
                            <Card
                                key={index}
                                name={name}
                                species={species}
                                gender={gender}
                                image={image}
                                //onClose={props.onClose}
                                id={id}
                            />)
                    })
                }
            </>
        </div>
    )
}

export function mapStateToProps(state) {
    return {
        myFavorites: state.myFavorites
    }
}

export default connect(mapStateToProps, null)(Favorites);