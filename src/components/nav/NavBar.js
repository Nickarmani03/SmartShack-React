import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"

export const NavBar = (props) => {
    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/">SmartShack</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/devices">Devices</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/members">Family Members</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/rooms">Rooms</Link>
            </li>
            {/* <li className="navbar__item">
                <Link className="navbar__link" to="/employees">Employees</Link>
            </li> */}
            <li className="navbar__item">
                <Link className="navbar__link" to="/login"
                    onClick={ //allows the user to logout by removing the current user from the local storage
                        (event) => {
                            localStorage.removeItem("smartshack_member")
                        }
                    }
                >Logout</Link>
            </li>
        </ul>
    )
}