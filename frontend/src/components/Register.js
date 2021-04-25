import React from "react";
import { Link, useHistory } from 'react-router-dom';



function Register(props) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    let history = useHistory();

    function handleChangeEmail(e) {
        setEmail(e.target.value)
    }

    function handleChangePassword(e) {
        setPassword(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();

        props.onRegister(email, password)
        .catch(err=>console.log(err));
    }

    return (
        <div className="login"  >
            <form className="login__container" name="login" id="login" onSubmit={handleSubmit}>
                <h2 className="login__title">Регистрация</h2>
                <fieldset className="login__inputs">
                    <input type="email" className="login__input_email login__input" id="login__input_email"
                           value={email}  name="email" placeholder="Email" required onChange={handleChangeEmail}/>

                    <input type="password" className="login__input login__input_password" minLength="4"
                           maxLength="20" name="password" value={password}
                           id="login__input_password" placeholder="Пароль" required onChange={handleChangePassword}/>


                    <button type="submit" className="login__btn" >Зарегистрироваться</button>
                </fieldset>
                <p className="login__ask">Уже зарегистрированы? <Link to="/signin" className="login__link">Войти</Link></p>
            </form>

        </div>
    )

}
export default Register;