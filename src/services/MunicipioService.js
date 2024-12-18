import axios from 'axios';

const MUNICIPIO_BASE_RES_API_URL = "http://localhost:8080/api/municipios"

class MunicipioService {
    getAllMunicipios() {
        return axios.get(MUNICIPIO_BASE_RES_API_URL);
    }

    getMunicipioById(id) {
        return axios.get(`${MUNICIPIO_BASE_RES_API_URL}/${id}`);
    }

    getAllMunicipiosordenados() {
        return axios.get(`${MUNICIPIO_BASE_RES_API_URL}/ordenados`);
    }

    getMunicipioByNombre(nombre) {
        return axios.get(`${MUNICIPIO_BASE_RES_API_URL}/${nombre}`);
    }


    createMunicipio(municipio) {
        return axios.post(`${MUNICIPIO_BASE_RES_API_URL}`, municipio, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
    /*

    updateFutbolista(futbolista){
        return axios.put(`${MUNICIPIO_BASE_RES_API_URL}/actualizaFutbolista`, futbolista, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    deleteFutbolista(id){
        return axios.delete(`${MUNICIPIO_BASE_RES_API_URL}/eliminaFutbolista/${id}`);
    }
        */

}

export default new MunicipioService();
