import React from "react";
import Topbar from "./topbar";
import '../css/about.css'
import { isMobile } from 'react-device-detect';




export default function About() {

    let desc

    if (!isMobile) desc = <h2 className={"description"}>

            Welcome to python controller! the tool that enables you to send<br/>
            python commands and scripts to your private computer, from anywhere around the globe.<br/>
            for installing the computer app use the button below for installing in Microsoft Store<br/>
            <br/>
            Features:
            <br/>
            <br/><span className={'des'}>
            - Simpy enter your secret code at the <span className={'link'} onClick={() => goTo('connect')}>
            Connect</span> page for quick connection.<br/>
            <br/>
            - Real time end to end encryption to make sure no one else can get access to your private computer.<br/>
            <br/>
            - Over 20 useful functions we have made to improve your experience, <br/>you can read about them in the
            <span className={'link'} onClick={() => goTo('documentation')}> Documents.</span><br/>
            <br/>
            - Fetch every file from your computer with a simple function<br/>
            <br/>
            - No need for login! just download the app to your target computer from Microsoft Store.<br/>
            <br/>
            - Need help? Contact us at <a href="mailto:support@eshqol.com">support@eshqol.com</a>
            </span></h2>


    else desc = <h2 className={"description"}>
            Welcome to python controller! the tool that enables you to send
            python commands and scripts to your private computer,<br/>
            For installation, download the app from Microsoft Store in your Windows computer.
            <br/><br/>
            Features:
            <br/>
            <br/><span className={'des'}>
            - Simpy enter your secret code at the <span className={'link'} onClick={() => goTo('connect')}>
            Connect</span> page for quick connection.<br/>
            <br/>
            - Real time end to end encryption to make sure no one else can get access to your private computer.<br/>
            <br/>
            - Over 20 useful functions we have made to improve your experience, <br/>you can read about them in the
            <span className={'link'} onClick={() => goTo('documentation')}> Documents.</span><br/>
            <br/>
            - Fetch every file from your computer with a simple function<br/>
            <br/>
            - No need for login! just download the app to your target computer from <span className={'link'}>Microsoft Store.</span><br/>
            <br/>
            - Need help? Contact us at <a href="mailto:support@eshqol.com">support@eshqol.com</a>
            </span></h2>


    const goTo = (page) => window.location.href = window.location.origin + '/' + page

    document.body.style.overflow = "hidden"

    return (

        <body>

            <div className={'css-selector'}>

                <Topbar page={'Home'}/>

                <div className={'about'}>

                    <h1 className={'title2'}>Python Controller - Fast & Secured</h1>

                    {desc}

                    <img src={"https://getbadgecdn.azureedge.net/images/English_L.png"}
                         alt={"Get From microsoft store"} className={"install1"}/>

                    <button className={"button-3"} id={"d"} onClick={() => goTo('documentation')}>See Documentation</button>

                </div>

            </div>
        </body>

    )
}