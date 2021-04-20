import PopupWithForm from "./PopupWithForm";
import React from 'react';


function EditAvatarPopup(props) {
    const inputRef = React.useRef();


    React.useEffect(()=>{
        if(!props.isOpen) {
            inputRef.current.value='';
        }
    },[props.isOpen])

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar({avatar: inputRef.current.value});

    }


    return (
        <PopupWithForm title='Обновить аватар' name='editAvatar' isOpen={props.isOpen}
                       onClose={props.onClose} onSubmit={handleSubmit} onCloseEsc={props.onCloseEsc}
                       onCloseOverlay={props.onCloseOverlay} >
            <fieldset className="popup__inputs">
                <input type="url" className="popup__input popup__input_link"
                       id="popup__input-editAvatar_link" name="link"
                       placeholder="Ссылка на картинку" required ref={inputRef}/>
                <span className="popup__error-msg" id="popup__input-editAvatar_link-error"></span>
                <button type="submit" className="popup__submit">{props.btnText}</button>
            </fieldset>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;