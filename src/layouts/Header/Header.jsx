import { __ } from "@wordpress/i18n";
import { useState } from 'react';
import { Button, Nav, Navbar, NavDropdown, Offcanvas } from 'react-bootstrap';
import { Link, NavLink } from "react-router-dom";
import logo from '../../assets/images/logo.svg';
import Details from '../../data/details.json';
export default function Header() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [expanded, setExpanded] = useState(false);

    const handleNavClick = () => {
      setExpanded(false); // Close menu on link click
    };
    return (
        <>
            {/* <div className="top-bar bd-gray-800 text-white py-2">
                <div className="text-center">{__( `Unlock ${Details?.name}'s Full Potential!Get exclusive features and unbeatable performance.Upgrade now`, "plugin-starter" )}</div>
            </div> */}

            <Navbar expanded={expanded} onToggle={setExpanded} bg="light" variant="light" expand="lg" className="bg-white border-bottom sticky-top">
                <div className="container-fluid">
                    <Navbar.Brand href="#/" className="p-0">
                        <div className="d-flex align-items-center gap-2">
                            <img src={logo} alt="" />
                            <span>{Details?.name}</span>
                        </div>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="navbar-nav me-auto mb-2 mb-lg-0">
                            <Nav.Link as={NavLink} to="/" end onClick={handleNavClick}>
                                Home
                            </Nav.Link>
                            <Nav.Link as={NavLink} to="/settings" onClick={handleNavClick}>
                                Settings
                            </Nav.Link>
                            <div className="d-block d-lg-none">
                            <NavDropdown title="Settings">
                                <li><Link to="/settings/basic" className="dropdown-item" onClick={handleNavClick}>Basic</Link></li>
                                <li><Link to="/settings/advanced" className="dropdown-item" onClick={handleNavClick}>Advanced</Link></li>
                                <li><hr className="dropdown-divider"/></li>
                                <li><a className="dropdown-item" href="#">Something else here</a></li>
                            </NavDropdown>
                            </div>
                            <li className="nav-item">
                                <Link to="/page" className="nav-link">Contact</Link>
                            </li>

                            <NavDropdown title="More">
                                <Nav.Link as={NavLink} to="/" end onClick={handleNavClick}>
                                    Home
                                </Nav.Link>
                                <Nav.Link as={NavLink} to="/settings" onClick={handleNavClick}>
                                    Settings
                                </Nav.Link>
                            </NavDropdown>
                            <li className="nav-item">
                            <a className="nav-link disabled" aria-disabled="true">Disabled</a>
                            </li>
                        </Nav>
                        {/* <Nav className="navbar-nav-left navbar-nav me-auto mb-2 mb-lg-0">
                            <Nav.Link as={NavLink} to="/" end onClick={handleNavClick}>
                                {__( 'Home', "plugin-starter" )}
                            </Nav.Link>
                            <Nav.Link as={NavLink} to="/explore" end onClick={handleNavClick}>
                                {__( 'Explore', "plugin-starter" )}
                            </Nav.Link>
                            <Nav.Link as={NavLink} to="/settings" onClick={handleNavClick}>
                                {__( 'Settings', "plugin-starter" )}
                            </Nav.Link>
                            <div className="d-block d-lg-none">
                            <NavDropdown title="Settings">
                                <li><Link to="/settings/buy_together" className="dropdown-item" onClick={handleNavClick}>{__( 'Buy Together', "plugin-starter" )}</Link></li>
                                <li><Link to="/settings/product_addons" className="dropdown-item" onClick={handleNavClick}>{__( 'Product Addons', "plugin-starter" )}</Link></li>
                                <li><Link to="/settings/product_badge" className="dropdown-item" onClick={handleNavClick}>{__( 'Product Badge', "plugin-starter" )}</Link></li>
                            </NavDropdown>
                            </div>
                        </Nav> */}
                        <Nav className="mavbar-nav-right navbar-nav mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link disabled" aria-disabled="true">{Details?.version} {__( 'Core', "plugin-starter" )}</a>
                            </li>
                            <li className="nav-item">
                                <a href="https://wordpress.org/support/plugin/plugin-starter/" target="_blank" className="nav-link" title={__( 'Documentation', "plugin-starter" )}><span class="dashicons dashicons-editor-help d-none d-lg-inline"></span><span className="d-lg-none">{__( 'Documentation', "plugin-starter" )}</span></a>
                            </li>
                            <li className="nav-item">
                                <a href="https://wordpress.org/support/plugin/plugin-starter/reviews/#new-post"  target="_blank" className="nav-link" title={__( 'Knowledge Base', "plugin-starter" )}><span class="dashicons dashicons-book d-none d-lg-inline"></span><span className="d-lg-none">{__( 'Knowledge Base', "plugin-starter" )}</span></a>
                            </li>
                            <li className="nav-item" onClick={handleShow}>
                                <a className="nav-link" title={__( 'What\'s New', "plugin-starter" )}><span class="dashicons dashicons-megaphone d-none d-lg-inline"></span><span className="d-lg-none">{__( 'What\'s New', "plugin-starter" )}</span></a>
                            </li>
                            {/* <NavDropdown 
                                title={
                                    <span>
                                    <i className="dashicons dashicons-admin-users d-none d-lg-inline"></i>
                                    <span className="d-lg-none">Account</span>
                                    </span>
                                } 
                                
                                align="end"
                            >
                                <li><a className="dropdown-item" href="#">License Status <span>Inactive</span></a></li>
                                <li><a className="dropdown-item" href="#">Manage Plan</a></li>
                            </NavDropdown> */}
                        </Nav>
                        
                    </Navbar.Collapse>
                </div>
            </Navbar>

            <Offcanvas show={show} onHide={handleClose} placement="end">
                <Offcanvas.Header closeButton>
                <Offcanvas.Title>{__( 'What\'s New', "plugin-starter" )}</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                <p>{__( 'Loading...', "plugin-starter" )}</p>
                <Button variant="outline-secondary" onClick={handleClose}>
                    {__( 'Close', "plugin-starter" )}
                </Button>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}
