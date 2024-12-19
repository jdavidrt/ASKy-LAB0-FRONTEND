import axios from 'axios';

const GOBERNANTE_BASE_RES_API_URL = "https://crud-municipios-production.up.railway.app/api/gobernadores"

class GobernanteService {
    getAllGobernantes() {
        return axios.get(GOBERNANTE_BASE_RES_API_URL);
    }

    getGobernanteById(id) {
        return axios.get(`${GOBERNANTE_BASE_RES_API_URL}/${id}`);
    }

    getAllGobernantesordenados() {
        return axios.get(`${GOBERNANTE_BASE_RES_API_URL}/ordenados`);
    }

    getGobernanteByNombre(nombre) {
        return axios.get(`${GOBERNANTE_BASE_RES_API_URL}/${nombre}`);
    }


    createGobernante(gobernante) {
        return axios.post(`${GOBERNANTE_BASE_RES_API_URL}`, gobernante, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
    /*

    updateGobernante(Gobernante){
        return axios.put(`${GOBERNANTE_BASE_RES_API_URL}/actualizaGobernante`, Gobernante, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    deleteGobernante(id){
        return axios.delete(`${GOBERNANTE_BASE_RES_API_URL}/eliminaGobernante/${id}`);
    }
        */

}

export default new GobernanteService();
