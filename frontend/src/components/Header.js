import logoPath from '../images/svg/Logo-mesto.svg';
import {
    Switch, Route, useParams, Link
} from "react-router-dom";
import React from "react";

function Header(props) {
    const [mobMenu, setMobMenu] = React.useState(false);
    const handleClicMobMenu = () => {
        setMobMenu(!mobMenu)
    };
    const handleOut =()=>{
        props.onOutClick();
        setMobMenu(false);
    }

    return (
        <header className={` header ${mobMenu ? "header_mobileOpen" : ""}`}>
            <img className="header__logo" src={logoPath} alt="Лого"/>
            <Switch>
                <Route exact path="/signin">
                    <Link to="/signup" className="header__link">
                        Регистрация
                    </Link>
                </Route>
                <Route exact path="/signup">
                    <Link to="/signin" className="header__link">
                        Войти
                    </Link>
                </Route>
                <Route path="/">
                    <div className={`${mobMenu ? "header__mobMenuBtn_open" : "header__mobMenuBtn"  }`}
                         onClick={handleClicMobMenu}></div>
                    <div className={`${mobMenu ? "header__userWrap_mobileOpen" : "header__userWrap"}`}>
                        <p className="header__userEmail">{props.userEmail}</p>
                        <Link to="/signin" onClick={handleOut} className="header__link header__link_signOut">Выйти</Link>
                    </div>

                </Route>


            </Switch>
        </header>
    )
}

export default Header;