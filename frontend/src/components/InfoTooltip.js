import React from 'react';

function InfoTooltip(props) {

    React.useEffect(() => {
        if (props.isOpen) {
            document.addEventListener("keydown", handleEscClose);
            console.log(props.message);
        }
        return (() => {
            document.removeEventListener("keydown", handleEscClose)
        })
    })
function handleEscClose(event) {
    if (event.key === "Escape") {
        props.onClose();
    }

}
    function onOverlayClose(event) {
        if (event.target.classList.contains('popup_opened')) {
            props.onClose();
        }
    }

    return (
        <div className={`popup popup_InfoTooltip  ${props.isOpen ? "popup_opened" : ""}`}
             onClick={onOverlayClose}>
            <div className="popup__container popup__container_InfoTooltip">
                <div className={`popup__icon ${props.success ? "popup__icon_success" : "popup__icon_failure"}`}></div>
                <p className="popup__textInfo">{ props.message }</p>
                <button className="popup__close-button popup__close-button_InfoTooltip" type="button" title="Закрыть" onClick={props.onClose}></button>
            </div>
        </div>
    )
}

export default InfoTooltip;