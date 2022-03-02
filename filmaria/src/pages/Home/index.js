import { useEffect, useState } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import './home.css'

function Home() {


    const [filmes, setFilmes ] = useState([]);

    useEffect(()=>{
        async function loadFilmes(){
            const response  = await api.get('r-api/?api=filmes')
            setFilmes(response.data);
        }
        loadFilmes();

    },[])

    return (
    <div className="container">
          <div className="lista-filmes">
               {
                   filmes.map((elemento)=>{
                       return(
                           <article key={elemento.id}>
                               <strong>{elemento.nome}</strong>
                               <img src={elemento.foto}/>
                               <Link to={`/filme/${elemento.id}`}>Link</Link>
                           </article>
                       );
                   })
               } 
          </div>
      </div>
    );
  }
  
  export default Home;
  