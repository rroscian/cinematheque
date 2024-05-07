import { Outlet } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';
import { URL } from "../../constants/api";

if (localStorage.getItem("user") === null) {
    localStorage.setItem("isAuth", false);
}

const Main = () => {
    //créer une variable isAuth qui va prendre la valeur de isAuth dans le local storage elle doit avoir une valeur par défaut false
    const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
    const [user, setUser] = useState([]);
    const [searchMode, setSearchMode] = useState(localStorage.getItem("searchMode"));

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser(user => ({ ...user, [name]: value}));
    }

    const createAccount = async (event) => {
        event.preventDefault();
        const dataForm = {
            pseudo: user.pseudo,
            mail: user.mail,
            motdepasse: user.motdepasse,
            avatar: user.avatar
        }
        console.log(dataForm);
        try {
            // Envoie les données du formulaire vers l'URL spécifiée
            const  { data, status, response } = await axios.post(URL.USER_INSCRIPTION, dataForm);
            console.log(response);
    
            // Vérifie si la requête a réussi
            if (status === 201) {
                localStorage.setItem("isAuth", true);
                setIsAuth(localStorage.getItem("isAuth"));
                localStorage.setItem('user', JSON.stringify(dataForm));
            } else {
                // Si la requête échoue, affiche une erreur
                throw new Error('Requête erronnée');
            }
        } catch (error) {
            console.error(error);
            // Affiche une erreur en cas de problème lors de la connexion
            alert('Echec lors de l\'inscription');
        }

    }
    const loginAccount = async (event) => {
        event.preventDefault();
        const dataForm = {
            mail: user.mail,
            motdepasse: user.motdepasse
        }
        console.log(dataForm)
        try {
            // Envoie les données du formulaire vers l'URL spécifiée
            const  { data, status } = await axios.post(URL.USER_CONNEXION, dataForm);
            // Vérifie si la requête a réussi
            if (status === 200) {
                setUser(data);
                localStorage.setItem("isAuth", true);
                setIsAuth(localStorage.getItem("isAuth"));
                localStorage.setItem('user', JSON.stringify(data));
            } else {
                // Si la requête échoue, affiche une erreur
                throw new Error('Requête erronnée');
            }
        } catch (error) {
            console.error(error);
            // Affiche une erreur en cas de problème lors de la connexion
            alert('Echec lors de la connexion');
        }
    };

    const switchSSO = () => {
        localStorage.setItem("searchMode", !searchMode);
        setSearchMode(!searchMode);
    }

    return (
        <section>
        {isAuth == "true" ? <Outlet/> : 
        <div>
            {searchMode ?
                <div>
                    <form action="" method="get">
                        <h2>Connexion</h2><br/>
                        <br/>
                        <label name="mail">Mail </label><br />
                        <input type="email" name="mail" id="mail" onChange={handleChange} /><br/>
                        <br/>
                        <label name="motdepasse"> Mot de passe</label><br/>
                        <input type="password" name="motdepasse" id="motdepasse" onChange={handleChange} /><br/>
                        <br/>
                        <button onClick={loginAccount}>Se connecter</button>
                    </form>
                    <br/>
                    <p>Vous n'avez aucun compte ? Inscrivez-vous !</p>
                    <button onClick={switchSSO}>S'inscrire</button>
                </div>
            :
                <div>
                    <form action="" method="get">
                        <h2>Inscription</h2><br/>
                        <br/>
                        <label name="pseudo" >Pseudo </label><br/>
                        <input type="text" name="pseudo" id="pseudo" onChange={handleChange} /><br/>
                        <br/>
                        <label name="mail" >Email </label><br/>
                        <input type="email" name="mail" id="mail" onChange={handleChange}/><br/>
                        <br/>
                        <label name="motdepasse" >Mot de passe </label><br/>
                        <input type="password" name="motdepasse" id="motdepasse" onChange={handleChange}/><br/>
                        <br/>
                        <label name="avatar" >Avatar </label><br/>
                        <input type="text" name="avatar" id="avatar" onChange={handleChange}/><br/>
                        <br/>
                        <button onClick={createAccount}>Je m'inscris</button>
                    </form>
                    <br/>
                    <p>Déjà inscrit ? Connectez-vous !</p>
                    <button onClick={switchSSO}>Se connecter</button>
                </div>
            }
        </div>
        
        }
            
        </section>
    );
    };



export default Main;