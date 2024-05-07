import * as ACTION from '../redux/Film';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import axios from "axios";
import { URL } from "../../constants/api";
import { Link } from 'react-router-dom';
import Header from './Header';

const Films = () => {
    const dispatch = useDispatch();
    const films = useSelector((state) => state.film.data);
    localStorage.setItem('listefilms', JSON.stringify(films));

    const listeFilm = JSON.parse(localStorage.getItem('listefilms'));

    useEffect(() => {
        axios.get(URL.RECUP_FILM)
        .then((response) => {
            dispatch(ACTION.FETCH_START());
            dispatch(ACTION.FETCH_SUCCESS(response.data));

        })
        .catch((error) => {
            console.log(error);
        });
    }, [dispatch]);
 
    return (
        <div>
        <Header />
        <h1>Votre catalogue de films !</h1>
        <table style={{ borderWidth:"1px"}}>
            <thead>
                <tr>
                    <th>Titre</th><th>Réalisateurs</th><th>Année de production</th><th>Nationalité</th><th>Durée</th><th>Genre</th><th>Synopsis</th>
                </tr>
            </thead>
            <tbody>
                {listeFilm ? listeFilm.map((item, index) => (
                    <tr key={index}>
                        <td>
                            <Link to={`/pagefilm/${item._id}`}>{item.titre}</Link>
                        </td>
                        <td>
                            {item.realisateurs}
                        </td>
                        <td>
                            {item.annee}
                        </td>
                        <td>
                            {item.nationalite}
                        </td>
                        <td>
                            {item.duree}
                        </td>
                        <td>
                            {item.genre}
                        </td>
                        <td>
                            {item.synopsis}
                        </td>
                    </tr>
                
                )) : null}
            </tbody>
        </table>
        </div>
    );
    };

export default Films