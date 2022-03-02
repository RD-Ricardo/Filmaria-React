import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import './filme-info.css';
import api from '../../services/api'
import { toast } from "react-toastify";

function Filme(){

    const { id } = useParams();
    const history = useHistory();
    const [filme, setFilme] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        async function getById(){
            const response = await api.get(`r-api/?api=filmes/${id}`);

            if(response.data.length === 0){
                history.replace("/");
                return;
            }

            setFilme(response.data);
            setLoading(false);
        }
        getById();

        return ()=>{
            console.log('Componete desmontado');
        }


    },[id, history])

    function salvaFilme(){
        const minhaLista = localStorage.getItem('filmes');
        let filmesSalvos  = JSON.parse(minhaLista) || [];

        const hasFilme = filmesSalvos.some((filmeSalvo)=> filmeSalvo.id === filme.id);

        if(hasFilme){
            toast.info('Voce já possu esse filme salvo.')
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem('filmes', JSON.stringify(filmesSalvos));
        toast.success('Filme salvo com sucesso!');
    }

    if(loading){
        return(
            <div>
                <h1>Carregando........</h1>
            </div>
        )
    }

    return(
        <div className="filme-info">
            <h1>{filme.nome}</h1>
            <img src={filme.foto} />
            <h2>Sinopse</h2>
            {filme.sinopse}

            <div>
                <button onClick={salvaFilme}>Salvar</button>
                <button>
                    <a target="blank" href={`https://youtube.com/results?search_query=${filme.nome} Trailer`}>
                        Trailer
                    </a>
                </button>
            </div>
        </div>
    );
}

export default Filme;