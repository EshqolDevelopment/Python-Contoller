import './Home.css';
import {useState} from "react";

export default function Home() {

    const [code, setCode] = useState(localStorage.getItem("code"))

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

            <textarea placeholder={"Write your python script here"} className={"editor"}/>

            <button className={"send"}>Send commands</button>

        </div>
    )
}
