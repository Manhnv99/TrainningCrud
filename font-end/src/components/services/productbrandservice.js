import axios from "axios";

class Productbrandservice{
    getAll=()=>{
        return axios(`http://localhost:8080/productBrand/list`)
    }

    pageGetAll=(page)=>{
        return axios.get(`http://localhost:8080/productBrand/list/pages`,{
            params:{
                page
            }
        })
    }


    addProductBrand=(productBrand)=>{
        return axios.post(`http://localhost:8080/productBrand/add`,productBrand)
    }

    searchProductBrandByAll=(keyword,page)=>{
        // ở đây phaỉ đặt đúng value ten la keyword như ở bên kia đặt
        return axios.get(`http://localhost:8080/productBrand/search`,
            {
                params:{
                    keyword,page
                }
            })
    }


    deleteProductBrand=(productBrand)=>{
        return axios.delete(
            `http://localhost:8080/productBrand/remove`,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                data: productBrand,
            }
        );
    }

    updateProductBrand=(productBrandRequest)=>{
        return axios.put(`http://localhost:8080/productBrand/update`,productBrandRequest);
    }

    totalPage=()=>{
        return axios.get(`http://localhost:8080/productBrand/totalPage`);
    }




    findProductBrandByAll=(name,price,brandname,catename,statusname,page)=>{
        return axios.get(`http://localhost:8080/productBrand/find`,
            {
                params:{
                    name,price,brandname,catename,statusname,page
                }
            }
        );
    }


}

export default new Productbrandservice()