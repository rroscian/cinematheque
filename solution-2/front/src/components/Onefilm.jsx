
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Header from './Header';

const Onefilm = () => {
    const { _id } = useParams()
    const listeFilms = JSON.parse(localStorage.getItem('listefilms'));
    const film = listeFilms.find((item) => item._id === _id);

    const listManage = ( type ) => {
        const user = JSON.parse(localStorage.getItem('user'));
        const data = {
            _id: user._id,
            type: type,
            movieId: film._id
        };
        axios.post('http://localhost:3000/api/users/infoUser', data)
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    // const imageManage = (infoFilm && infoFilm.poster_path) ? `https://image.tmdb.org/t/p/w500${infoFilm.poster_path}` : filmUnkown;
    
    //Films similaires
    const filmsSimilaire = listeFilms.filter((item) => item.genre === film.genre && item._id !== film._id).slice(0, 5);

    return (
        <main>
            <Header />
            <p>Titre : {film.titre}</p>
            {film.titreOriginal ? <p>Titre Original: {titreOriginal} </p> : null}
            <p>Année de production : {film.annee}</p>
            <p>Synopsis : {film.synopsis}</p>
            <p>Durée: {film.duree} </p>
            <p>realisateur : {film.realisateurs}</p>
            
            {film.genre ? <p>genre: {film.genre} </p> : null}
            <div>
                <h2>Films similaires : </h2>
                {filmsSimilaire ? filmsSimilaire.map((item, index) => (
                    <li key={index}>
                        <Link to={`/pagefilm/${item._id}`}>{item.titre}</Link>
                    </li>
                )) : null}
            </div>
            <button onClick={() => {listManage("like")}} >
                 J'aime
            </button>
            <button onClick={() => {listManage("watched")}} >
                J'ai vu
            </button>
            <button onClick={() => {listManage("watchlist")}} >
                Je veux voir
            </button>

        </main>
    )
    }

export default Onefilm