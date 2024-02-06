import {useState,useEffect} from "react";
import {createContext} from "react";
import Categoryservice from "../services/categoryservice";
import Statusservice from "../services/statusservice";
import Brandservice from "../services/brandservice";
import Productbrandservice from "../services/productbrandservice";
import productbrandservice from "../services/productbrandservice";
const Context=createContext();


const Provider=({children})=>{

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [listSubCate,setListSubCate]=useState([])
    const [listStatus,setListStatus]=useState([])
    const [listBrand,setListBrand]=useState([])
    const [listProductBrand,setListProductBrand]=useState([])
    const [totalPages,setTotalPage]=useState([]);


    //Set All Data
    useEffect( async () => {
        await showDataSubCate();
        await showDataStatus();
        await showDataBrand();
        await showDataProductBrand();
        await totalPage();
    }, []);

    const showDataSubCate= ()=>{
        return Categoryservice.getAll().then((response)=>{
            setListSubCate(response.data);
        })
    }
    const showDataStatus=()=>{
        return Statusservice.getAll().then((response)=>{
            setListStatus(response.data);
        })
    }

    const showDataBrand=()=>{
        return Brandservice.getAll().then((response)=>{
            setListBrand(response.data);
        })
    }

    const showDataProductBrand=()=>{
        return Productbrandservice.pageGetAll(1).then((response)=>{
            setListProductBrand(response.data);
        })
    }

    //chuyển page
    const setPage=(page,whatAction,dataSearch,pname,price,brandName,cateName,statusName)=>{
        if(whatAction==='none'){
            Productbrandservice.pageGetAll(page).then((response)=>{
                setListProductBrand(response.data);
            })
        }else if(whatAction==='search'){
            Productbrandservice.searchProductBrandByAll(dataSearch,page).then(res=>{
                setListProductBrand(res.data.productBrandResponseList);
            })
        }else{
            Productbrandservice.findProductBrandByAll(pname,price,brandName,cateName,statusName,page).then(res=>{
                setListProductBrand(res.data.productBrandResponseList);
            })
        }
    }

    const totalPage=()=>{
        const myArray=[];
        productbrandservice.totalPage().then(res=>{
            for(let i=1;i<=res.data;i++){
                myArray.push(i)
            }
            setTotalPage(myArray)
        })
    }



    //find
    const showDataFind=(name,price,brandName,cateName,statusName,page)=>{
        return Productbrandservice.findProductBrandByAll(name,price,brandName,cateName,statusName,page).then(res=>{
            setListProductBrand(res.data.productBrandResponseList);
            const myArray=[];
            for(let i=1;i<=res.data.totalResult;i++){
                myArray.push(i)
            }
            setTotalPage(myArray)
        })
    }

    //search
    const showDataSearch=(keyword,page)=>{
        return Productbrandservice.searchProductBrandByAll(keyword,page).then(res=>{
            setListProductBrand(res.data.productBrandResponseList);
            const myArray=[];
            for(let i=1;i<=res.data.totalResult;i++){
                myArray.push(i)
            }
            setTotalPage(myArray)
        })
    }


    const updateDataAdd=(productBrand)=>{
        setListProductBrand([productBrand,...listProductBrand])
    }

    const updateDataUpdate=(productBrand)=>{
        for(let i=0;i<listProductBrand.length;i++){
            if(productBrand.productId===listProductBrand[i].productId){
                listProductBrand.splice(i,1,productBrand);
            }
        }
    }

    const updateDataDelete=(productBrand)=>{
        listProductBrand.filter((item)=>item.productId!==productBrand.productId)
    }

    const showToastMessage=(message)=>{
        //toast content
        let toastContent=document.createElement("div")
        toastContent.classList.add('toast-body')
        toastContent.innerHTML= `
                            <i class="fa-solid fa-circle-check"></i>
                            <span class="message">${message}</span>
                            <span class="countdown"></span>`

        //toast container
        let toastContainer=document.getElementsByClassName('toast-container')[0]
        toastContainer.appendChild(toastContent);
        setTimeout(()=>{
            toastContent.style.animation='endd ease-in-out 1.5s forwards'
        },3000)

        setTimeout(()=>{
            toastContent.remove()
        },6000)
    }

    const handleNameOnBlur=(input,error)=>{
        if(input===''){
            error[0].style.display='block'
            error[0].innerHTML='Tên sản phẩm Không được bỏ trống!'
        }else{
            error[0].style.display='none'
        }
    }
    const handleColorOnBlur=(input,error)=>{
        if(input===''){
            error[1].style.display='block'
            error[1].innerHTML='Màu sắc không được bỏ trống!'
        }else{
            error[1].style.display='none'
        }
    }

    const handleQuantityOnBlur=(input,error)=> {
        if (input === '') {
            error[2].style.display = 'block'
            error[2].innerHTML = 'Số lượng không được bỏ trống!'
        } else {
            if(input<1){
                error[2].style.display = 'block'
                error[2].innerHTML = 'Số lượng phải lớn hơn 1!'
            }else{
                error[2].style.display = 'none'
            }
        }
    }

    const handleSellPriceOnBlur=(input,error)=> {
        if (input === '') {
            error[3].style.display = 'block'
            error[3].innerHTML = 'Giá bán không được bỏ trống!'
        } else {
            if(input<1){
                error[3].style.display = 'block'
                error[3].innerHTML = 'Giá bán phải lớn hơn 1!'
            }else{
                error[3].style.display = 'none'
            }
        }
    }

    const handleOriginPriceOnBlur=(input,error)=> {
        if (input === '') {
            error[4].style.display = 'block'
            error[4].innerHTML = 'Giá gốc không được bỏ trống!'
        } else {
            if(input<1){
                error[4].style.display = 'block'
                error[4].innerHTML = 'Giá gốc phải lớn hơn 1!'
            }else{
                error[4].style.display = 'none'
            }
        }
    }


    const value={
        show,handleShow,handleClose,listSubCate,listStatus,listBrand,listProductBrand,totalPages,
        showDataProductBrand,showDataSearch,showToastMessage,updateDataAdd,updateDataUpdate,updateDataDelete,setPage,totalPage,showDataFind,
        handleNameOnBlur,handleColorOnBlur,handleQuantityOnBlur,handleSellPriceOnBlur,handleOriginPriceOnBlur
    }



    return(
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )
}

export {Context,Provider}



