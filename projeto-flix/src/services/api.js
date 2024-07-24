import axios from "axios";


//URL da API movie/now_playing?api_key=2c544ce8694132442df07d9fbea83a22&language=pt-br
//Base da API https://api.themoviedb.org/3/


const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
})

export default api