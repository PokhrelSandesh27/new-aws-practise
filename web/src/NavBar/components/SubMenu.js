import React, { useState, useEffect } from 'react'
import { Link, NavLink, useHistory } from 'react-router-dom'
import { get } from 'lodash'
import { getArr, getPermissions } from '../../utils'
import '../static/css/SubMenu.css'
import HomeRoutes from '../../Home/route'
import logo from '../../img/logo.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {Logout} from '../../svg'
import LinkItemList from './listItemLink';


import {
    faBuilding,
    faEnvelope,
    faHome,
    faSignOutAlt,
    faTachometerAlt,
    faUser
} from '@fortawesome/free-solid-svg-icons'
import Footer from './Footer'
import MainMenu from './MainMenu'

const SubMenu = props => {

    const permissions = getPermissions()

    const history = useHistory()
    const [menu, setMenu] = useState([])

    const getModuleId = () => history.location.pathname.split('/')[1]

    let moduleId

    useEffect(() => {
        moduleId = getModuleId()
        setMenu(getArr(permissions, [moduleId, 'menu']))
    }, [])

    history.listen(location => {
        const newModuleId = getModuleId()

        if (newModuleId !== moduleId) {
            moduleId = newModuleId
            setMenu(getArr(permissions, [moduleId, 'menu']))
        }
    })

    const _logout = () => {
        localStorage.clear()
    }

    return (

            <div >

                    {
                        Object.values(getPermissions()).map(permission => {
                            return (
                                <li >
                                    <LinkItemList
                                        to={get(permission, 'url')}
                                                  primary={get(permission,"name")}
                                                  icon={get(permission,"icon")} />
                                </li>

                            )
                        })
                    }

                {/*<li>*/}
                {/*    <LinkItemList to='/login'*/}
                {/*                  primary="Logout"*/}
                {/*                  click = {_logout}*/}
                {/*                  icon=<Logout/>*/}

                {/*    />*/}
                {/*</li>*/}


            {/*{*/}
            {/*    menu.map(item => {*/}
            {/*        return (*/}
            {/*            <li>*/}
            {/*                            <LinkItemList to={get(item, 'url')}*/}
            {/*                                          primary={get(item,"name")}*/}
            {/*                                          icon={get(item,"icon")} />*/}
            {/*                        </li>*/}
            {/*        )*/}
            {/*    })*/}
            {/*}*/}

            </div>


    )
}

export default SubMenu
