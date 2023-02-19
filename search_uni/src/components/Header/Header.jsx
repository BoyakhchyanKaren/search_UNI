import * as React from "react";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { Button, Grid } from "@mui/material";
import { useArticlesContext } from "../../context";
import axios from "axios";

export default function Header() {

    const { setArticles } = useArticlesContext();

    const onHomeClick = () => {
        async function fetchData() {
            const response = await axios.get('http://localhost:4000/articles');
            setArticles(response.data);
        }
        fetchData();
    };

    return (
        <AppBar position="static">
            <Toolbar sx={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: '40px'
            }}>
                <Grid item container direction={"row"} gap={5}>
                    <Button
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ border: '0.5px solid white' }}
                    >
                        <Link style={{
                            fontSize: '20px',
                            color: 'white',
                            alignSelf: 'center',
                            textDecoration: 'none'
                        }}
                            onClick={onHomeClick}
                            to="/">Home</Link>
                    </Button>
                    <Button
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ border: '0.5px solid white' }}
                    >
                        <Link style={{
                            fontSize: '20px',
                            marginRight: '10px',
                            color: 'white',
                            textDecoration: 'none'
                        }} to="/search">Search Article</Link>
                    </Button>
                    <Button
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ border: '0.5px solid white' }}
                    >
                        <Link style={{
                            fontSize: '20px',
                            marginRight: '10px',
                            color: 'white',
                            textDecoration: 'none'
                        }} to="/create">Create New Article</Link>
                    </Button>
                </Grid>

                <Typography
                    variant="h3"
                    component="div"
                    color="white"
                    width={'200px'}
                >
                    Search Page
                </Typography>
            </Toolbar>
        </AppBar >
    );
}