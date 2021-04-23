import React from "react";
import { Link, useHistory } from 'react-router-dom';
import { AUTH_URL, authorize} from "../utils/auth";
import {CurrentUserContext} from "../contexts/CurrentUserContext.js";

function Login(props) {
    const [userEmail, setUserEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    let history = useHistory();

    function handleChangeEmail(e) {
        setUserEmail(e.target.value)
    }

    function handleChangePassword(e) {
        setPassword(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();
        if(!userEmail || !password) {return}
        props.isLogin(userEmail,password).then(data=>{
            console.log(data);

            if(data.token){
                setUserEmail('');
                setPassword('');
                history.push('/');

            }
        }).catch(err => console.log(err));

    }

   return (
       <div className="login"  >
           <form className="login__container" name="login" id="login" onSubmit={handleSubmit}>
               <h2 className="login__title">Вход</h2>
               <fieldset className="popup__inputs">
                   <input type="email" className="login__input_email login__input" id="login__input_email"
                          value={userEmail}  name="email" placeholder="Email" required onChange={handleChangeEmail}/>

                   <input type="password" className="login__input login__input_password " minLength="4"
                          maxLength="20" name="password" value={password}
                          id="login__input_password" placeholder="Пароль" required onChange={handleChangePassword}/>


                   <button type="submit" className="login__btn" >Войти</button>
               </fieldset>
           </form>
       </div>
   )

}
export default Login;