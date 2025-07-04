import React from 'react'
import { Link } from 'react-router-dom'
import { useAuthContext } from "../Context/AuthContext";

const NavBar = () => {
    const { isLogin, logout } = useAuthContext();

    return (
        <div>
            <nav>

                {
                    isLogin ?
                        <ul>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/login" onClick={() => logout()} >Logout</Link>
                            </li>
                        </ul>
                        :
                        <ul>
                        </ul>
                }
            </nav>
        </div >
    )
}

export default NavBar