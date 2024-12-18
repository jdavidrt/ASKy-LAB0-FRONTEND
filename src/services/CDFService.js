import axios from 'axios';

const CDF_BASE_RES_API_URL = "http://localhost:8080/api/cdfs"

class CDFService {
    getAllCDFs() {
        return axios.get(CDF_BASE_RES_API_URL);
    }

    getCDFById(id) {
        return axios.get(`${CDF_BASE_RES_API_URL}/${id}`);
    }

    getAllCDFsordenados() {
        return axios.get(`${CDF_BASE_RES_API_URL}/ordenados`);
    }

    getCDFByNombre(nombre) {
        return axios.get(`${CDF_BASE_RES_API_URL}/${nombre}`);
    }


    createCDF(CDF) {
        return axios.post(`${CDF_BASE_RES_API_URL}`, CDF, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
    /*

    updateCDF(CDF){
        return axios.put(`${CDF_BASE_RES_API_URL}/actualizaCDF`, CDF, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    deleteCDF(id){
        return axios.delete(`${CDF_BASE_RES_API_URL}/eliminaCDF/${id}`);
    }
        */

}

export default new CDFService();
