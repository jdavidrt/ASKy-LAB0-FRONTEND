import axios from 'axios';

const MUNICIPIO_BASE_RES_API_URL = "https://crud-municipios-production.up.railway.app/api/municipios"

class MunicipioService {
    getAllMunicipios() {
        return axios.get(MUNICIPIO_BASE_RES_API_URL);
    }

    getMunicipioById(id) {
        return axios.get(`${MUNICIPIO_BASE_RES_API_URL}/${id}`);
    }

    createMunicipio(municipio) {
        return axios.post(`${MUNICIPIO_BASE_RES_API_URL}`, municipio, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    /*
    // Actualizar una Municipio existente
    updateMunicipio(id, municipio) {
        return axios.put(`${MUNICIPIO_BASE_RES_API_URL}/${id}`, municipio, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    deleteMunicipio(id){
        return axios.delete(`${MUNICIPIO_BASE_RES_API_URL}/${id}`);
    }
        */

}

export default new MunicipioService();
