import { useContext } from 'react';
import { Context } from '../../ContextStore';
import { Navbar, NavDropdown, Nav, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { BsFillPersonFill, BsFillEnvelopeFill, BsFillPlusCircleFill } from 'react-icons/bs';
import { IoLogOut } from 'react-icons/io5'
// import LOGO from './MPLOGO.png'
import LOGO from './NEWLOGO.jpeg'
import chatGPTIcon from './chatgpt.png';

import './Header.css'
function Header() {
    const { userData, setUserData } = useContext(Context)

    return (
        <Navbar className="color-nav" variant="light">
            <div className="container">
                <Navbar.Brand>
                    {/* <NavLink className="navbar-brand" to="/">Inventory Marketplace</NavLink> */}
                    <NavLink className="navbar-brand" to="/">
                        <img className="logo-config" src={LOGO} alt="user-avatar"/>
                    </NavLink>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        {/* <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link> */}
                    </Nav>
                    {userData ?
                        (<Nav>
                            <NavLink className="add-item" id="addButton" to="/add-product">
                                <OverlayTrigger key="bottom" placement="bottom"
                                    overlay={
                                        <Tooltip id={`tooltip-bottom`}>
                                            <strong>Add</strong>  a sell.
                                        </Tooltip>
                                    }
                                > 
                                    <BsFillPlusCircleFill />
                                </OverlayTrigger>
                            </NavLink>

                            {/* <NavDropdown title={<img id="navImg" src={userData.avatar} alt="user-avatar"/>} drop="left" id="collasible-nav-dropdown"> */}
                            {/* <img id="navImg" src={userData.avatar} alt="user-avatar"/> */}
                                <NavLink className="dropdown-item" to={`/profile/${userData._id}`}>
                                    <div className="usernamecover">
                                        <div className="username">
                                            <img id="navImg" src={userData.avatar} alt="user-avatar"/> {userData.name} 
                                        </div>
                                    </div>
                                    {/* <BsFillPersonFill />Profile */}
                                </NavLink>
                                <NavLink className="dropdown-item" to="/messages">
                                    <div className='messages'>
                                        <div className='message'>
                                            <BsFillEnvelopeFill className="msg-icon" />Messages
                                        </div>
                                    </div>
                                </NavLink>
                                <NavLink className="dropdown-item chat-gpt-link" to="/chat-gpt">
                                  <div className='chatgpt-icon-wrapper'>
                                    <div className='chatgpt-icon'>
                                      <img src={chatGPTIcon} alt="ChatGPT Icon" />RecipeGPT
                                    </div>
                                  </div>
                                </NavLink>

                                <NavLink className="dropdown-item" id="logoutButton" to="/auth/logout" onClick={() => {setUserData(null)}}>
                                    <div className="logout">
                                        <IoLogOut />Log out
                                    </div>
                                </NavLink>
                            {/* </NavDropdown> */}
                        </Nav>)
                        :
                        (<Nav>
                            <NavLink className="nav-item cnts-btn" id="nav-sign-in" to="/auth/login">
                                Sign In
                            </NavLink>
                            <NavLink className="nav-item cnts-btn" id="nav-sign-up" to="/auth/register">
                                Sign Up
                            </NavLink>
                        </Nav>)
                    }
                </Navbar.Collapse>
            </div>
        </Navbar>
    )
}

export default Header;