import styled from "styled-components";
import {Link} from "react-router-dom";
import React from "react";
import {connect} from "react-redux";
import {addFav, deleteFav} from "../redux/actions";
import {useEffect} from "react";

const DivCardEstilo = styled.div`
  background: white;
  display: flex;
  justify-content: space-between;
  //align-items: center;
  width: 50%;
  border: solid black 3px;
  border-radius: 8px;

  img {
    border-radius: 10px;
    margin: 15px;
  }

  :hover {
    transition: 1s;
    background: rgba(255, 255, 255, 0.16);

    img {
      transition: 1s;
      border-radius: 250px;
      filter: drop-shadow(0 0 50px #298f06);
    }

    border: solid #0cb5d0;

    h2 {
      transition: 0.5s;
      font-family: "Get Schwifty", serif;
      color: #298f06;
    }
  }

  h2 {
    transition: 0.5s;
    font-family: Shlop, serif;
  }

  /*   @font-face{
       font-family: get_schwifty;
       src:url(../fonts/get_schwifty.ttf);
     }*/
`;
const ButtonX = styled.button`
  margin: 15px;
  border-radius: 5px;
  background-color: darkred;
  color: black;
  //height: 100%;
  max-height: 100%;
  transition: 0.5s;

  :hover {
    background-color: black;
    color: darkred;
    border-radius: 15px;
  }
`;
const TextStyled = styled.div`
  display: flex;
  flex-direction: column;
`;


function Card(props) {

    const [isFav, setIsFav] = React.useState(false);

    const handleFavorite = () => {
        if (isFav) {
            setIsFav(!isFav);
            props.deleteFav(props.id);
        } else {
            setIsFav(!isFav);
            props.addFav(props);
        }
    }
    useEffect(() => {
        for(let i = 0; i < props.favo.length; i++){
            props.favo[i].id === props.id && setIsFav(true)}
    }, [props.favo]);

    return (

        <DivCardEstilo>
            {
                isFav ? (<button onClick={handleFavorite}>❤</button>)
                    : (<button onClick={handleFavorite}>🤍</button>)
            }
            <ButtonX onClick={() => {
                props.onClose(props)
            }}>X</ButtonX>
            <TextStyled>
                <Link to={`/detail/${props.id}`}>
                    <h2 className="card-title">{props.name}</h2>
                </Link>
                <h2>{props.id}</h2>
                <h2>{props.species}</h2>
                <h2>{props.gender}</h2>
            </TextStyled>
            <img src={props.image} alt=""/>
        </DivCardEstilo>
    );
}

const mapStateToProps = (state) => {

    return {
        favo: state.myFavorites,
        mauro: 1
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addFav: (char) => {
            dispatch(addFav(char))
        },
        deleteFav: (id) => {
            dispatch(deleteFav(id))
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Card);