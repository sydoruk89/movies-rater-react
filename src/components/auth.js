import React, {useState, useEffect} from 'react'
import {API} from '../api-service'
import {useCookies} from 'react-cookie'

function Auth(){

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoginView, setIsLoginView] = useState(true);

    const [token, setToken] = useCookies(['mr-token']);

    useEffect(() => {
        console.log(token)
       if(token['mr-token']) window.location.href = '/movies'
    }, [token])

    const loginClicked = () =>{
        API.loginUser({username, password})
        .then(resp => setToken('mr-token', resp.token))
        .catch(error => console.log(error))
    }

    const registerClicked = () =>{
        API.registerUser({username, password})
        .then((data) => loginClicked())
        .catch(error => console.log(error))
    }

    const isDisabled = username.length === 0 || password.length === 0;  

    return(
        <div className="App">
            <header className="App-header">
                {isLoginView ? <h1>Login</h1> : <h1>Register</h1>}
            </header>
            <div className="login-container">
                <label htmlFor="username">Username</label><br/>
                <input id="username" type="text" placeholder="username" value={username} onChange={e => setUsername(e.target.value)}></input><br/>
                <label htmlFor="password">Password</label><br/>
                <input id="password" type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)}/><br/>
                {isLoginView ? <button onClick={loginClicked} disabled={isDisabled}>Login</button> :
                <button onClick={registerClicked} disabled={isDisabled}>Register</button>}
                {isLoginView ?
                    <p onClick={()=>setIsLoginView(false)}>Don't have an account? <span className="pointer">Register here!</span></p>:
                    <p onClick={()=>setIsLoginView(true)}>You already have an account? <span className="pointer">Login here!</span></p>
                }
            </div>
        </div>
    )
}
export default Auth