import React, {useEffect} from 'react';
import '../css/Docs.css'
import Topbar from "./topbar";


export default function Docs() {

    document.body.style.overflow = "visible"

    useEffect(() => console.log(1))

    return (

        <div className={'css-selector'}>
            <Topbar page={'Documentation'}/>

            <div className="App1">

                <h3 className={'title3'}>Python Controller Built in functions</h3>

                <div id={'box'}>
                    <div className={'inner'}>
                        <h5 className={'func'}>download(path)</h5>
                        <h5 className={'desc'}>Simply call this function with the path of your file, don't forget to add 'r'
                            before the absolute path!<br/>
                            Example: download_file(r'C:\Users\user\Desktop\my_image.png')</h5>
                    </div>

                    <div className={'inner'}>
                        <h5 className={'func'}>screenshot(x1=0, y1=0, x2=1920, y2=1080)</h5>
                        <h5 className={'desc'}>Call this function to download a screenshot of your computer, you can either
                            call this function with no arguments for full screenshot, or use x1, y1, x2, y2
                            to cut and get screenshot of a specific area.<br/>
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
                            return True if it does. after about 5 seconds without a response, you can consider this at all.<br/>
                            We automatically calling this function every 4 seconds and updating the state for you.<br/>
                            Example: is_running()</h5>
                    </div>

                    <div className={'inner'}>
                        <h5 className={'func'}>user()</h5>
                        <h5 className={'desc'}>Returns the path of the current user.<br/>
                            Example: user() -> 'C:/Users/my_user'</h5>
                    </div>

                    <div className={'inner'}>
                        <h5 className={'func'}>listdir(path, filter=lambda x: True)</h5>
                        <h5 className={'desc'}>List all the files and directories inside of a specific folder,
                            you can filter the results by adding lambda function such as:
                            filter=lambda x: x.endswith(".txt")<br/>
                            This will filter files that doesn't have .txt extension<br/>
                            Example: listdir("C:/My folder')</h5>
                    </div>

                    <div className={'inner'}>
                        <h5 className={'func'}>press(key)</h5>
                        <h5 className={'desc'}>Press a key on your keyboard<br/>
                            Example: press('space'), press('a')</h5>
                    </div>

                    <div className={'inner'}>
                        <h5 className={'func'}>pip packages that already installed</h5>
                        <h5 className={'desc'}>pywin32, PIL, mouse, keyboard, pyautogui, requests, kivy, kivymd,
                            cryptography, pycrypto, eshqol, qrcode</h5>
                    </div>
                </div>
            </div>
        </div>
    );
}
