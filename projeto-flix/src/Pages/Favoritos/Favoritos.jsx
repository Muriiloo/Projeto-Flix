import React from 'react'
import "./favoritos.css"
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

const Favoritos = () => {
    const [filmes, setFilmes] = useState([])

    useEffect(()=>{
        const minhaLista = localStorage.getItem("@filmes") // pegando os filmes salvos e armazenando na array
        const filmesSalvos = JSON.parse(minhaLista) || [];
        setFilmes(JSON.parse(minhaLista) || [] )

        const filmesUnicos = Array.from(new Set(filmesSalvos.map(filme => filme.id)))
            .map(id => filmesSalvos.find(filme => filme.id === id));

        setFilmes(filmesUnicos)


    },[])

    function excluirFilme(id) {
        let filtrarFilme = filmes.filter( (item) => {
            return (item.id !== id)
        })

        setFilmes(filtrarFilme)

        localStorage.setItem("@filmes", JSON.stringify(filtrarFilme))
        toast.success("Filme removido com sucesso!")
    }


  return (
    <div className='meus-filmes'>
        <h1>Meus Filmes</h1>

        {filmes.length === 0 && <span>Você não salvou nenhum filme :( </span>}

        <ul>
            {filmes.map((item)=>{
                return(
                    <li key={item.id}>
                        <span>{item.title}</span>
                        <div>
                            <Link to={`/filme/${item.id}`} >Ver detalhes</Link>
                            <button onClick={() => excluirFilme(item.id)}>Excluir</button>
                        </div>
                    </li>
                )
            })}
        </ul>
    </div>
  )
}

export default Favoritos