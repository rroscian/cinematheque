
import { useState, useEffect } from "react";
import { URL } from "../../constants/api";
import axios from "axios";
import { Link } from "react-router-dom";


const Header = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const [recherche, setRecherche] = useState("");
    const [resultat, setResultat] = useState([]);

    const recupFilms = (event) => {
        event.preventDefault();
        axios.get(URL.RECHERCHE_FILM + "/" + recherche).then((response) => {
            setResultat(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("user")));
    } , [localStorage.getItem("user")]);

    return (
        <>
            <header>
                <nav style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
                    <p>Cinémarchives</p>
                    <button>
                        {user ? 
                        <img src={user.avatar} alt={user.pseudo} style={{borderRadius:50,width:40}} /> : <p>{user.pseudo}</p>
                        }
                    </button>
                </nav>
                <h1>Votre catalogue de films !</h1>
                <p>Vous cherchez un film ? Laissez-nous le trouver pour vous !</p>
                <form onSubmit={recupFilms} >
                    <input type="text" placeholder="rechercher un film" name="recherche" id="recherche" onChange={(event) => setRecherche(event.target.value)} />
                    <input type="submit" value="rechercher" name="submit" id="submit"/>
                </form>
                <br/>
                <div>
                <ul>
                {resultat ? resultat.map((item, index) => (
                    <li key={index}>
                            <Link to={`/pagefilm/${item._id}`}>{item.titre}</Link>
                    </li>
                
                
            )) : null}
                </ul>
                    </div>
            </header>
        </>
    );
    }


export default Header;