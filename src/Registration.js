import React from 'react';
import {Link} from 'react-router'
import './Authorization.css';
import axios from 'axios';
function Registration() {
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
                        <div className="user-box">
                            <input type="email" name="" required="" id='mail'></input>
                            <label>Email</label>
                        </div>
                        <center>
                            <a href="#" className='SignUpButton' onClick={()=>{
                                axios({
                                    method: 'post',
                                    url: 'https://localhost:7073/api/controller/regUser',
                                    data: {
                                        "userName": document.getElementById('login').value,
                                        "password": document.getElementById('pass').value,
                                        "email":  document.getElementById('mail').value
                                    },
                                    dataType: "dataType",
                                    headers: {
                                        'Accept': '*/*',
                                        'Content-Type': 'application/json'
                                    }
                                }).then(data => {
                                    console.log(data);
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
                                        let token = data['data']['token'];
                                        console.log(data);
                                        if(token){
                                            sessionStorage.setItem('token', token);
                                            window.location.href = '/';
                                        }
                                    });
                                })
                            }}>
                                Sign Up
                                <span></span>
                            </a>
                        </center>
                    </form>
                </div>
            </div>
        )
}
export default Registration;	
