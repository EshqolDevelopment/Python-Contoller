import './Home.css';
import {useEffect, useState} from "react";
import {sha256} from "js-sha256";
import {write, ref, db, onValue} from './firebase'
import AceEditor from "react-ace";
import 'brace/mode/python';
import 'brace/theme/monokai';
import 'brace/theme/github';
import 'brace/theme/xcode';
import "ace-builds/src-noconflict/ext-language_tools";


const CryptoJS = require("crypto-js");

export default function Home() {


    const code = localStorage.getItem("code")
    const [value, setValue] = useState("")
    const salt = "sigma"
    const [sha, setSha] = useState("")
    const [output, setOutput] = useState("")

    useEffect(() => {
        const hash = sha256.create();
        hash.update(code);
        setSha(hash.hex());
        readOutput()
    }, [code])


    function encrypt(message, key){
        console.log(key)
        message += salt
        key = CryptoJS.enc.Utf8.parse(key);
        const iv = CryptoJS.enc.Utf8.parse('BBBBBBBBBBBBBBBB')
        return CryptoJS.AES.encrypt(message, key, { iv: iv, mode: CryptoJS.mode.CBC}).toString();
    }


    function send(){
        const encryptedText = encrypt(value, code)
        write(sha, encryptedText)
        console.log(sha)
    }


    function readOutput(){
        const out = ref(db, "Root/" + sha + "-output")
        onValue(out, (e) => {
            setOutput(e.val())
        })
    }

    function terminate(){
        const encryptedText = encrypt("exit()", code)
        write(sha, encryptedText)
    }


    return (
        <div className={"App"}>
            <div className="area">
                <ul className="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>

            </div>


            <div className={"send"}>
                <button className="button-27" onClick={send}>Send commands</button>
                <button className={"button-27"} id={"a"} onClick={terminate}>Terminate pc program</button>
                <h3 style={{color: "white"}}>{output}</h3>
            </div>




            <AceEditor
                placeholder="Write here any script to send your computer"
                mode="python"
                theme="xcode"
                className={'editor'}
                onChange={(x) => {
                    setValue(x)
                }}
                fontSize={17}
                showPrintMargin={true}
                showGutter={true}
                highlightActiveLine={true}
                value={value}
                setOptions={{
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                    enableSnippets: false,
                    showLineNumbers: true,
                    tabSize: 2,
                }}
                style={{height: '65vh', width: '38vw'}}/>




        </div>
    )
}
