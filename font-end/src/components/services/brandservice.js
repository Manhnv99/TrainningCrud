import axios from "axios";


class BrandService{

    getAll= ()=>{
        return axios.get(`http://localhost:8080/brand/listBrand`);
    }

    getBrandById=(id)=>{
        return axios.get(`http://localhost:8080/brand/listBrand/${id}`)
    }

}

export default new BrandService();