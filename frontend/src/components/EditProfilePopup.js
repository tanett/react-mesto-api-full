import PopupWithForm from "./PopupWithForm";
import React from 'react';
import {CurrentUserContext} from "../contexts/CurrentUserContext.js";

function EditProfilePopup(props) {
    const user = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");
    React.useEffect(() => {
        setName(user.name);
        setDescription(user.about);
    }, [user]);

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleDescription(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm title='Редактировать профиль' name='edit-user-profile' isOpen={props.isOpen}
                       onClose={props.onClose} onCloseEsc={props.onCloseEsc} onCloseOverlay={props.onCloseOverlay}
                       onSubmit={handleSubmit}>
            <fieldset className="popup__inputs">
                <input type="text" className="popup__input popup__input_name" minLength="2" maxLength="40"
                       name="name"
                       id="popup__input_name" placeholder="Имя" required onChange={handleChangeName} value={name}/>
                <span className="popup__error-msg" id="popup__input_name-error"></span>
                <input type="text" className="popup__input popup__input_about" minLength="2" maxLength="200"
                       name="about"
                       id="popup__input_about" required
                       placeholder="Профессия" onChange={handleDescription} value={description}/>
                <span className="popup__error-msg" id="popup__input_about-error"></span>
                <button type="submit" className="popup__submit">{props.btnText}</button>
            </fieldset>

        </PopupWithForm>
    )
}

export default EditProfilePopup;

