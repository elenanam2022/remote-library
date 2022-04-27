import React, {useEffect} from 'react';
import Logo from '../Images/Icons/logo.png'
import Menu from '../Images/Icons/menu.png'
import Notification from '../Images/Icons/notification.png'
import Login from '../Images/Icons/login.png'
import Theme from '../Images/Icons/theme.png'
import { Link } from "react-router-dom";
import {strings} from '../localization.js'

function Header(){
    const [menuState, setMenuState] = React.useState(false);
    const [lng, setLng] = React.useState("")
    function changeLng(){
        if (strings.getLanguage() === "ru"){
            localStorage.setItem("lng", "kg")
            strings.setLanguage("kg")
            setLng("КЫРГ")
            window.location.reload(false)
        }else if (strings.getLanguage()==="kg"){
            localStorage.setItem("lng", "en")
            strings.setLanguage("en")
            setLng("EN")
            window.location.reload(false)
        }else if (strings.getLanguage()==="en"){
            localStorage.setItem("lng", "ru")
            strings.setLanguage("ru")
            setLng("РУС")
            window.location.reload(false)
        }
    }
    useEffect(()=>{
        let lgn_dict = {"en": "EN", "ru": "РУС", "kg": "КЫРГ"}
        if (localStorage.getItem("lng") !== null){
            strings.setLanguage(localStorage.getItem("lng"))
            setLng(lgn_dict[localStorage.getItem("lng")])
        }
        else if (strings.getLanguage() === "ru"){
            setLng("РУС")
        }else if(strings.getLanguage() === "kg"){
            setLng("КЫРГ")
        }else if(strings.getLanguage() === "en"){
            setLng("EN")
        }
    }, [])

 
    return(
        <React.Fragment>
            {menuState &&(
                <div>
                <div className="menu-items">
                    <Link to="/book-directory" onClick={()=>setMenuState(false)} replace={true}>
                    <h1 className="menu-item">{strings.booksText}</h1>
                    </Link>
                    <hr/>
                    <Link to="/video-directory" onClick={()=>setMenuState(false)} replace={true}>
                    <h1 className="menu-item">{strings.videoText}</h1>
                    </Link>
                    <hr/>
                    <Link to="/gov-directory" onClick={()=>setMenuState(false)} replace={true}>
                    <h1 className="menu-item">{strings.newsText}</h1>
                    </Link>
                </div>
                <div onClick={()=>setMenuState(!menuState)} className="light-cover"></div>
                </div>
            )}
        <div className = "header-wrapper">
            <div className="grid">
            <Link to="/">
            <div className="item">
                <img className="logo_img" src={Logo} alt="Logo"></img>
                </div>
                </Link>
                <div className="item">
                <Link to="/">  
                <h1 className="logo">BilimHub</h1>
                </Link>
                </div>
                <div className="item">
                <div className="header-input-web">
                    <form>
                        <input type="text" name="search-box" placeholder={strings.searchPlaceholder}/>
                    </form>
                </div>
                </div>
                <div className="item">
                <img className="notification_img" src={Notification} alt="notification"></img>
                </div>
                <div className="item">
                <img className="login" src={Login} alt="login"></img>
                </div>
                <div className="item">
                <img className="theme" src={Theme} alt="theme"></img>
                </div>
                <div className="item">
                <h3 onClick={changeLng} className='language_change'>{lng}</h3>
                </div>
                <div className="item" onClick={()=>setMenuState(!menuState)}>
                <img className="menu_img" src={Menu} alt="menu"></img>
                </div>
                
            </div>
            <div className="header-input-phone"> 
                <form>
                    <input type="text" name="search-box" placeholder={strings.searchPlaceholder}/>
                </form>
            </div>
            
        </div>
        </React.Fragment>
    )}

export default Header;