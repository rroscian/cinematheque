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
                await localStorage.setItem('user', JSON.stringify(data));
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

    const deco = () => {
        localStorage.setItem("isAuth", false);
        setIsAuth(localStorage.getItem("isAuth"));

        localStorage.setItem("user", null);
        setUser(localStorage.getItem("user"));
    }

    return (
        <section>
        {isAuth == "true" ? <Outlet/> : 
        <div>
            <form action="" method="get">
                <h2>Connexion</h2>

                <label name="mail">Mail </label>
                <input type="email" name="mail" id="mail" onChange={handleChange} />

                <label name="motdepasse"> Mot de passe</label>
                <input type="password" name="motdepasse" id="motdepasse" onChange={handleChange} />

                <button onClick={loginAccount}>Se connecter</button>
            </form>

            <form action="" method="get">
                <h2>inscription</h2>
                <label name="pseudo" >Pseudo </label>
                <input type="text" name="pseudo" id="pseudo" onChange={handleChange} />

                <label name="mail" >Email </label>
                <input type="email" name="mail" id="mail" onChange={handleChange}/>

                <label name="motdepasse" >Mot de passe </label>
                <input type="password" name="motdepasse" id="motdepasse" onChange={handleChange}/>

                <label name="avatar" >Avatar </label>
                <input type="text" name="avatar" id="avatar" onChange={handleChange}/>

                <button onClick={createAccount}>Inscription</button>
            </form>
        </div>
        
        }
            {isAuth == "true" ? <button onClick={deco}>Déconnexion</button> : null }
            
        </section>
    );
    };



export default Main;