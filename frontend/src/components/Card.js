import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext.js";

function Card(props) {
    const user = React.useContext(CurrentUserContext);
    const handleClick = () => {
        props.onCardClick(props.dataCard);
    }
    const handleLikeClick = () => {
        props.onCardLike(props.dataCard)
    }
    const handleDeleteClick = () => {
        props.onCardDelete(props.dataCard)
    }

    const isOwn = props.dataCard.owner._id === user._id;

    const cardDeleteButtonClassName = (
        `photo-grid__trash ${isOwn ? 'photo-grid__trash_visible' : 'photo-grid__trash_hidden'}`
    );

    const isLiked = props.dataCard.likes.some(i => i._id === user._id);

    const cardLikeButtonClassName = `photo-grid__like ${isLiked ? 'photo-grid__like_on' : 'photo-grid__like_off'}`;

    return (
        <figure className="photo-grid__item" id={props.dataCard._id}>
            <div className="photo-grid__picture-wrap">
                <img className="photo-grid__picture" alt={props.dataCard.name} src={props.dataCard.link}
                     title="Нажми для просмотра" onClick={handleClick}/>
            </div>
            <figcaption className="photo-grid__item-title ">
                <h2 className="photo-grid__item-name">{props.dataCard.name}</h2>
                <div className="photo-grid__like-container">
                    <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
                    <span className="photo-grid__like-count">{props.dataCard.likes.length}</span>
                </div>
            </figcaption>
            <button className={cardDeleteButtonClassName} type="button" title="Удалить"
                    onClick={handleDeleteClick}></button>
        </figure>
    )
}

export default Card;