import React from "react";
import {Link} from "react-router-dom";
export default function SearchBar(props) {
    const [character, setCharacter] = React.useState("")

    const handleInput = (event)=>{
        setCharacter(event.target.value)
    }


   return (
      <div>
          {/* <Routes>
                    <Route path="/" element={<Home/>}/>
                </Routes>*/}
          <Link to="/Favorites">
              <button>Fav´s</button>
          </Link>
          <Link to="/About">
              <button>About</button>
          </Link>
          <Link to="/home">
              <button>Home</button>
          </Link>
            <input type='search' onChange={handleInput} />
            <button onClick={()=>{props.onSearch(character)}}>Agregar</button>
      </div>
   );
}
