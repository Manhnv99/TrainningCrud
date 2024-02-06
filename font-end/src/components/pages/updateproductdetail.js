import {useCallback, useContext, useEffect, useRef, useState} from "react";
import {Context} from "../provider/contextprovider";
import productbrandservice from "../services/productbrandservice";
import categoryservice from "../services/categoryservice";
import statusservice from "../services/statusservice";
import Productbrandservice from "../services/productbrandservice";
import brandservice from "../services/brandservice";
import productservice from "../services/productservice";
import Loading from "./loading";
import Confirm from "./confirm";
import {Col, Container, Form, Row} from "react-bootstrap";


const Updateproductdetail=(props)=>{
    const value=useContext(Context);
    const [name,setName]=useState('')
    const [color,setColor]=useState('')
    const [quantity,setQuantity]=useState(undefined)
    const [sellPrice,setSellPrice]=useState(undefined)
    const [originPrice,setOriginPrice]=useState(undefined)
    const [idBrand,setIdBrand]=useState('')
    const [idSubCate,setIdSubCate]=useState('')
    const [idStatus,setIdStatus]=useState('')
    const [loading,setLoading]=useState(false)
    // Touch
    const [touchName,setTouchName]=useState(false)
    const [touchColor,setTouchColor]=useState(false)
    const [touchQuantity,setTouchQuantity]=useState(false)
    const [touchSellPrice,setTouchSellPrice]=useState(false)
    const [touchOriginPrice,setTouchOriginPrice]=useState(false)
    const [touchIdBrand,setTouchIdBrand]=useState(false)
    const [touchIdSubCate,setTouchIdSubCate]=useState(false)
    const [touchIdStatus,setTouchIdStatus]=useState(false)


    const selectBrandDOC=useRef();
    const selectSubCateDOC=useRef();
    const selectStatusDOC=useRef();
    const [showModalConfirm,setShowModalConfirm]=useState(false)
    const [errors,setErrors]=useState({
        productName:undefined,
        color:undefined,
        quantity:undefined,
        sellPrice:undefined,
        originPrice:undefined,
        description:undefined,
        idSubcate:undefined,
        idStatus:undefined
    })


    useEffect(() => {
        const brandDOC=selectBrandDOC.current
        const subCateDOC=selectSubCateDOC.current
        const statusDOC=selectStatusDOC.current

        //get Product to fill on the talbe
        productservice.getProductById(props.idProduct).then((res)=>{
            let data=res.data
            //select option
            console.log(data)
            for(let i=0;i<subCateDOC.length;i++){
                if(data.subCateName===subCateDOC[i].innerHTML){
                    subCateDOC[i].selected=true;
                    setIdSubCate(subCateDOC[i].value)
                }
            }
            setName(data.productName);
            setColor(data.color);
            setQuantity(data.quantity);
            setSellPrice(data.sellPrice);
            setOriginPrice(data.originPrice);

            for(let i=0;i<statusDOC.length;i++){
                if(data.statusName===statusDOC[i].innerHTML){
                    statusDOC[i].selected=true;
                    setIdStatus(statusDOC[i].value)
                }
            }

            brandservice.getBrandById(props.idBrand).then(res=>{
                for(let i=0;i<brandDOC.length;i++){
                    if(res.data.brandName===brandDOC[i].innerHTML){
                        brandDOC[i].selected=true;
                        setIdBrand(brandDOC[i].value)
                    }
                }
            })
        })

        return()=>{
            props.handleUnMountDetailProduct();
        }
    }, []);

    const handleEditProduct= async (confirm)=>{
        setShowModalConfirm(true)
        if(confirm){
            setLoading(true)
            const productRequest={
                productName:name,
                color:color,
                quantity:quantity,
                sellPrice:sellPrice,
                originPrice:originPrice,
                description:'tốt',
                idSubcate:idSubCate,
                idStatus:idStatus,
                idBrand:idBrand
            }
            try{
                await productservice.updateProductById(props.idProduct,productRequest)
                const productBrandRequest={
                    brandIdEdit: idBrand,
                    productId:props.idProduct,
                    brandId:props.idBrand
                }
                const res=await productbrandservice.updateProductBrand(productBrandRequest)
                value.updateDataUpdate(res.data)
                value.handleClose();
                setLoading(false);
                value.showToastMessage('Sửa Sản Phẩm Thành Công!')
            }catch (e) {
                console.log(e)
                setLoading(false);
                const errorsResponse={...errors}
                errorsResponse.productName=e.response.data.productName
                errorsResponse.color=e.response.data.color
                errorsResponse.quantity=e.response.data.quantity
                errorsResponse.sellPrice=e.response.data.sellPrice
                errorsResponse.originPrice=e.response.data.originPrice
                errorsResponse.description=e.response.data.description
                errorsResponse.idSubcate=e.response.data.idSubcate
                errorsResponse.idStatus=e.response.data.idStatus
                setErrors(errorsResponse)
            }
        }

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
    const onChangeIdStatus=useCallback(e=>{
        setIdStatus(e.target.value)
        const errorsCopy={...errors}
        errorsCopy.idStatus=undefined
        setErrors(errorsCopy)
        if(!touchIdStatus){
            setTouchIdStatus(true)
        }
    })

    return(
        <>
            {showModalConfirm &&
                <Confirm handleEditProduct={handleEditProduct} setShowModalConfirm={setShowModalConfirm}
                         whatActionConfirm={"update"} message={"Bạn Có Chắc Muốn Update Sản Phẩm Này?"}/>}
            {loading && <Loading/>}
            <Container className={"container-fluid"}>
                <Row>
                    <Col sm={12}>
                        <Form.Group>
                            <Form.Label><span style={{color: "red"}}>*</span>Name</Form.Label>
                            <Form.Control required type="text" placeholder="Điền tên sản phẩm!"
                                          value={name} onChange={onChangeName}
                                          isInvalid={touchName && name.length === 0 || errors.productName !== undefined}
                                          isValid={name.length > 0}/>
                            <Form.Control.Feedback type={"invalid"}>
                                {errors.productName !== undefined ? errors.productName : 'Tên sản phẩm Không được bỏ trống!'}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label><span style={{color: "red"}}>*</span>Color</Form.Label>
                            <Form.Control required type="text" placeholder="Điền màu sắc!"
                                          value={color} onChange={onChangeColor}
                                          isInvalid={touchColor && color.length === 0 || errors.color !== undefined}
                                          isValid={color.length > 0}/>
                            <Form.Control.Feedback type={"invalid"}>
                                {errors.color !== undefined ? errors.color : 'Màu sắc không được bỏ trống!'}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label><span style={{color: "red"}}>*</span>Quantity</Form.Label>
                            <Form.Control required type="number" placeholder="Điền số lượng!"
                                          value={quantity} onChange={onChangeQuantity}
                                          isInvalid={touchQuantity && quantity === undefined || quantity==='' || errors.quantity !== undefined}
                                          isValid={quantity !== undefined}/>
                            <Form.Control.Feedback type={"invalid"}>
                                {errors.quantity !== undefined ? errors.quantity : 'Số lượng không được bỏ trống!'}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label><span style={{color: "red"}}>*</span>Sell Price</Form.Label>
                            <Form.Control required type="number" placeholder="Điền giá bán!"
                                          value={sellPrice} onChange={onChangeSellPrice}
                                          isInvalid={touchSellPrice && sellPrice === undefined || sellPrice==='' || errors.sellPrice !== undefined}
                                          isValid={sellPrice !== undefined}/>
                            <Form.Control.Feedback type={"invalid"}>
                                {errors.sellPrice !== undefined ? errors.sellPrice : 'Giá bán không được bỏ trống!'}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label><span style={{color: "red"}}>*</span>Origin Price</Form.Label>
                            <Form.Control required type="number" placeholder="Điền giá gốc!"
                                          value={originPrice} onChange={onChangeOriginPrice}
                                          isInvalid={touchOriginPrice && originPrice === undefined || originPrice === '' || errors.originPrice !== undefined}
                                          isValid={originPrice !== undefined}/>
                            <Form.Control.Feedback type={"invalid"}>
                                {errors.originPrice !== undefined ? errors.originPrice : 'Giá gốc không được bỏ trống!'}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label><span style={{color: "red"}}>*</span>Brand Name</Form.Label>
                            <Form.Select ref={selectBrandDOC} style={{height: "40px"}} required
                                         onChange={onChangeIdBrand}
                                         isInvalid={touchIdBrand && idBrand === '' || errors.idBrand !== undefined}
                                         isValid={idBrand !== ''}>
                                <option value="">--Chọn Thương Hiệu--</option>
                                {value.listBrand.map(item => {
                                    return (
                                        <option key={item.id} value={item.id}>{item.brandName}</option>
                                    )
                                })}
                            </Form.Select>
                            <Form.Control.Feedback type={"invalid"}>
                                {errors.idBrand !== undefined ? errors.idBrand : 'Thương hiệu không được bỏ trống!'}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label><span style={{color: "red"}}>*</span>Subcategory</Form.Label>
                            <Form.Select ref={selectSubCateDOC} style={{height: "40px"}} required
                                         onChange={onChangeIdSubcate}
                                         isInvalid={touchIdSubCate && idSubCate === '' || errors.idSubcate !== undefined}
                                         isValid={idSubCate !== ''}>
                                <option value="">--Chọn Loại--</option>
                                {value.listSubCate.map(item => {
                                    return (
                                        <option key={item.id} value={item.id}>{item.subCateName}</option>
                                    )
                                })}
                            </Form.Select>
                            <Form.Control.Feedback type={"invalid"}>
                                {errors.idSubcate !== undefined ? errors.idSubcate : 'Loại không được bỏ trống!'}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label><span style={{color: "red"}}>*</span>Status</Form.Label>
                            <Form.Select ref={selectStatusDOC} style={{height: "40px"}} required
                                         onChange={onChangeIdStatus}
                                         isInvalid={touchIdStatus && idStatus === '' || errors.idStatus !== undefined}
                                         isValid={idStatus !== ''}>
                                <option value="">--Chọn Trạng Thái--</option>
                                {value.listStatus.map(item => {
                                    return (
                                        <option key={item.id} value={item.id}>{item.statusName}</option>
                                    )
                                })}
                            </Form.Select>
                            <Form.Control.Feedback type={"invalid"}>
                                {errors.idStatus !== undefined ? errors.idStatus : 'Trạng thái không được bỏ trống!'}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <div className={"action"}>
                            <button onClick={() => {
                                handleEditProduct()
                            }}>Save changes
                            </button>
                            <button onClick={() => {
                                value.handleClose()
                            }}>Close
                            </button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Updateproductdetail;