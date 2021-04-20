import React from 'react';


function PopupWithForm(props) {
React.useEffect(()=>{
    if(props.isOpen){document.addEventListener("keydown", props.onCloseEsc)}
    return (()=>{document.removeEventListener("keydown", props.onCloseEsc)})
})

    return (
        <div className={`popup popup_${props.name}  ${props.isOpen ? "popup_opened" : ""}`}
             onClick={props.onCloseOverlay} >
            <form className={`popup__container popup__container_${props.name}`} name={props.name} id={props.name}
                  onSubmit={props.onSubmit}>
                <h2 className="popup__title">{props.title}</h2>
                {props.children}
                <button className="popup__close-button" type="button" title="Закрыть" onClick={props.onClose}></button>
            </form>
        </div>
    )
}

export default PopupWithForm;