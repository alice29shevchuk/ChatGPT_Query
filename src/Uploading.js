import React, { useEffect } from 'react';
import './Uploading.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload,faTrash,faSave } from "@fortawesome/free-solid-svg-icons";
import ReactAudioPlayer from 'react-audio-player';
import { AudioRecorder } from 'react-audio-voice-recorder';
import { useAudioRecorder } from 'react-audio-voice-recorder';
import axios from 'axios';
function Uploading() {
    const recorderControls = useAudioRecorder();
    const addAudioElement = (blob) => {
        const url = URL.createObjectURL(blob);
        const audio = document.createElement("audio");
        audio.id = "audioRecord";
        var nameRecord = url.split('/')[3];
        console.log(nameRecord);
        audio.src = url;
        audio.controls = false;
        document.body.appendChild(audio);
        console.log('ok');
        var body = document.getElementById('containerWithVoice');
        var a  = document.createElement('a');
        a.textContent = "Download Voice Message";
        a.download = nameRecord;
        a.href = url;
        // a.addEventListener("click",()=>{
        //     setTimeout(()=>{
        //         const path = `C:\\Users\\Admin\OneDrive\\Рабочий стол\\ChatGPT-Manager\\ChatGPT-Manager\\ChatGPT-Manager\\ ${nameRecord}`;
        //     console.log(path);
        //     const nameRe = `@${nameRecord}.weba`;
        //     console.log(nameRe);
        //     const formData = new FormData()
        //     formData.append('file', {
        //       name: nameRe,
        //       type: 'audio/webm',
        //     })
        //     console.log(formData);
        //     //
        //     //Download Voice Message
        //     //
        //     axios.post('https://localhost:7073/api/controller/QueryGPTAudio', formData, {
        //         headers: {
        //           'Content-Type': 'multipart/form-data'
        //         }
        //       })
        //         .then(resp => {
        //           console.log(resp)
        //         })
        //         .catch(error => {
        //           console.log(error.response)
        //         })
        //     },1000);
        // })
        body.append(a);
      };
    useEffect(()=>{
        if(recorderControls.isRecording)
        {
            if(recorderControls.recordingTime>=parseInt(15))
            {
                alert('Время записи истекло!');
                recorderControls.stopRecording();
            }
        }
    })
    return (
        <div className='body'>
            <div class="input-container">
                <input placeholder="Enter text" class="input-field" type="text" id='search'></input>
                <label for="input-field" class="input-label">Enter text</label>
                <span class="input-highlight"></span>
            </div>
            <button className='sendButton' style={{marginLeft:'20px'}} onClick={()=>{
                alert('Погодите немного, запрос обрабатывается!');
                axios({
                    method: 'get',
                    url: `https://localhost:7073/api/controller/QueryGPT?qwery=${document.getElementById('search').value}`,
                    dataType: "dataType",
                    headers: {
                        'Accept': '*/*',
                        'Content-Type': 'application/json'
                    }
                }).then(data => {
                    console.log(data);
                    var pText = document.getElementById('resultGPTText');
                    pText.textContent = data['data'];
                });
            }}>Get</button>
            <h1 style={{marginLeft:'50px'}}>Response by text</h1>
            <p id='resultGPTText' className='responseBlock'></p>
            <div class="container">
                <form id='uploadForm'  encType="multipart/form-data">
                    <label for="arquivo" style={{ color: 'white' }}>Choose a file:</label>
                    <input accept=".jpg, .jpeg, .png, .gif, .pdf" class="inpdddut" name="arquivo" id="arquivo" type="file" onChange={(event) => {
                        var target = event.target;

                        if (!FileReader) {
                            alert('FileReader не поддерживается — облом');
                            return;
                        }

                        if (!target.files.length) {
                            alert('Ничего не загружено');
                            return;
                        }

                        var fileReader = new FileReader();
                        fileReader.onload = function () {
                            var image = document.getElementById('image');
                            image.src = fileReader.result;
                        }

                        fileReader.readAsDataURL(target.files[0]);
                    }}></input>
                    <img src='' alt="Image not loaded :(" id='image'></img>
                    
                </form>
                    <br></br>
                    <button className='sendButton'  onClick={()=>{
                        alert('Подождите немного, выполняется запрос!');
                        let upload = document.getElementById('arquivo');
                        console.log('ok');
                        let tempMas = upload.value.split('\\');
                        console.log(tempMas[tempMas.length - 1]);
                        let s = this;
                        const data = new FormData(document.getElementById('uploadForm'))
                        let imagefile = document.querySelector('#arquivo')
                        data.append('file', imagefile.files[0]);
                        axios.post('https://localhost:7073/api/controller/QueryGPTImage', data, {
                          headers: {
                            'Content-Type': 'multipart/form-data'
                          }
                        })
                          .then(response => {
                            console.log(response)
                            let p = document.getElementById('resultGPT');
                            p.textContent = response['data'];
                          })
                          .catch(error => {
                            console.log(error.response)
                          })
                      }}>Send</button>
            </div>
            <h1 style={{marginLeft:'50px'}}>Response by photo</h1>
            <p id='resultGPT' className='responseBlock'></p>
            <AudioRecorder onRecordingComplete={addAudioElement} recorderControls={recorderControls} id='voiceRecorder'/>
            <div className='container' id='containerWithVoice'>
            <form id='uploadFormAudio' name="uploadFormAudio" encType="multipart/form-data">
                    <input id='filesAudio' name='filesAudio' class="inpdddut"  type="file" onChange={()=>{
                        alert('Подождите немного, запрос обрабатывается!')
                        var upload = document.getElementById('filesAudio');
                        let tempMas = upload.value.split('\\');
                        console.log(tempMas[tempMas.length - 1]);
                        let s = this;
                        const data = new FormData(document.getElementById('uploadFormAudio'))
                        let imagefile = document.querySelector('#filesAudio')
                        data.append('file', imagefile.files[0]);
                        axios.post(`https://localhost:7073/api/controller/QueryGPTAudio`, data, {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        })
                            .then(res => {
                                console.log(res);
                                var voiceResponse = document.getElementById('resultGPTVoice');
                                voiceResponse.textContent = res['data'];
                            });
                    }} />
                </form>
            </div>
            
            <h1 style={{ marginLeft: '50px' }}>Response by voice</h1>
            <p id='resultGPTVoice' className='responseBlock'></p>
        </div>
    );
}
export default Uploading;
// https://www.npmjs.com/package/react-audio-voice-recorder

// if(recorderControls.recordingTime===5)
// {
//    console.log('kjh');
//    recorderControls.stopRecording();
// }