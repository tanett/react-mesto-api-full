const config = {
    formSelector: '.popup__container',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    unactiveButtonClass: 'popup__submit_disactive',
    errorInputClass: 'popup__input_invalid',
    errorMssgInactivClass: 'popup__error-msg_inactive',
    errorMssgClass: 'popup__error-msg',
    photoGrid: '.photo-grid'
}

const optionsApi = {
    baseUrl: 'https://api.mesto.full.nomoredomains.icu',
    headers: {
        authorization: '47b6d590-a975-406b-afdb-480f171a6854',
        "Content-Type": 'application/json'
    }
}



const popupHtmlList = {
    "addPict": "<fieldset className=\"popup__inputs\">\n" +
        "<input type=\"text\" className=\"popup__input popup__input_title\" minLength=\"2\" maxLength=\"30\" name=\"name\"\n" +
        "id=\"popup__input_title\" placeholder=\"Название\" required />\n" +
        "<span className=\"popup__error-msg\" id=\"popup__input_title-error\"></span>\n" +
        "<input type=\"url\" className=\"popup__input popup__input_link\" id=\"popup__input_link\" name=\"link\"\n" +
        "placeholder=\"Ссылка на картинку\" required />\n" +
        "<span className=\"popup__error-msg\" id=\"popup__input_link-error\"></span>\n" +
        "<button type=\"submit\" className=\"popup__submit\">Сохранить</button>\n" +
        "</fieldset>",
    "editAvatar": "<fieldset className=\"popup__inputs\">\n" +
        "<input type=\"url\" className=\"popup__input popup__input_link\" id=\"popup__input-editAvatar_link\" name=\"link\"\n" +
        "placeholder=\"Ссылка на картинку\" required />\n" +
        "<span className=\"popup__error-msg\" id=\"popup__input-editAvatar_link-error\"></span>\n" +
        "<button type=\"submit\" className=\"popup__submit\">Сохранить</button>\n" +
        "</fieldset>",
    "editUserInfo": "<fieldset class=\"popup__inputs\">\n" +
        "      <input type=\"text\" class=\"popup__input popup__input_name\" minlength=\"2\" maxlength=\"40\" name=\"name\"\n" +
        "             id=\"popup__input_name\" placeholder=\"Имя\" required>\n" +
        "      <span class=\"popup__error-msg\" id=\"popup__input_name-error\"></span>\n" +
        "      <input type=\"text\" class=\"popup__input popup__input_about\" minlength=\"2\" maxlength=\"200\" name=\"about\"\n" +
        "             id=\"popup__input_about\" required\n" +
        "             placeholder=\"Профессия\">\n" +
        "      <span class=\"popup__error-msg\" id=\"popup__input_about-error\"></span>\n" +
        "      <button type=\"submit\" class=\"popup__submit\">Сохранить</button>\n" +
        "    </fieldset>",
    "askDelete": "<button type=\"submit\" className=\"popup__submit\">Да</button>"

}

const template = '.template';
const profileNameSelector = '.profile__name';
const profileDescrSelector = '.profile__descr';

// для попапа редактирования профиля
const popupEditUserProfileSelector = '.popup_edit-user-profile';
const buttonOpenPopupEdit = document.querySelector('.profile__edit-button');

const formEdit = document.querySelector('.popup__container_edit');
const nameInput = document.querySelector('.popup__input_name');
const aboutInput = document.querySelector('.popup__input_about');

//для попапа редактирования автарки
const popupEditAvatarSelector = '.popup_edit-avatar';
const buttonOpenPopupEditAvatar = document.querySelector('.profile__avatar-wrap');
const avatarPicSelector = '.profile__avatar-pic';
const formEditAvatar = document.querySelector('.popup__container_edit-avatar');

// попап удаления
const popupAskDeleteSelector = '.popup_ask-delete';


// для окна добавления фото
const popupAddPictSelector = '.popup_addPict';
const buttonOpenPopupAdd = document.querySelector('.profile__add-button');

const formAdd = document.querySelector('.popup__container_add-photo');


//попап фуллсайз картинки
const popupShowPictSelector = '.popup_show-pict';

const page = document.querySelector('.page');

//для InfoTooltip
const InfoTooltipConfig = {
    success: {
        icon: "",
        text: ""
    },
    failure: {
        icon: "",
        text: ""
    },
    
}

export {
    config, template, buttonOpenPopupEdit,
    nameInput, aboutInput,
    buttonOpenPopupAdd, formAdd, formEdit,
    profileDescrSelector, profileNameSelector, popupEditUserProfileSelector,
    popupAddPictSelector, popupShowPictSelector, popupEditAvatarSelector, buttonOpenPopupEditAvatar,
    avatarPicSelector, formEditAvatar, popupAskDeleteSelector, optionsApi, page, popupHtmlList,InfoTooltipConfig
};