import '../scss/addproduct.scss'
import {useState, useContext, useEffect, useCallback} from "react";
import {Context} from "../provider/contextprovider";
import brandservice from "../services/brandservice";
import categoryservice from "../services/categoryservice";
import productservice from "../services/productservice";
import productbrandservice from "../services/productbrandservice";
import Loading from "./loading";
import {Col, Container, Form, Row} from "react-bootstrap";


const AddProduct=(props)=>{
    const value=useContext(Context);
    const [name,setName]=useState('')
    const [color,setColor]=useState('')
    const [quantity,setQuantity]=useState('')
    const [sellPrice,setSellPrice]=useState('')
    const [originPrice,setOriginPrice]=useState('')
    const [idBrand,setIdBrand]=useState('')
    const [idSubCate,setIdSubCate]=useState('')
    const [loading,setLoading]=useState(false)
    // Touch
    const [touchName,setTouchName]=useState(false)
    const [touchColor,setTouchColor]=useState(false)
    const [touchQuantity,setTouchQuantity]=useState(false)
    const [touchSellPrice,setTouchSellPrice]=useState(false)
    const [touchOriginPrice,setTouchOriginPrice]=useState(false)
    const [touchIdBrand,setTouchIdBrand]=useState(false)
    const [touchIdSubCate,setTouchIdSubCate]=useState(false)

    const [errors,setErrors]=useState({
        productName:undefined,
        color:undefined,
        quantity:undefined,
        sellPrice:undefined,
        originPrice:undefined,
        description:undefined,
        idSubcate:undefined,
        idBrand:undefined
    })

    useEffect( () => {
        return()=>{
            props.handleUnMountDetailProduct();
        }
    }, []);


    const handleAddProduct= async ()=>{
        setLoading(true)
        const productRequest= {
            productName:name,
            color:color,
            quantity:quantity,
            sellPrice:sellPrice,
            originPrice:originPrice,
            description:'tốt',
            idSubcate:idSubCate,
            idBrand:idBrand,
            idStatus:1
        }
        //add Product
        try{
            const response=await productservice.addProduct(productRequest);
            const productBrand={
                brandIdEdit:null,
                productId:response.data.id,
                brandId:idBrand
            }
            await addProductBrand(productBrand);
            setLoading(false)
        }catch (e) {
            setLoading(false)
            const errorsResponse={...errors}
            errorsResponse.productName=e.response.data.productName
            errorsResponse.color=e.response.data.color
            errorsResponse.quantity=e.response.data.quantity
            errorsResponse.sellPrice=e.response.data.sellPrice
            errorsResponse.originPrice=e.response.data.originPrice
            errorsResponse.description=e.response.data.description
            errorsResponse.idSubcate=e.response.data.idSubcate
            errorsResponse.idBrand=e.response.data.idBrand
            setErrors(errorsResponse)
        }
    }

    const addProductBrand=async (productBrand)=>{
        await productbrandservice.addProductBrand(productBrand).catch(e=>{console.log(e)})
        value.setPage(1)
        value.totalPage()
        value.handleClose();
        setLoading(false)
        value.showToastMessage('Thêm Sản Phẩm Thành Công!')
    }


    const onChangeName=useCallback(e=>{
        setName(e.target.value)
        const errorsCopy={...errors}
        errorsCopy.productName=undefined
        setErrors(errorsCopy)
        if(!touchName){
            setTouchName(true)
        }
    })
    const onChangeColor=useCallback(e=>{
        setColor(e.target.value)
        const errorsCopy={...errors}
        errorsCopy.color=undefined
        setErrors(errorsCopy)
        if(!touchColor){
            setTouchColor(true)
        }
    })
    const onChangeQuantity=useCallback(e=>{
        setQuantity(e.target.value)
        const errorsCopy={...errors}
        errorsCopy.quantity=undefined
        setErrors(errorsCopy)
        if(!touchQuantity){
            setTouchQuantity(true)
        }
    })
    const onChangeSellPrice=useCallback(e=>{
        setSellPrice(e.target.value)
        const errorsCopy={...errors}
        errorsCopy.sellPrice=undefined
        setErrors(errorsCopy)
        if(!touchSellPrice){
            setTouchSellPrice(true)
        }
    })
    const onChangeOriginPrice=useCallback(e=>{
        setOriginPrice(e.target.value)
        const errorsCopy={...errors}
        errorsCopy.originPrice=undefined
        setErrors(errorsCopy)
        if(!touchOriginPrice){
            setTouchOriginPrice(true)
        }
    })
    const onChangeIdBrand=useCallback(e=>{
        setIdBrand(e.target.value)
        const errorsCopy={...errors}
        errorsCopy.idBrand=undefined
        setErrors(errorsCopy)
        if(!touchIdBrand){
            setTouchIdBrand(true)
        }
    })
    const onChangeIdSubcate=useCallback(e=>{
        setIdSubCate(e.target.value)
        const errorsCopy={...errors}
        errorsCopy.idSubcate=undefined
        setErrors(errorsCopy)
        if(!touchIdSubCate){
            setTouchIdSubCate(true)
        }
    })

    return(
        <>
            {loading && <Loading/>}
            <Container className={"container-fluid"}>
                <Row>
                    <Col sm={12}>
                        <Form.Group>
                            <Form.Label><span style={{color: "red"}}>*</span>Name</Form.Label>
                            <Form.Control required type="text" placeholder="Điền tên sản phẩm!"
                                          value={name} onChange={onChangeName}
                                          isInvalid={touchName && name.length === 0 || errors.productName!==undefined}
                                          isValid={name.length > 0}/>
                            <Form.Control.Feedback type={"invalid"}>
                                {errors.productName!==undefined ? errors.productName : 'Tên sản phẩm Không được bỏ trống!'}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label><span style={{color: "red"}}>*</span>Color</Form.Label>
                            <Form.Control required type="text" placeholder="Điền màu sắc!"
                                          value={color} onChange={onChangeColor}
                                          isInvalid={touchColor && color.length === 0 || errors.color!==undefined}
                                          isValid={color.length > 0}/>
                            <Form.Control.Feedback type={"invalid"}>
                                {errors.color!==undefined ? errors.color : 'Màu sắc không được bỏ trống!'}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label><span style={{color: "red"}}>*</span>Quantity</Form.Label>
                            <Form.Control required type="number" placeholder="Điền số lượng!"
                                          value={quantity} onChange={onChangeQuantity}
                                          isInvalid={touchQuantity && quantity.length === 0 || errors.quantity!==undefined}
                                          isValid={quantity.length > 0}/>
                            <Form.Control.Feedback type={"invalid"}>
                                {errors.quantity!==undefined ? errors.quantity : 'Số lượng không được bỏ trống!'}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label><span style={{color: "red"}}>*</span>Sell Price</Form.Label>
                            <Form.Control required type="number" placeholder="Điền giá bán!"
                                          value={sellPrice} onChange={onChangeSellPrice}
                                          isInvalid={touchSellPrice && sellPrice.length === 0 || errors.sellPrice!==undefined}
                                          isValid={sellPrice.length > 0}/>
                            <Form.Control.Feedback type={"invalid"}>
                                {errors.sellPrice!==undefined ? errors.sellPrice : 'Giá bán không được bỏ trống!'}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label><span style={{color: "red"}}>*</span>Origin Price</Form.Label>
                            <Form.Control required type="number" placeholder="Điền giá gốc!"
                                          value={originPrice} onChange={onChangeOriginPrice}
                                          isInvalid={touchOriginPrice && originPrice.length === 0 || errors.originPrice!==undefined}
                                          isValid={originPrice.length > 0}/>
                            <Form.Control.Feedback type={"invalid"}>
                                {errors.originPrice!==undefined ? errors.originPrice : 'Giá gốc không được bỏ trống!'}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label><span style={{color: "red"}}>*</span>Brand Name</Form.Label>
                            <Form.Select style={{height:"40px"}} required onChange={onChangeIdBrand}
                                         isInvalid={touchIdBrand && idBrand === '' || errors.idBrand!==undefined}
                                         isValid={idBrand !== ''}>
                                <option value="">--Chọn Thương Hiệu--</option>
                                {value.listBrand.map(item=>{
                                    return (
                                        <option key={item.id} value={item.id}>{item.brandName}</option>
                                    )
                                })}
                            </Form.Select>
                            <Form.Control.Feedback type={"invalid"}>
                                {errors.idBrand!==undefined ? errors.idBrand : 'Thương hiệu không được bỏ trống!'}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label><span style={{color: "red"}}>*</span>Subcategory</Form.Label>
                            <Form.Select style={{height:"40px"}} required onChange={onChangeIdSubcate}
                                         isInvalid={touchIdSubCate && idSubCate === '' || errors.idSubcate!==undefined}
                                         isValid={idSubCate !== ''}>
                                <option value="">--Chọn Loại--</option>
                                {value.listSubCate.map(item=>{
                                    return (
                                        <option key={item.id} value={item.id}>{item.subCateName}</option>
                                    )
                                })}
                            </Form.Select>
                            <Form.Control.Feedback type={"invalid"}>
                                {errors.idSubcate!==undefined ? errors.idSubcate : 'Loại không được bỏ trống!'}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <div className={"action"}>
                            <button onClick={() => {handleAddProduct()}}>Save changes</button>
                            <button onClick={() => {value.handleClose()}}>Close</button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default AddProduct