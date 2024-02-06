import '../scss/addproduct.scss'
import {useState, useContext, useEffect, useRef} from "react";
import {Context} from "../provider/contextprovider";
import Productbrandservice from "../services/productbrandservice";
import brandservice from "../services/brandservice";
import productservice from "../services/productservice";
import categoryservice from "../services/categoryservice";


const DetailProduct=(props)=>{
    const value=useContext(Context);
    const [product,setProduct]=useState([])
    const selectBrandDOC=useRef();
    const selectSubCateDOC=useRef()


    useEffect( () => {
        const subCateDOC=selectSubCateDOC.current
        const brandDOC=selectBrandDOC.current

        //getProductByID
        productservice.getProductById(props.idProduct).then((res)=>{
            let data=res.data;
            setProduct(data)
            //select option
            for(let i=0;i<subCateDOC.length;i++){
                if(data.subCateName===subCateDOC[i].innerHTML){
                    subCateDOC[i].selected=true;
                }
            }
        }).catch(e=>{
            console.log(e)
        })

        //select option
        brandservice.getBrandById(props.idBrand).then(res=>{
            for(let i=0;i<brandDOC.length;i++){
                if(res.data.brandName===brandDOC[i].innerHTML){
                    brandDOC[i].selected=true;
                }
            }
        }).catch(e=>{
            console.log(e)
        })

        return()=>{
            props.handleUnMountDetailProduct();
        }
    },[]);

    return(
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <p>Name:</p>
                        <input type={"text"} value={product.productName}/>
                    </div>
                    <div className="col-12">
                        <p>Color:</p>
                        <input type={"text"} value={product.color}/>
                    </div>
                    <div className="col-12">
                        <p>Quantity:</p>
                        <input type={"text"} value={product.quantity}/>
                    </div>
                    <div className="col-12">
                        <p>Sell price:</p>
                        <input type={"text"} value={product.sellPrice}/>
                    </div>
                    <div className="col-12">
                        <p>Origin price:</p>
                        <input type={"text"} value={product.originPrice}/>
                    </div>
                    <div className="col-12">
                        <p>Brand name:</p>
                        <select ref={selectBrandDOC}>
                            {value.listBrand.map((item,index)=>{
                                return(
                                    <option key={index}>{item.brandName}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="col-12">
                        <p>Subcategory:</p>
                        <select ref={selectSubCateDOC}>
                            {value.listSubCate.map((item,index)=>{
                                return(
                                    <option key={index}>{item.subCateName}</option>
                                )
                            })}
                        </select>
                    </div>
                </div>
                <div className="action">
                    <button onClick={()=>{value.handleClose()}}>Close</button>
                </div>
            </div>
        </>
    )
}

export default DetailProduct