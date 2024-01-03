import { NavLink } from "react-router-dom";

export function Menu() {
    return (
        <menu>
            <NavLink to={'/'}>Principal</NavLink>
            <NavLink to={'/get'}>GET</NavLink>
            <NavLink to={'/post'}>POST</NavLink>
        </menu>

    )
}