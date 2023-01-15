import styled from "styled-components";
import SearchBar from "./SearchBar";
import React from "react"

/*const DivNav = styled.div`
  display: flex;
  justify-content: center;
`;*/
const Navbar = styled.div`
  display: flex;
  justify-content: end;
  border: solid rgba(5, 77, 208, 0.47);
  background: #4ec9b0;
  width: 90%;
  height: 40px;
`;
export default function Nav(props) {
    return (
            <Navbar>
                <SearchBar onSearch={props.onSearch}/>
            </Navbar>
    );
}