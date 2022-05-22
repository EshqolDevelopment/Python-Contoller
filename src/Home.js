import './Home.css';
import {useEffect, useRef, useState} from "react";
import {sha256} from "js-sha256";
import {write, ref, db, onValue} from './firebase'
import AceEditor from "react-ace";
import 'brace/mode/python';
import 'brace/theme/monokai';
import 'brace/theme/github';
import 'brace/theme/xcode';
import 'brace/theme/terminal';
import 'brace/theme/tomorrow';
import 'brace/theme/chrome';
import 'brace/theme/dracula';
import "ace-builds/src-noconflict/ext-language_tools";


const run = []
const CryptoJS = require("crypto-js");

export default function Home() {

    const codes = localStorage.getItem("code")
    const names = localStorage.getItem("names")

    const map = {}
    for (let nm of names.split("*")){
        const [code, name] = nm.split("@")
        map[code] = name
    }


    const [value, setValue] = useState("")
    const salt = "sigma"
    const [output, setOutput] = useState("")
    const [theme, setTheme] = useState("xcode")
    const [back] = useState(`rgba(${rnd(40)}, ${rnd(80)}, ${rnd(190)}, 1)`)
    const [htmlSelect, setHtmlSelect] = useState([])
    const currentCode = useRef("")
    const [sha, setSha] = useState(null)

    function rnd(a) {
        return (Math.floor(Math.random() * 24) - 10) + a
    }

    useEffect(() => {
        console.log(currentCode)
        if (currentCode.current){
            const hash = sha256.create();
            hash.update(currentCode.current);
            setSha(hash.hex());
        }

    }, [currentCode])


    function downloadFile(data, name){
        if (!run.includes(name)){
            run.push(name)
            save(name, data)
        }
    }


    function save(filename, data) {
        const blob = new Blob([data], {type: '*/*'});
        if(window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveBlob(blob, filename);
        }
        else{
            const elem = window.document.createElement('a');
            elem.href = window.URL.createObjectURL(blob);
            elem.download = filename;
            document.body.appendChild(elem);
            elem.click();
            document.body.removeChild(elem);
        }
    }


    useEffect(() => {

        const val = localStorage.getItem("python")
        if (val)
            setValue(localStorage.getItem("python"))
        else setValue("\n\nprint('Hello World!')")

        localStorage.setItem("isRunning", "true")
        if (codes == null){
            window.location = window.location.origin + "/connect";
        }
        else{
            const temp = []
            for (let c of codes.split("@")){
                if (map[c]){
                    console.log(c)
                    temp.push(<option value={c}>{map[c]}</option>)
                }
            }
            setHtmlSelect(temp)
        }

    }, [])


    useEffect(() => {
        readOutput()
    })


    function goConnect(){
        window.location = window.location.origin + "/connect";
    }


    function encrypt(message, key){
        message += salt
        key = CryptoJS.enc.Utf8.parse(key);
        const iv = CryptoJS.enc.Utf8.parse('BBBBBBBBBBBBBBBB')
        return CryptoJS.AES.encrypt(message, key, { iv: iv, mode: CryptoJS.mode.CBC}).toString();
    }


    function decrypt(encrypted, key){
        const iv = CryptoJS.enc.Utf8.parse('BBBBBBBBBBBBBBBB');
        key = CryptoJS.enc.Utf8.parse(key);
        let decrypted =  CryptoJS.AES.decrypt(encrypted, key, { iv: iv, mode: CryptoJS.mode.CBC});
        decrypted = decrypted.toString(CryptoJS.enc.Utf8);
        return decrypted
    }



    function changeTheme(){
        setTheme(document.getElementById("slct").value)
    }


    function send(){
        if (value.replaceAll(" ", "").includes("is_running()")){
            setTimeout(() => {

                if (localStorage.getItem("isRunning") !== "True")
                    localStorage.setItem("isRunning", "false")

                console.log(localStorage.getItem("isRunning"))
            }, 2000)
        }
        const encryptedText = encrypt(value, currentCode.current)

        write(sha, encryptedText)
    }


    function base64ToArrayBuffer(base64) {
        const binary_string = window.atob(base64);
        const len = binary_string.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            bytes[i] = binary_string.charCodeAt(i);
        }
        return bytes.buffer;
    }


    function readOutput(){
        const out = ref(db, "Root/" + sha + "-output")
        let temp1 = ""
        onValue(out, (e) => {
            let output = e.val()
            let string = output
            if(output === null) return

            output = decrypt(output, currentCode.current)

            if (output.slice(output.length-5, output.length) === 'sigma') {
                console.log(output.slice(0, output.length - 6))
                output = output.slice(0, output.length - 6)
                string = output
            }
            else{
                console.log(output.slice(output.length-5))
                return;
            }


            if (output.includes("True")) localStorage.setItem("isRunning", "True")

            if (output.includes("@@@")){
                const lst = output.split("@@@").filter(e => e.includes("autotasks123"))
                const temp = lst.map(it => it.split("autotasks123"))

                for (let b64 of temp){
                    const [data, name] = b64
                    string = string.replace(data, "").replace(name, "")

                    const arr = base64ToArrayBuffer(data)
                    if ( temp1 !== name){
                        temp1 = name
                        downloadFile(arr, name)
                    }

                }
                setOutput("Download was successful!")
            }

            else setOutput(string.replaceAll("@@@", ""))

        })
    }


    function onSelectCode(e){
        localStorage.setItem("default_comp", e.target.value)
        currentCode.current = (e.target.value)
    }

    function getItem(key, def) {
        const curr  = localStorage.getItem(key)
        currentCode.current = (curr || def)
        return curr || def
    }


    return (
        <div className={"App"}>

            <h1 className={"title1"}>Python Controller - Fast and Secure</h1>

            <div className="area" style={{backgroundColor: back}}>
                <ul className="circles">
                    <li/>
                    <li/>
                    <li/>
                    <li/>
                    <li/>
                    <li/>
                    <li/>
                    <li/>
                    <li/>
                </ul>

            </div>


            <div className={"content1"}>
                <div className={"send"}>
                    <button className="button-27" id={"send-btn"} onClick={send}>Send commands</button>

                </div>

                <div className={"themes"}>
                    <label className="select" htmlFor="slct"><select defaultValue={"xcode"} onChange={changeTheme} id="slct" required="required">
                        <option value disabled="disabled" >Select option</option>
                        <option value="xcode">xcode</option>
                        <option value="chrome">chrome</option>
                        <option value="github">github</option>
                        <option value="tomorrow">tomorrow</option>
                        <option value="terminal">terminal</option>
                        <option value="dracula">dracula</option>
                        <option value="monokai">monokai</option>
                    </select><svg>
                        <use xlinkHref="#select-arrow-down" />
                    </svg></label>{/* SVG Sprites*/}<svg className="sprites">
                    <symbol id="select-arrow-down" viewBox="0 0 10 6">
                        <polyline points="1 1 5 5 9 1" />
                    </symbol>
                </svg>
                </div>

                <h3 className={"output"}>Output: <br/><br/>{output}</h3>


                <AceEditor
                    placeholder="Write here any script to send your computer"
                    mode="python"
                    theme={theme}
                    className={'editor'}
                    onChange={(x) => {
                        localStorage.setItem("python", x)
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




                <h3 className={"description"}>Welcome to python controller the tool that enables you to send python commands and scripts to your private computer from anywhere around the globe. for installing the computer app use the button bellow for installing in microsoft store</h3>

                <img src={"https://getbadgecdn.azureedge.net/images/English_L.png"} alt={"Get From microsoft store"} className={"install"}/>


                <button className={"button-80"} id={"docs-button"} onClick={() => {
                    window.location.replace(window.location.origin + "/docs")

                }}>See Documentation</button>

                <button className={'button-28'} id={"go-connect"} onClick={goConnect}>Connect Page</button>

                <select className="codes-list" onChange={onSelectCode} value={getItem("default_comp")}>
                    <option  disabled selected>Select Computer</option>
                    {htmlSelect}
                </select>


            </div>
        </div>
    )
}
