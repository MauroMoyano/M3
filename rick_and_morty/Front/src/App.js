import './App.css'
import React from "react";
import Cards from './components/Cards.jsx'
import {Routes, useLocation, useNavigate} from "react-router-dom";
import {Route} from "react-router-dom";
import About from "./components/About";
import Detail from "./components/Detail";
import styled from "styled-components";
import Forms from "./components/Forms";
import Nav from "./components/Nav";
import Favorites from "./components/Favorites";


const DivBody = styled.div``;

const DivNav = styled.div`

`;
function App() {
    const username = "yogu_a77aque@hotmail.com", password = "112233";
    const [access, setAccess] = React.useState(false);

    const [characters, setCharacters] = React.useState([]);
    const navigate = useNavigate();

    React.useEffect(() => {
        !access && navigate('/');
    }, [access]);

    const login = (userData)=>{
        if(userData.username === username && userData.password === password){
            setAccess(true);
            navigate("/home");
        }
    }

async function onSearch(characters) {
     // console.log(characters)
     await fetch(`http://localhost:3000/rickandmorty/onsearch/${characters}`)
         .then((response) => response.json())
         .then((data) => {
             console.log("data de app", data)
             if (data.name) {
                 setCharacters((oldChars) => [...oldChars, data]);
             } else {
                 window.alert(`No hay personajes con ese ID`);
             }
         });
 }

    const onClose = (pj) => {
        setCharacters(characters.filter((obj) => obj.name !== pj.name));
        console.log("paso")
    }

    const location = useLocation()
        return (<>
                {
                    location.pathname !== "/" &&
                <DivBody className='App' style={{padding: '25px'}}>
                    <DivNav>
                        <Nav onSearch={onSearch}/>
                    </DivNav>
                    <hr/>
                </DivBody>
                }
                <Routes>
                    <Route path="/" element={<Forms login={login}/>}/>
                    <Route path="/about" element={<About/>}/>
                    <Route path="/favorites" element={<Favorites />}/>
                    <Route exact path="/home" element={<Cards characters={characters} onClose={onClose}/>}/>
                    <Route path="/detail/:detailId" element={<Detail/>}/>
                </Routes>
            </>
        )
    }

    export default App
