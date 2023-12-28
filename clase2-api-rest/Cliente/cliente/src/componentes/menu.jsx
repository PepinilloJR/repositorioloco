import { NavLink } from "react-router-dom";

function Menu() {
    return (
        <menu>
            <NavLink to='/'> Principal </NavLink>
            <NavLink to='/videos'> Videos </NavLink>
            <NavLink to='/imagenes'> Imagenes </NavLink>
        </menu>

    )
}

export default Menu