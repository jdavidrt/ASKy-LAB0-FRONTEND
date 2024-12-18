import axios from 'axios';

const PERSONA_BASE_RES_API_URL = "http://localhost:8080/api/personas";

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

    // Eliminar una persona por su ID
    deletePersonaById(id) {
        return axios.delete(`${PERSONA_BASE_RES_API_URL}/${id}`);
    }
}

export default new PersonaService();
