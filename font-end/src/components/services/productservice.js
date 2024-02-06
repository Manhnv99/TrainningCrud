import axios from "axios";

class Productservice {

    addProduct=(product)=>{
        return axios.post(`http://localhost:8080/product/add`,product)
    }

    getAll=()=>{
        return axios.get(`http://localhost:8080/product/listProduct`);
    }

    removeProductById=(id)=>{
        return axios.delete(`http://localhost:8080/product/remove/${id}`);
    }

    updateProductById=(id,product)=>{
        return axios.put(`http://localhost:8080/product/updateProduct/${id}`,product);
    }

    getProductById=(id)=>{
        return axios.get(`http://localhost:8080/product/list/${id}`)
    }
}

export default new Productservice();