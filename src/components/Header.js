import React, { Component } from 'react'

export default class Header extends Component {
    render() {
        const loginButton = (
            <li>
                <a>
                    <i className="material-icons">vpn_key</i>
                </a>
            </li>
        );

        const logoutButton = (
            <li>
                <a>
                    <i className="material-icons">lock_open</i>
                </a>
            </li>
        );


        return (
            <div>
                <nav>
                    <div className="nav-wrapper blue darken-1">
                        <a className="brand-logo center">MEMOPAD</a>

                        <ul>
                            <li><a><i className="material-icons">search</i></a></li>
                        </ul>

                        <div className="right">
                            <ul>
                                { this.props.isLoggedIn ? logoutButton : loginButton }
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}

Header.defaultProps = {
    isLoggedIn: false,
    onLogout: () => {
        console.error("logout function not defined");
    }
};