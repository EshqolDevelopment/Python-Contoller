import './App.css';
import {useEffect, useState} from "react";
import { QrReader } from 'react-qr-reader';
import qr from './qr.png';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {db, get, ref} from "./firebase";
import {sha256} from "js-sha256";


export default function Login() {

    const [text, setText] = useState("")
    const [data, setData] = useState("");

    const [scanner, setScanner] = useState()
    const [closeScanner, setCloseScanner] = useState()


    useEffect(() => {
        setText(data)
        close()
    }, [data])


    async function connect(){

        const hash = sha256.create();
        hash.update(text);

        if (text.length === 16){
            await get(ref(db, "Root/" + hash.hex())).then((e) => {
                console.log(e.val())
                if (e.val() !== null){
                    localStorage.setItem("code", text)
                    window.location = window.location.origin + "/home";
                }
                else{
                    toast.error("The code is invalid")
                }
            })
        }
        else{
            toast.error("The code is invalid")
        }
    }



    function close(){
        setCloseScanner(<div/>)
        setScanner(<div/>)
    }


    function startScanning(){
        setScanner( <QrReader
            onResult={(result, error) => {
                if (!!result) {
                    setData(result?.text);
                }

                if (!!error) {
                    console.info(error);
                }
            }}
            style={{ width: '100%' }}
        />)

        setCloseScanner(<div className={"exit-camera"}>
            <button type="button" className="btn-close" onClick={close}>
                <span className="icon-cross"/>
                <span className="visually-hidden">Close</span>
            </button>
        </div>)
    }


    return (
        <div className="App">
            <h1 className={"title"}>Send python commands to your computer from anywhere around the globe</h1>
            <div className="bg"/>
            <div className="bg bg2"/>
            <div className="bg bg3"/>
            <div className="content">
                <h2>Scan the computer qr code to connect</h2>
                <img src={qr} className={"qr"} onClick={startScanning} alt={"QR Scanner"}/>
                <h2>Or enter your computer quick connect code</h2>
                <input id={"input"} className={"input"} type={"text"} placeholder={"Connect Code"} value={text} onChange={e => setText(e.target.value)}/>

                <div className={"connect"}>
                    <button className={"button-19"} onClick={connect}>Connect</button>
                </div>

            </div>

            <div className={"scanner"}>
                {scanner}
                {closeScanner}
            </div>


            <div className={'toast'}>
                <ToastContainer

                    position="bottom-right"
                    autoClose={4000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover

                    bodyClassName="toastBody"
                />
            </div>

        </div>

    );
}

