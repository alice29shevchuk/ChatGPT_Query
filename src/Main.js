import React, { useEffect } from 'react';
import './Main.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBag,faUserLarge } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
function Main() {
    return(
      <div>
        <FontAwesomeIcon icon={faUserLarge} className='signIn_signUp_logo' onClick={()=>{
          window.location.href='/authorization';
        }}></FontAwesomeIcon>
        <img className='logo' src='https://dev.ua/storage/images/55/56/45/85/derived/a81187d64e9cf41eeb72ed31810af127.jpg'></img>
        <div className='cards'>
          <div className="card" id='1'>
            <div className="content">
              <div className="back">
                <div className="back-content">
                  <strong>FREE</strong>
                </div>
              </div>
            <div className="front">

              <div className="img">
                <div className="circle"></div>
                <div className="circle" id="right"></div>
                <div className="circle" id="bottom"></div>
              </div>

              <div className="front-content">
                <small className="badge">0$</small>
                <div className="description">
                  <div className="title">
                    <p className="title" id='textDescription'>
                      <strong>Upload photo</strong>
                    </p>
                  </div>
                  <p className='card-footer'>50 requests per day</p>
                    <button className="button" onClick={()=>{
                      console.log('ok');
                      if(sessionStorage.getItem('token')){
                        window.location.href='/uploading';
                      }   
                      else{
                        window.location.href='/authorization';
                      }                  
                    }}>
                      <FontAwesomeIcon icon={faShoppingBag} />
                    </button>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div className="card" id='2'>
          <div className="content">
            <div className="back">
              <div className="back-content">
                <strong>CLASSIC</strong>
              </div>
            </div>
            <div className="front">

              <div className="img">
                <div className="circle">
                </div>
                <div className="circle" id="right">
                </div>
                <div className="circle" id="bottom">
                </div>
              </div>

              <div className="front-content">
                <small className="badge">5$</small>
                <div className="description">
                  <div className="title">
                    <p className="title">
                      <strong>Upload photo</strong>
                    </p>
                  </div>
                  <p className='card-footer'>No limits</p>
                  <button className="button" onClick={()=>{
                      console.log('ok');
                      if(sessionStorage.getItem('token')){
                        window.location.href='/uploading';
                      }   
                      else{
                        window.location.href='/authorization';
                      }                  
                    }}>
                      <FontAwesomeIcon icon={faShoppingBag} />
                    </button>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div className="card" id='3'>
          <div className="content">
            <div className="back">
              <div className="back-content">
                <strong>WOW CLASSIC</strong>
              </div>
            </div>
            <div className="front">

              <div className="img">
                <div className="circle">
                </div>
                <div className="circle" id="right">
                </div>
                <div className="circle" id="bottom">
                </div>
              </div>

              <div className="front-content">
                <small className="badge">25$</small>
                <div className="description">
                  <div className="title">
                    <p className="title">
                      <strong>Upload photo & History of all requests</strong>
                    </p>
                  </div>
                  <p className='card-footer'>No limits</p>
                  <button className="button" onClick={()=>{
                      console.log('ok');
                      if(sessionStorage.getItem('token')){
                        window.location.href='/uploading';
                      }   
                      else{
                        window.location.href='/authorization';
                      }                  
                    }}>
                      <FontAwesomeIcon icon={faShoppingBag} />
                    </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card" id='4'>
          <div className="content">
            <div className="back">
              <div className="back-content">
                <strong>PREMIUM</strong>
              </div>
            </div>
            <div className="front">

              <div className="img">
                <div className="circle">
                </div>
                <div className="circle" id="right">
                </div>
                <div className="circle" id="bottom">
                </div>
              </div>

              <div className="front-content">
                <small className="badge">50$</small>
                <div className="description">
                  <div className="title">
                    <p className="title">
                      <strong>Upload photo & History of all requests & Sending voice messages</strong>
                    </p>
                  </div>
                  <p className='card-footer'>The duration of voice message maximum 15s </p>
                  <button className="button" onClick={()=>{
                      console.log('ok');
                      if(sessionStorage.getItem('token')){
                        window.location.href='/uploading';
                      }   
                      else{
                        window.location.href='/authorization';
                      }                  
                    }}>
                      <FontAwesomeIcon icon={faShoppingBag} />
                    </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        </div>
      </div>
    )
}
export default Main;	
