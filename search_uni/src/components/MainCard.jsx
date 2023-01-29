import * as React from 'react';
import Card from '@mui/material/Card';
import { Grid } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useArticlesContext } from '../context';
import axios from 'axios';

export default function MediaCard() {
    const { currentArticle } = useArticlesContext();

    const onDeleteClick = async (articleId) => {
        await axios.delete(`http://localhost:5000/articles/${articleId}`);
        window.location.reload();
    }

    return currentArticle ? (
        <Card sx={{ maxWidth: 800 }}>
            <CardMedia
                sx={{ height: 200 }}
                image={'https://thumbs.dreamstime.com/z/article-reading-16383133.jpg'}
            />
            <CardContent style={{
                overflowX: 'hidden',
                overflowY: 'auto',
            }}>
                <Typography gutterBottom variant="h5" component="div">
                    {currentArticle.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" style={{
                    overflowX: 'hidden',
                    overflowY: 'auto',
                }}
                    width="700px"
                    height="200px"
                >
                    {currentArticle.description}
                </Typography>
            </CardContent>
            <Grid item container justifyContent="flex-end" paddingRight={3} paddingBottom={2}>
                <Button
                    variant='contained'
                    onClick={() => onDeleteClick(currentArticle.id)}
                >Delete</Button>
            </Grid>
        </Card >
    ) : null;
}