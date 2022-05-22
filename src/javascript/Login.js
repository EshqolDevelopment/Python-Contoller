import { useEffect, useState } from "react";
import { QrReader } from 'react-qr-reader';
import qr from '../images/qr.png';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { db, get, ref } from "./firebase";
import { sha256 } from "js-sha256";
import addIcon from '../images/add_icon.png'


const results = []

export default function Login() {

    const [text, setText] = useState("")
    const [data, setData] = useState("");

    const [scanner, setScanner] = useState(<div/>)
    const [closeScanner, setCloseScanner] = useState(<div/>)

    const [codes, setCodes] = useState([])
    const [codesNumbers, setCodesNumbers] = useState([])
    const [remove, setRemove] = useState("")
    const [mapName, setMapName] = useState( (localStorage.getItem("names") || "").split("*"))



    useEffect(() => {
        if (!results.includes(data)){
            setText(data)
            results.push(data)
        }
        close()
    }, [data])


    useEffect(() => {
        if (remove){
            removeCode(remove, codes)
        }

    }, [remove])


    useEffect(() => {
        const oldCodes = localStorage.getItem("code")

        if (oldCodes != null){
            const allCodesList = oldCodes.split("@")
            for (let c of allCodesList){
                console.log(c)
                addCode1(c)
            }
        }

    }, [])



    function addCode1(text1){
        const temp = codes.slice()
        temp.push(<div id={text1} className={"one-code"}>
            <p style={{color: "white", }}>{shortenText(text1)}</p>
            <img style={{width: "25px", height: "25px", cursor: "pointer"}} src={require("../images/delete.png")} key={Math.random()} onClick={() => {setRemove(text1)}} alt={'delete'}/>
        </div> )
        setCodes(temp)

        let temp1 = codesNumbers.slice()
        temp1.push(text1)
        setCodesNumbers(temp1)
        setText("")

    }




    async function connect(){
        if (codesNumbers.length > 0){
            localStorage.setItem("code", codesNumbers.join("@"));
            localStorage.setItem("names", mapName.join("*"));

            window.location = window.location.origin + "/home";
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

    function shortenText(text1){
        const map = {}
        for (let nm of mapName){
            const [code, name] = nm.split("@")
            map[code] = name
        }

        return map[text1]
        // return "..." + text1.slice(text1.length-5)
    }

    async function addCode() {

        const hash = sha256.create();
        hash.update(text);

        if (text.length === 16){

            if (!document.getElementById("comp-name").value) return

            await get(ref(db, "Root/" + hash.hex())).then((e) => {
                if (e.val() !== null){
                    const compName = document.getElementById("comp-name").value
                    document.getElementById("comp-name").value = ""
                    const temp = mapName
                    temp.push(`${text}@${compName}`)
                    setMapName(temp)

                   addCode1(text)
                }

                else toast.error("The code is invalid")

            })
        }
        else toast.error("The code is invalid")


    }

    function removeCode(text1, codes1){
        let temp = []
        for (let code of codes1){
            if (code["props"]["id"] !== text1){
                temp.push(code)
            }
        }
        setCodes(temp)

        let temp1 = []
        for (let number in codesNumbers){
            if (number !== text1){
                temp1.push(number)
            }
        }
        setCodesNumbers(temp1)

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

                <div className={'add'}>
                    <input id={"input"} className={"input"} type={"text"} placeholder={"Connect Code"} value={text} onChange={e => setText(e.target.value)}/>
                    <input className={"comp-name"} id={"comp-name"} placeholder={"Computer nickname"}/>
                    <img src={addIcon} className={"add-icon"} onClick={addCode} alt={'Add'}/>

                    <button id={'connect1'} className={"button-19"} onClick={connect}>Connect</button>
                </div>



            </div>

            <div className={"codes-div"}>
                {codes}
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

