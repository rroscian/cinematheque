
import { useState, useEffect } from "react";
import { URL } from "../../constants/api";
import axios from "axios";
import { Link } from "react-router-dom";


const Header = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
    /* const [recherche, setRecherche] = useState();
    const [resultat, setResultat] = useState([]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setRecherche(recherche => ({ ...recherche, [name]: value}));
    }

    const recupFilms = (event) => {
        event.preventDefault();
        console.log(event);        
        axios.get(URL.RECHERCHE_FILM + "/" + recherche)
            .then((response) => {setResultat(response.data);})
            .catch((error) => {console.log(error);}
        );
    } */

    /**
     * Cette fonction déconnecte l'utilisateur de la cinémathèque
     */
    const deco = () => {
        localStorage.setItem("isAuth", false);
        setIsAuth(localStorage.getItem("isAuth"));

        localStorage.setItem("user", null);
        setUser(localStorage.getItem("user"));
        window.location.href = "/";
    }

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("user")));
    } , [localStorage.getItem("user")]);

    return (
        <>
            <header>
                <nav style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
                    <p>Cinémarchives</p>
                    {user ? 
                    <img src={user.avatar} alt={user.pseudo} style={{borderRadius:64,width:64,height:64}} /> : null
                    }
                    {isAuth == "true" ? <button onClick={deco}>Déconnexion</button> : null }
                </nav>
                {/* <form action="" method="get">
                    <label name="recherche">Vous cherchez un film ? Laissez-nous le trouver pour vous !</label><br/>
                    <input type="text" placeholder="rechercher un film" name="recherche" id="recherche" onChange={handleChange} />
                    <button onClick={recupFilms}>Rechercher</button>
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
                </div> */}
            </header>
        </>
    );
    }


export default Header;