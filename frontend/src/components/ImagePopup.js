import React from 'react';

function ImagePopup(props) {

    React.useEffect(()=>{
    if(props.isOpen){document.addEventListener("keydown", props.onCloseEsc)}
    return (()=>{document.removeEventListener("keydown", props.onCloseEsc)})
})


    return (
        <div className={`popup popup_show-pict  ${props.isOpen ? "popup_opened" : ""}`} onClick={props.onCloseOverlay} >
            <figure className="popup__container popup__container_pict-container">
                <img className="popup__fullsize-pict" src={props.card.link} alt="фото"/>
                <figcaption className="popup__pict-title">{props.card.name}</figcaption>
                <button className="popup__close-button" type="button" title="Закрыть" onClick={props.onClose}></button>
            </figure>
        </div>
    )
}

export default ImagePopup;