import React from 'react';
import Card from "./Card";
import {CurrentUserContext} from "../contexts/CurrentUserContext.js";

function Main(props) {
    const user = React.useContext(CurrentUserContext);


    return (
        <main className="main">
            <section className="profile">
                <div className="profile__wrap">
                    <div className="profile__avatar-wrap" title="Изменить" onClick={props.onEditAvatar}>
                        <img alt="ava" className="profile__avatar-pic" src={user.avatar}/>
                    </div>
                    <div className="profile__about">
                        <div className="profile__title">
                            <h1 className="profile__name">{user.name}</h1>
                            <button className="profile__edit-button" type="button" title="Изменить профиль"
                                    onClick={props.onEditProfile}></button>
                        </div>
                        <p className="profile__descr">{user.about}</p>
                    </div>
                </div>
                <button className="profile__add-button" type="button" title="Добавить картинку"
                        onClick={props.onAddPlace}></button>
            </section>
            <section className="photo-grid">
                {props.cards.map((card) => {
                    return (
                        <Card dataCard={card} key={card._id} onCardClick={props.onCardClick}
                              onCardLike={props.onCardLike}
                              onCardDelete={props.onCardDelete}/>)
                })
                }
            </section>
        </main>
    )
}

export default Main;