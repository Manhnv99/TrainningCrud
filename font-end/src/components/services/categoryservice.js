import axios from "axios";


class Categoryservice{

    getAll= ()=>{
        return axios.get(`http://localhost:8080/subcate/listSubCate`);
    }

    getSubCateById=(id)=>{
        return axios.get(`http://localhost:8080/subcate/list/${id}`)
    }

}

export default new Categoryservice();