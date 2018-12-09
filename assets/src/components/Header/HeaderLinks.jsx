import React, { Component } from "react";
import { NavItem, Nav, NavDropdown, MenuItem } from "react-bootstrap";

class HeaderLinks extends Component {
    render() {
        const notification = (
            <div>
                <i className="glyphicon glyphicon-bell" />
                <b className="caret" />
                {/*<span className="notification">0</span>*/}
                <p className="hidden-lg hidden-md">Notification</p>
            </div>
        );
        return (
            <div>
                <Nav pullRight>
                    <NavItem eventKey={3} href="#">
                        <i className="glyphicon glyphicon-search" />
                        <p className="hidden-lg hidden-md">Search</p>
                    </NavItem>
                    <NavDropdown
                        eventKey={2}
                        title={notification}
                        noCaret
                        id="basic-nav-dropdown"
                    >
                        <MenuItem eventKey={2.1}>No Notifications</MenuItem>
                    </NavDropdown>
                </Nav>

            </div>
        );
    }
}

export default HeaderLinks;
