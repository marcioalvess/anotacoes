import axios from 'axios';


const api = axios.create({
    baseURL: 'http://localhost:3333'
    //endereço onde a api vai buscar as informações
});

export default api;