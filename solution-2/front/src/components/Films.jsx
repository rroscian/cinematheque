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

        <ul>
            {listeFilm ? listeFilm.map((item, index) => (
                <li key={index}>
                    <Link to={`/pagefilm/${item._id}`}>{item.titre}</Link>
                </li>
            
            
           )) : null}
        </ul>
        </div>
    );
    };

export default Films