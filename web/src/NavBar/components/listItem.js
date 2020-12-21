import React from 'react';
import { Link, NavLink } from 'react-router-dom'




const _logout = () => {
    localStorage.clear()
}

export const mainListItems = (
        <div>
            {

            }
            <Link
                to='/login'
                onClick={_logout}>
                <svg id="icon-switch" viewBox="0 0 32 32">
                    <path d="M18.25 16.576v2.39c0.636 0.278 1.222 0.675 1.727 1.181 1.062 1.062 1.648 2.475 1.648 3.978s-0.585 2.915-1.648 3.978c-1.062 1.062-2.475 1.648-3.978 1.648s-2.915-0.585-3.978-1.648c-1.062-1.062-1.648-2.475-1.648-3.978s0.585-2.915 1.648-3.978c0.506-0.506 1.091-0.903 1.727-1.181v-2.39c-3.253 0.968-5.625 3.981-5.625 7.549 0 4.349 3.526 7.875 7.875 7.875s7.875-3.526 7.875-7.875c0-3.567-2.372-6.58-5.625-7.549zM14.875 14h2.25v9h-2.25z"></path>
                </svg>
                <span> Logout</span>
            </Link>
        </div>
)
