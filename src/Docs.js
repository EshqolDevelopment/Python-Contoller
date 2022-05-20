import React, {useEffect} from 'react';
import './Docs.css'

export default function Docs() {





    return (

        <div className="App1">

                <h3 id={'title'}>Python Controller Built in functions</h3>

                <div id={'box'}>
                    <div className={'inner'}>
                        <h5 className={'func'}>download_file(path)</h5>
                        <h5 className={'desc'}>Simply call this function with the path of your file, don't forget to add 'r'
                            before the absolute path!<br/>
                            Example: download_file(r'C:\Users\user\Desktop\my_image.png')</h5>
                    </div>

                    <div className={'inner'}>
                        <h5 className={'func'}>screenshot()</h5>
                        <h5 className={'desc'}>Call this function to download a screenshot of your computer.<br/>
                            Example: screenshot(0, 0, 1920, 1080)</h5>
                    </div>

                    <div className={'inner'}>
                        <h5 className={'func'}>shutdown(option='shutdown')</h5>
                        <h5 className={'desc'}>Use this function the shutdown your computer, you can use any of these option
                            'restart', 'logout', 'sleep', 'lock', 'shutdown'. Warning! once your shutdown your computer,
                            Python Controller might stop as well.<br/>
                            Example: shutdown()</h5>
                    </div>

                    <div className={'inner'}>
                        <h5 className={'func'}>move(x, y)</h5>
                        <h5 className={'desc'}>Use this function to move your mouse on the computer, x and y will set the
                            location for the mouse<br/>
                            Example: move(100, 200)</h5>
                    </div>

                    <div className={'inner'}>
                        <h5 className={'func'}>write(text)</h5>
                        <h5 className={'desc'}>Simply write any text on the keyboard<br/>
                            Example: write('This text will be written on by home computer...')</h5>
                    </div>

                    <div className={'inner'}>
                        <h5 className={'func'}>is_running()</h5>
                        <h5 className={'desc'}>Check if Python Controller is running on your computer, this function will
                            return True if it does. after about 5 seconds without a response, we will update the state to
                            False for you<br/>
                            Example: is_running()</h5>
                    </div>

                    <div className={'inner'}>
                        <h5 className={'func'}>pip packages that already installed</h5>
                        <h5 className={'desc'}>pywin32, PIL, mouse, keyboard, pyautogui, requests, kivy, kivymd,
                            cryptography, pycrypto, eshqol, qrcode</h5>
                    </div>
                </div>

                <button onClick={() => window.location.replace(window.location.origin + '/home')} className={'button-28'} id={"go-back"}>Go Back</button>
        </div>

    );
}
