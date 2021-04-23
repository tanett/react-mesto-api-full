import '../App.css';

import Header from './Header';
import Main from "./Main";
import Footer from "./Footer";
import Login from "./Login";
import Register from "./Register";

import ImagePopup from "./ImagePopup";
import React from 'react';
import {
    Switch, Route, useParams, Link, Redirect, useHistory
} from "react-router-dom";

import api from "../utils/api";
import * as auth from "../utils/auth";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

import ProtectedRoute from "./ProtectedRoute";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import AskDeletePopup from "./AskDeletePopup";
import InfoTooltip from "./InfoTooltip";



function App() {

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isDeletePopupOpen, setIsDeletePopupOpen] = React.useState(false);
    const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState({});
    const [currentUser, setCurrentUser] = React.useState({
        name: "",
        avatar: "",
        about: ""
    });
    const toolTipMessage = {
        success: 'Вы успешно зарегистрировались!',
        failure: 'Что-то пошло не так!Попробуйте ещё раз.'
    }
    const [cards, setCards] = React.useState([]);
    const [classPageLoad, setClassPageLoad] = React.useState('hidden');
    const [btnLoader, setBtnLoader] = React.useState('Сохранить');
    const [loggedIn, setLoggedIn] = React.useState('');
    const [resRegistration, setResRegistration] = React.useState('');
    const [messageToolTip, setMessageToolTip] = React.useState(toolTipMessage);
    const [userEmail, setUserEmail] = React.useState('');

    const history = useHistory();


    React.useEffect(() => {
            setClassPageLoad('hidden');
            handleTokenCheck();
            Promise.all([api.getInitialCards(), api.getUserInfo()]).then((data) => {
                setCards(data[0]);
                setCurrentUser(data[1])
            })
                .catch(err => console.log(err))
                .finally(() => setClassPageLoad('visible'))
        }, []
    );

    function handleRegister(email, password) {
        return auth.register(email, password).then(res => {
            setMessageToolTip(toolTipMessage);
            if (!res || res.statusCode === 400) {
                setResRegistration(false);
                throw new Error('что-то не так пошло')
            } else {
                setResRegistration(true);
                history.push('/signin')
            }

            setIsInfoTooltipOpen(true);

        }).catch(err => console.log(err));
    }

    function handleCloseInfoTooltip() {
        setIsInfoTooltipOpen(false);
    }

    function handleLogin(login, password) {
        return auth.authorize(login, password)
            .then(data => {
                console.log(data);
                if (!data.token) {
                    setMessageToolTip({failure:data.message});
                    console.log(messageToolTip);
                    setResRegistration(false);
                    setIsInfoTooltipOpen(true);
                    return  data;
                }
                setUserEmail(login);
                setLoggedIn(true);
                return data;
            })

    }

    function handleClickOut() {
        localStorage.removeItem('jwt');
        setLoggedIn(false)
    }

    function handleTokenCheck() {
         if (localStorage.getItem('jwt')) {
             const jwt = localStorage.getItem('jwt');
            auth.checkToken(jwt).then(
                 res => {
                   console.log(res);
                    setUserEmail(res.data.email);
                    setLoggedIn(true);
                   history.push('/')
                }
            ).catch(err => console.log(err))
         }


    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        api.changeLikeCardStatus(card._id, isLiked)
            .then(newCard => {
                const newCards = cards.map((c) => c._id === card._id ? newCard : c);
                setCards(newCards);
            }).catch((err) => console.log(err));
    }

    function handleDeleteClick(card) {
        setSelectedCard(card);
        setIsDeletePopupOpen(true);

    }

    function handleDeleteSubmit() {
        api.deleteCard(selectedCard._id)
            .then(() => setCards(cards.filter(c => c._id !== selectedCard._id)))
            .then(() => closeAllPopups())
            .catch((err) => console.log(err));

    }


    const handleEditAvatarClick = () => {
        setIsEditAvatarPopupOpen(true);
    }

    const handleEditProfileClick = () => {
        setIsEditProfilePopupOpen(true);
    }

    const handleAddPlaceClick = () => {
        setIsAddPlacePopupOpen(true);
    }

    const handleCardClick = (card) => {
        setSelectedCard(card);
        setIsImagePopupOpen(true)
    }

    const closeAllPopups = () => {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsDeletePopupOpen(false);
        setSelectedCard({});
        setIsImagePopupOpen(false);
        setIsInfoTooltipOpen(false);
    }

    const handleEscClick = (event) => {
        if (event.key === "Escape") {
            closeAllPopups();
        }
    }

    const handleOverlayClick = (event) => {
        if (event.target.classList.contains('popup_opened')) {
            closeAllPopups();
        }
    }


    const handleUpdateUser = ({name, about}) => {
        setBtnLoader('Сохранение...');
        api.editUserInfo({name, about})
            .then((res) =>
                setCurrentUser(res))
                    .then(() => {
                        closeAllPopups();
                        setBtnLoader('Сохранить')
                    })
                    .catch((err) => console.log(err));


    }

    const handleUpdateAvatar = ({avatar}) => {
        setBtnLoader('Сохранение...');
        api.editUserAvatar({avatar}).then((res) => {
            setCurrentUser(res);
            closeAllPopups();
            setBtnLoader('Сохранить');
        })
    }

    const handleAddPlaceSubmit = ({namePlace, link}) => {
        setBtnLoader('Сохранение...');
        api.addCard({name: namePlace, link: link})
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
                setTimeout(() => setBtnLoader('Сохранить'), 2000);
            })
    }


    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className={`page ${classPageLoad}`}>
                <div className="page__wrap">
                    <Header userEmail={userEmail} onOutClick={handleClickOut}/>
                    <Switch>
                        <ProtectedRoute exact path="/"
                                        loggedIn={loggedIn}
                                        component={Main} onEditProfile={handleEditProfileClick}
                                        onAddPlace={handleAddPlaceClick}
                                        onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} cards={cards}
                                        onCardLike={handleCardLike} onCardDelete={handleDeleteClick}/>
                        <Route path="/signin">
                            <Login isLogin={handleLogin}/>
                        </Route>
                        <Route path="/signup">
                            <Register onRegister={handleRegister}/>
                        </Route>
                        <Route path="*">
                            {loggedIn ? <Redirect to="/"/> : <Redirect to="/signin"/>}
                        </Route>

                    </Switch>
                    {/*<Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick}*/}
                    {/*      onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} cards={cards}*/}
                    {/*      onCardLike={handleCardLike} onCardDelete={handleDeleteClick}/>*/}
                    {loggedIn === true && <Footer/>}
                </div>
                <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}
                                  onCloseEsc={handleEscClick} onCloseOverlay={handleOverlayClick}
                                  onUpdateUser={handleUpdateUser} btnText={btnLoader}/>
                <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}
                                 onCloseEsc={handleEscClick} onCloseOverlay={handleOverlayClick}
                                 onUpdateAvatar={handleUpdateAvatar} btnText={btnLoader}/>

                <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}
                               onCloseEsc={handleEscClick} onCloseOverlay={handleOverlayClick}
                               btnText={btnLoader}/>
                <AskDeletePopup isOpen={isDeletePopupOpen} onClose={closeAllPopups}
                                onCloseEsc={handleEscClick} onCloseOverlay={handleOverlayClick}
                                onDeleteSubmit={handleDeleteSubmit}/>

                <ImagePopup card={selectedCard}
                            isOpen={isImagePopupOpen}
                            onClose={closeAllPopups}
                            onCloseEsc={handleEscClick}
                            onCloseOverlay={handleOverlayClick}/>

                <InfoTooltip success={resRegistration}
                             isOpen={isInfoTooltipOpen}
                             onClose={handleCloseInfoTooltip}
                             message={messageToolTip}
                />

            </div>
        </CurrentUserContext.Provider>
    )
}

export default App;
