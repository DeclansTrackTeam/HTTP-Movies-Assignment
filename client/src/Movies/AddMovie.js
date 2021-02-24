import React, {useEffect, useState} from 'react'
import axios from "axios"
import { useHistory, useParams } from 'react-router-dom'

const initialMovie = {
    id: '',
    title: '',
    director: '',
    metascore: null,
    stars: [],
}
export default function AddMovie(props) {
    const {push} = useHistory()
    const [movieValue, setMovieValue] = useState(initialMovie)
    const {id} = useParams();


    const handleChange = e => {
        setMovieValue({
            ...movieValue,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e =>{
        e.preventDefault();
        axios
            .post(`http://localhost:5000/api/movies`, movieValue)
            .then( res => {
                props.getMovieList()
                setMovieValue(initialMovie)
                console.log(res.data)
                push(`/`)
            })
            .catch(err => {
                console.log(err)
            })
    }
    return (
        <div>
            <form onSubmit = {handleSubmit}>
               <input
                type="text"
                name="title"
                onChange={handleChange}
                placeholder="Title..."
                value={movieValue.title}/>

               <input
                type="text"
                name="director"
                onChange={handleChange}
                placeholder="Director..."
                value={movieValue.director}/>

                <input 
                 type="number"
                 name="metascore"
                 onChange={handleChange}
                 placeholder="metascore"
                 value={movieValue.metascore}/>
                 <button>Update Movie</button>
            </form>
        </div>
    )
}
