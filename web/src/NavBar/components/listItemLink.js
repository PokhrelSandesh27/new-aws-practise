import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom'
import Icon from '@material-ui/core/Icon';
import '../static/css/SubMenu.css'

function ListItemLink(props) {
    const { icon, primary, to } = props;
    const clickHandler=()=>{
        if(props.click)
            props.click();
    }

    const CustomLink = React.useMemo(
        () =>
            React.forwardRef((linkProps, ref) => (
                <Link ref={ref} to={to} {...linkProps} />
            )),
        [to],
    );

    return (
        <li>

            <ListItem  button component={CustomLink} onClick={clickHandler} style={{fontSize:"18px", color:"white"}}>
                <ListItemIcon  style={{height:"24px",width:"24px",fill:"#f2f2f2", marginLeft:"5%"}}><Icon>{icon}</Icon></ListItemIcon>
                <ListItemText primary={primary} />
            </ListItem>
        </li>
    )
}

export default ListItemLink;
