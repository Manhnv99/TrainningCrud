import axios from "axios";


class StatusService{

    getAll= ()=>{
        return axios.get(`http://localhost:8080/status/listStatus`);
    }

    getStatusById=(id)=>{
        return axios.get(`http://localhost:8080/status/list/${id}`);
    }

}

export default new StatusService();