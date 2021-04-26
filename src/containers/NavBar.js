import React from 'react'
import Modal from './Modal'

const NavBar = () => {
    
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-theme sticky-top">
                <a className="navbar-brand text-orange font-weight-normal" href="/" style={{fontSize:"2rem"}}><img src="https://media.discordapp.net/attachments/831720701038821416/835103015114375168/a7ac249227464b9fbb58433eadb931bd.png" style={{height:"6vh"}}/>Provision</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link text-orange font-weight-normal" href="/#home">Home</a>
                        </li>
                        <li className="nav-item active">
                            <a className="nav-link text-orange font-weight-normal" href="/#aboutus">About Us</a>
                        </li>
                        <li className="nav-item active">
                            <a className="nav-link text-orange font-weight-normal" href="/#contactus">Contact Us</a>
                        </li>
                        <div className="position">
                            <Modal />
                        </div>
                    </ul>
                </div>
            </nav>
        </>
    );
};

export default NavBar;