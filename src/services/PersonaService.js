import axios from 'axios';

const PERSONA_BASE_RES_API_URL = "https://crud-municipios-production.up.railway.app/api/personas";

class PersonaService {
    // Obtener todas las personas
    getAllPersonas() {
        return axios.get(PERSONA_BASE_RES_API_URL);
    }

    // Obtener una persona por su ID
    getPersonaById(id) {
        return axios.get(`${PERSONA_BASE_RES_API_URL}/${id}`);
    }


    // Crear una nueva persona
    createPersona(persona) {
        return axios.post(PERSONA_BASE_RES_API_URL, persona, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }


    // Actualizar una Persona existente
    updatePersona(id, persona) {
        return axios.put(`${PERSONA_BASE_RES_API_URL}/${id}`, persona, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }


    // Eliminar una persona por su ID
    deletePersonaById(id) {
        return axios.delete(`${PERSONA_BASE_RES_API_URL}/${id}`);
    }
}

export default new PersonaService();
