import styled from "styled-components";
import React from "react";
import validation from "./validation";
import './Forms.modules.css'
const DivStyle = styled.div`
  background: grey;
  display: flex;
  flex-direction: column;
  height: 500px;
  width: 400px;
  
`;



export default function Forms(props) {

    const [userData, setUserData] = React.useState({ username: '', password: '' });

    const [errors, setErrors] = React.useState({username: "",password: "" });

    const handleInputChange  = (event)=>{
        setUserData({...userData, [event.target.name]: event.target.value})
        setErrors(validation({...userData, [event.target.name]: event.target.value}));
    }
    const handleSubmit =(event)=>{
        event.preventDefault();
        props.login(userData);
    }
    return <DivStyle>
        <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <br/>
        <input className={errors.username && "warning"} type="text" name="username" value={userData.username} onChange={handleInputChange }/>
        <p className="danger">{errors.username}</p>
            <br/>
        <label htmlFor="password">Password</label>
        <br/>
        <input className={errors.password && "warning"} type="password" name ="password" value={userData.password} onChange={handleInputChange } />
            <p className="danger">{errors.password}</p>
             <br/>
        <button type="submit">Login</button>
            </form>

    </DivStyle>
}