import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";

function Nav({active,changeLibraryActive}){

    return(
        <header>
            <nav>
                <h1>Waves
                </h1>
                <button onClick={()=>{
                   // console.log(active);
                    changeLibraryActive()
                }}>
                    Library
                    <FontAwesomeIcon icon={faMusic} />
                </button>
            </nav>
        </header>
    )
}

export default Nav;