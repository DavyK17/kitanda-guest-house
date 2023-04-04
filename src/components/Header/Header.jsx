import { NavLink } from "react-router-dom";
import logo from "../../assets/img/logos/logo.png";

const Header = props => {
    const { activeClassName } = props;

    const iconMenu = (
        <svg width="24" height="24" viewBox="0 0 24 24">
            <path d="M24 6h-24v-4h24v4zm0 4h-24v4h24v-4zm0 8h-24v4h24v-4z" />
        </svg>
    )

    const toggleMenu = e => {
        e.preventDefault();
        const nav = document.querySelector("header nav");
        nav.classList.toggle("open");
    }

    const setActive = isActive => isActive ? activeClassName : null;

    return (
        <header>
            <img src={logo} width="200px" alt="Logo" />
            <nav className="font-head-2">
                <button onClick={toggleMenu}>{iconMenu}</button>
                <ul>
                    <li>
                        <NavLink className={({ isActive }) => setActive(isActive)} to="/">Home</NavLink>
                    </li>
                    <li>
                        <NavLink className={({ isActive }) => setActive(isActive)} to="/gallery">Gallery</NavLink>
                    </li>
                    <li>
                        <NavLink className={({ isActive }) => setActive(isActive)} to="/booking">Booking</NavLink>
                    </li>
                    <li>
                        <NavLink className={({ isActive }) => setActive(isActive)} to="/contact">Contact</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;