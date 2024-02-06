import '../scss/confirm.scss'
import {useRef} from "react";



const Confirm=(props)=>{

    const selectModal=useRef()
    const selectModalContent=useRef()
    // Open the modal when the button is clicked



    const handleCloseModalConfirm=()=>{
        selectModalContent.current.style.animation=''
        selectModalContent.current.classList.add('unShowConfirm')
        setTimeout(()=>{
            try{
                selectModal.current.style.display='none'
                selectModalContent.current.style.animation=''
                props.setShowModalConfirm(false)
            }catch (e) {
                console.log(e)
            }
        },400)
    }

    // Close the modal when clicking outside the modal content
    window.addEventListener('click', (event) => {
        if (event.target === selectModal.current) {
            selectModalContent.current.style.animation=''
            selectModalContent.current.classList.add('unShowConfirm')
            setTimeout(()=>{
                selectModal.current.style.display = 'none';
                selectModalContent.current.style.animation=''
                props.setShowModalConfirm(false)
            },400)
        }
    });


    const handleConfirmModalConfirm= ()=>{
        if(props.whatActionConfirm==='delete'){
            props.handleDelete(true)
        }else{
            props.handleEditProduct(true)
        }
         handleCloseModalConfirm();
    }



    return(
        <>
            <div className="modal" style={{
                display: "block",
                position: "fixed",
                top: "0",
                left: "0",
                width: "100%",
                height: "100%",
                backgroundColor:"rgba(0,0,0,0.5)"
                }} ref={selectModal}>
                <div ref={selectModalContent} className="modal-content" style={
                    {
                        backgroundColor: "#fefefe",
                        margin: "15% auto",
                        padding: "20px",
                        border: "1px solid #888",
                        width: "80%",
                        maxWidth:"500px",
                        textAlign:"center",
                        animation: "slideDown 0.4s ease-in-out"
                    }
                }>
                    <span><i className="fa-solid fa-exclamation"></i></span>
                    <p style={{
                        margin: "20px 0 30px 0",
                        fontWeight:"600",
                        fontSize:"25px",
                        color: "#555",
                    }}>{props.message}</p>
                    <div >
                        <button onClick={handleConfirmModalConfirm} className="confirm">OK</button>
                        <button onClick={handleCloseModalConfirm} className="cancel">Cancel</button>
                    </div>
                </div>
            </div>
        </>
    )
}


export default Confirm