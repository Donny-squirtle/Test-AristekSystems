import React from "react";
import './Header.scss';
import Logo from '../../img/main-logo.svg';
function Header() {
    return (
        <header className="page-header">
            <div className="page-header__logo"><Logo/></div>
            <div className="page-header__text">Tasks</div>
            <div className="page-header__user header-user">
                <p className="header-user__name">Leanne Graham</p>
                <div className="header-user__icon"></div>
                <div className="header-user__button"></div>
            </div>
        </header>
    )
}

export default Header;