import axios from 'axios';

const POSESION_BASE_RES_API_URL = "http://localhost:8080/api/Posesions"

class PosesionService {
    getAllPosesions() {
        return axios.get(POSESION_BASE_RES_API_URL);
    }

    getPosesionById(id) {
        return axios.get(`${POSESION_BASE_RES_API_URL}/${id}`);
    }

    getAllPosesionsOrdenados() {
        return axios.get(`${POSESION_BASE_RES_API_URL}/ordenados`);
    }

    getPosesionByNombre(nombre) {
        return axios.get(`${POSESION_BASE_RES_API_URL}/${nombre}`);
    }


    createPosesion(Posesion) {
        return axios.post(`${POSESION_BASE_RES_API_URL}`, Posesion, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
    /*

    updatePosesion(Posesion){
        return axios.put(`${POSESION_BASE_RES_API_URL}/actualizaPosesion`, Posesion, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    deletePosesion(id){
        return axios.delete(`${POSESION_BASE_RES_API_URL}/eliminaPosesion/${id}`);
    }
        */

}

export default new PosesionService();
