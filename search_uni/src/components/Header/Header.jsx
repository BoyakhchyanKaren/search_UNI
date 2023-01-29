import * as React from "react";

// importing material UI components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Home from "@mui/icons-material/Home";
import Create from "@mui/icons-material/Create";
import { Link } from "react-router-dom";

export default function Header() {
    return (
        <AppBar position="static">
            <Toolbar sx={{
                display: 'flex',
                justifyContent: 'space-between'
            }}>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                >
                    <Link style={{
                        fontSize: '20px',
                        color: 'white',
                        alignSelf: 'center',
                        textDecoration: 'none'
                    }} to="/">Home</Link>
                </IconButton>
                <Typography
                    variant="h3"
                    component="div"
                    color="white"
                    marginLeft={'120px'}
                >
                    Search Page
                </Typography>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                >
                    <Link style={{
                        fontSize: '20px',
                        marginRight: '10px',
                        color: 'white',
                        textDecoration: 'none'
                    }} to="/create">Create new article</Link>
                </IconButton>
            </Toolbar>
        </AppBar >
    );
}