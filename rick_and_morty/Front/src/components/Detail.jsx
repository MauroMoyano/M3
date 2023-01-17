import {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import styled from "styled-components";

const H2 = styled.div`
    color:white;
    font-size: 30px;
`;


export default function Detail() {
    const {detailId} = useParams();
    const [character, setCharacter] = useState({});

    useEffect(() => {
        fetch(`http://localhost:3001/rickandmorty/detail/${detailId}`)
            .then((response) => response.json())
            .then((char) => {
                console.log("char useEfecct detail :" + char.name)
                if (char.name) {
                    setCharacter(char);
                } else {
                    window.alert("No hay personajes con ese ID");
                }
            })
            .catch((err) => {
                window.alert("No hay personajes con ese ID");
            });
        return setCharacter({});
    }, [detailId]);

    console.log("character :" + character.name, character.status)
    return (<div>
        <H2>Nombre: {character.name}</H2>
        <H2>Estado: {character.status}</H2>
        <H2>Especie: {character.species}</H2>
        {/*<H2>Especie: {character.origin}</H2>*/}
        <H2>Genero: {character.gender==="Male" && "Hombre"}</H2>
        <img src={character.image}/>
    </div>);
}