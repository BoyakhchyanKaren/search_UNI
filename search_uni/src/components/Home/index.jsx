import { Grid, useTheme } from "@mui/material";
import { useArticlesContext } from "../../context";
import Header from "../Header/Header";
import RenderArticles from "./Articles";

const Home = () => {
    const { articles } = useArticlesContext();
    const theme = useTheme();

    return (
        <Grid sx={{
            width: '100%',
            height: articles.length === 0 || articles.length === 1 ? '100vh' : '100%',
            backgroundColor: theme.palette.primary.light
        }}>
            <Grid
                item
                container
                direction="column"
                justify-content="center"
                alignItems="center"
                gap={4}
            >
                <Header />
                <RenderArticles />
            </Grid>
        </Grid>
    )
}

export default Home;