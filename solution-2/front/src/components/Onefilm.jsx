
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Header from './Header';

const Onefilm = () => {
    const { _id } = useParams()
    const listeFilms = JSON.parse(localStorage.getItem('listefilms'));
    const film = listeFilms.find((item) => item._id === _id);

    /**
     * Cette fonction met à jour une liste de films qu'un utilisateur aime, a vu ou voudrait voir dans la BDD
     * @param {type} - Le type de la liste à mettre à jour
     */
    const listManage = ( type ) => {
        const user = JSON.parse(localStorage.getItem('user'));
        const data = {
            _id: user._id,
            type: type,
            filmId: film._id
        };
        axios.post('http://localhost:3000/api/users/recupDonnees', data)
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    /**
     * Cette fonction récupère une liste de films et mélange celle-ci pour l'affichage des films
     * @return {JSON} - Liste mélangée
     */
    const melangeListe = (liste) => {
        for (let i = liste.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [liste[i], liste[j]] = [liste[j], liste[i]];
        }
        return liste
    }
    
    // Films similaires: gestion des films recommandés en fonction de leur genre
    const listeFilmsSimilaire = listeFilms.filter((item) => item.genre === film.genre && item._id !== film._id);
    const filmsSimilaire = melangeListe(listeFilmsSimilaire).slice(0,5);

    return (
        <main>
            <Header />
            <h1>{film.titre}</h1>
            {film.titreOriginal ? <p>Titre original : {titreOriginal} </p> : null}
            <p>Année de production : {film.annee}</p>
            <p>Synopsis : {film.synopsis}</p>
            <p>Durée: {film.duree} </p>
            <p>Réalisateur : {film.realisateurs}</p>
            
            {film.genre ? <p>genre: {film.genre} </p> : null}
            <div>
                <h2>Films similaires dans la catégorie "Film {film.genre}": </h2>
                {filmsSimilaire ? filmsSimilaire.map((item, index) => (
                    <p key={index}>
                        <Link to={`/pagefilm/${item._id}`}>{item.titre}</Link>
                    </p>
                )) : null}
            </div>
            <button onClick={() => {listManage("filmsAimes")}} >
                 J'aime
            </button>
            <button onClick={() => {listManage("filmsVus")}} >
                J'ai vu
            </button> 
            <button onClick={() => {listManage("filmsAVoir")}} >
                Je veux voir
            </button>
            <br />
            <br />
            <button onClick={() => {window.location.href = "/"}} >
                Retourner au menu
            </button>

        </main>
    )
    }

export default Onefilm