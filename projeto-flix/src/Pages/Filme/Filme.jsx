import React from 'react'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../../services/api'
import './filme-info.css'
import { toast } from 'react-toastify'

const Filme = () => {

  const { id } = useParams()
  const navigate = useNavigate()
  const [ filme, setFilme ] = useState({})
  const [ loading, setLoading ] = useState(true)


  useEffect( ()=>{
    async function loadFilme(){

      await api.get(`/movie/${id}`, {
        params:{
          api_key: '2c544ce8694132442df07d9fbea83a22',
          language: 'pt-br'

        }
      })
      .then((r)=>{
        setFilme(r.data)
        setLoading(false)
      })
      .catch(()=>{
        console.log('Filme nao encontrado')
        navigate("/", { replace: true })
        return
      })

    }

    loadFilme();

    return () => {
      console.log('Componente foi desmontado')
    }

  },[navigate, id])

  function salvarFilme() {
    
    const minhaLista = localStorage.getItem("@filmes");
  
    
    let filmesSalvos = JSON.parse(minhaLista) || [];
  
    
    const hasFilme = filmesSalvos.some(filmeSalvo => filmeSalvo.id === filme.id);
  
    if (hasFilme) {
      toast.warn("Esse filme já está na sua lista!")
      return;
    }

    filmesSalvos.push(filme);
  
  
    localStorage.setItem("@filmes", JSON.stringify(filmesSalvos));
    toast.success("Filme salvo com sucesso!")
  }


  if(loading){
    return(
      <div className="filme-info">
      <h1>Carregando detalhes...</h1>
    </div>
    )
  }


  return (
    <div className='filme-info'>
      <h1>{filme.title}</h1>
      <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt="filme" />
      <h3>Sinopse</h3>
      <span>{filme.overview}</span>
      <strong>Avaliação: {filme.vote_average}/10</strong>

      <div className="area-buttons">
        <button onClick={salvarFilme}>Salvar</button>
        <button>
          <a target='blank' rel='external' href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>
            Trailer
          </a>
        </button>
      </div>

    </div>
  )
}

export default Filme