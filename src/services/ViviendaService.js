import axios from 'axios';

const VIVIENDA_BASE_RES_API_URL = "http://localhost:8080/api/viviendas";

class ViviendaService {
    // Obtener todas las viviendas
    getAllViviendas() {
        return axios.get(VIVIENDA_BASE_RES_API_URL);
    }

    // Obtener una vivienda por su ID
    getViviendaById(id) {
        return axios.get(`${VIVIENDA_BASE_RES_API_URL}/${id}`);
    }

    // Crear una nueva vivienda
    createVivienda(vivienda) {
        return axios.post(VIVIENDA_BASE_RES_API_URL, vivienda, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    // Actualizar una vivienda existente
    updateVivienda(id, vivienda) {
        return axios.put(`${VIVIENDA_BASE_RES_API_URL}/${id}`, vivienda, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
   
    // Eliminar una vivienda por su ID
    deleteViviendaById(id) {
        return axios.delete(`${VIVIENDA_BASE_RES_API_URL}/${id}`);
    }
}

export default new ViviendaService();
