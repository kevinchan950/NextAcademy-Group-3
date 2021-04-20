import React from 'react'
import Modal from './Modal'

const NavBar = () => {
    
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-dark sticky-top">
                <a className="navbar-brand text-orange font-weight-bold" href="/" style={{fontSize:"2rem"}}>Provision</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link text-orange font-weight-bold" href="#Top">Home <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item active">
                            <a className="nav-link text-orange font-weight-bold" href="#AboutUs">About Us</a>
                        </li>
                        <li className="nav-item active">
                            <a className="nav-link text-orange font-weight-bold" href="#ContactUs">Contact Us</a>
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