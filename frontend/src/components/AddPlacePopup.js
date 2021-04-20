import PopupWithForm from "./PopupWithForm";
import React from 'react';


function AddPlacePopup(props) {

    const [namePlace, setNamePlace] = React.useState('');
    const [link, setLink] = React.useState('');
    React.useEffect(
        () => {
            if (!props.isOpen) {
                setNamePlace('');
                setLink('');
            }
        },[props.isOpen]
    )

    function handleChangeName(e) {
        setNamePlace(e.target.value)
    }

    function handleChangeLink(e) {
        setLink(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onAddPlace({
            namePlace,
            link
        });
        props.onClose();
        setNamePlace('');
        setLink('');
    }


    return (
        <PopupWithForm title='Новое место' name='addPict' isOpen={props.isOpen} onClose={props.onClose}
                       onSubmit={handleSubmit} onCloseEsc={props.onCloseEsc} onCloseOverlay={props.onCloseOverlay}>
            <fieldset className="popup__inputs">
                <input type="text" className="popup__input popup__input_title" minLength="2"
                       maxLength="30" name="name" value={namePlace}
                       id="popup__input_title" placeholder="Название" required onChange={handleChangeName}/>
                <span className="popup__error-msg" id="popup__input_title-error"></span>
                <input type="url" className="popup__input popup__input_link" id="popup__input_link"
                       value={link}
                       name="link" placeholder="Ссылка на картинку" required onChange={handleChangeLink}/>
                <span className="popup__error-msg" id="popup__input_link-error"></span>
                <button type="submit" className="popup__submit">{props.btnText}</button>
            </fieldset>
        </PopupWithForm>
    )

}

export default AddPlacePopup;