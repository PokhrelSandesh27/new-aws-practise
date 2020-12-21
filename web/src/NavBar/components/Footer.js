import React from 'react'
import '../static/css/Footer.css'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center" style={{display:'flex', marginLeft:"30%"}}>
            {'Copyright © '}
            <Link color="inherit" href="http://Everestwalk.com/">
                EverestWalk Pvt.Ltd.
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}



export default function Footer(){


    return (
        <Copyright />
    )
}


