import React from 'react';
import {Link} from 'react-router-dom'
import './Authorization.css';
import axios from 'axios';
function Authorization() {
        return(
            <div className='main'>
                <div className="login-box">
                    <form>
                        <div className="user-box">
                            <input type="text" name="" required="" id='login'></input>
                            <label>Username</label>
                        </div>
                        <div className="user-box">
                            <input type="password" name="" required="" id='pass'></input>
                            <label>Password</label>
                        </div>
                        <center>
                            <a href="#" className='SignInButton' onClick={()=>{
                                axios({
                                    method: 'post',
                                    url: 'https://localhost:7073/api/controller/Login',
                                    data: {
                                        "userName": document.getElementById('login').value,
                                        "password": document.getElementById('pass').value
                                    },
                                    dataType: "dataType",
                                    headers: {
                                        'Accept': '*/*',
                                        'Content-Type': 'application/json'
                                    }
                                }).then(data => {
                                    sessionStorage.setItem('token', data['data']['token']);
                                    window.location.href='/';
                                });
                            }}>
                                Sign In
                                <span></span>
                            </a>
                        </center>
                    </form>
                    <div className='signUpLabels'>
                        <p>No account?</p>
                        <Link to="/registration" className='signUpButton'>Sign Up</Link>
                    </div>
                </div>
            </div>
        )
}
export default Authorization;	
