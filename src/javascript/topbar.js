import React, {useEffect, useState} from 'react';
import '../css/topbar.css'
import {isMobile} from "react-device-detect";
import '../css/hamburger.css'



const pages = ['Home', 'Controller', 'Connect', 'Documentation']

function go(page) {
    window.location.replace(window.location.origin + '/' + page.toLowerCase())
}


export default function Topbar(props) {

    const [topbar, setTopBar] = useState(<div></div>)


    function toggleButton() {
        try {
            const input = document.getElementById("menu__toggle");
            input.checked = !input.checked;
        } catch (e) {}
    }




    useEffect(() => {
        if (!isMobile) {
            setTopBar(
            <div>
                <img src={require('../images/eshqol.jpeg')} className={'logo'} alt={'Eshqol'}/>

                <h3 className={"title1"}>Python Controller</h3>

                <div className={'top'}>
                    {pages.map((page) =>
                        <div className={`page ${page === props.page}`} key={page} onClick={() => go(page)}>
                            <h3 >{page}</h3>
                        </div>
                    )}
                </div>
            </div>
            )
        } else{

            setTopBar(
                <div className={"inner-nav-bar"}>
                    <img className={"logo1"} src={require("../images/eshqol.png")} alt={"sharpies logo"}/>

                    <div className={"checkbox-hamb"} onClick={toggleButton}/>

                    <div className="hamburger-menu">

                        <input id="menu__toggle" type="checkbox"/>
                        <label className="menu__btn" htmlFor="menu__toggle" >
                            <span/>
                        </label>

                        <ul className="menu__box" >
                            {pages.map((page) =>
                                <li><a className={`menu__item color-${props.page === page}`} rel={"noreferrer"} href={"/" + page.toLowerCase()}>{page}</a></li>
                            )}
                        </ul>
                    </div>


                </div>

        )



        }

    }, [props.page])

    return (
        <div className={'top-container'}>
            {topbar}
        </div>
    );
}


