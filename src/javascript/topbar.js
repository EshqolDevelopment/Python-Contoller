import React from 'react';
import '../css/topbar.css'


const pages = ['Home', 'Controller', 'Connect', 'Documentation']

function go(page) {
    window.location.replace(window.location.origin + '/' + page.toLowerCase())
}


export default function Topbar(props) {

    return (
        <div className={'top-container'}>

            <img src={require('../images/eshqol.jpeg')} className={'logo'} alt={'Eshqol'}/>

            <h3 className={"title1"}>Python Controller - Fast & Secure</h3>

            <div className={'top'}>
                {pages.map((page) =>
                    <div className={`page ${page === props.page}`} key={page} onClick={() => go(page)}>
                        <h3 >{page}</h3>
                    </div>
                )}
            </div>

        </div>
    );
}


