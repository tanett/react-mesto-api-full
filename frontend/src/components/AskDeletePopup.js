import PopupWithForm from "./PopupWithForm";
import React from 'react';


function AskDeletePopup(props) {

    function handleSubmit(e) {
        e.preventDefault();
        props.onDeleteSubmit();
    }

    return (
        <PopupWithForm title='Вы уверены?' name='ask-delete' isOpen={props.isOpen}
                       onClose={props.onClose} onSubmit={handleSubmit} onCloseEsc={props.onCloseEsc}
                       onCloseOverlay={props.onCloseOverlay}>
            <fieldset className="popup__inputs">

                <button type="submit" className="popup__submit">Да</button>
            </fieldset>

        </PopupWithForm>
    )
}

export default AskDeletePopup;

