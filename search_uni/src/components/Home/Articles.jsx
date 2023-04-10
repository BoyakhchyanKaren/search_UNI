import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useArticlesContext } from '../../context';
import { Grid } from '@mui/material';
import _ from 'lodash';
import axios from 'axios';
import { Autocomplete, CircularProgress, Box, Modal, TextareaAutosize, TextField, useTheme, ToggleButton, ToggleButtonGroup } from "@mui/material";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    boxShadow: 24,
    p: 4,
};

function CircularIndeterminate() {
    return (
        <Box sx={{ display: 'flex' }}>
            <CircularProgress />
        </Box>
    );
}

const RenderArticles = () => {
    const { articles, currentArticle, setCurrentArticle, setArticles } = useArticlesContext();

    const model = _.chain(articles)
        .groupBy("alignment")
        .map((value, key) => ({ groupName: key, groupedArticles: value }))
        .value();

    const theme = useTheme();
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [autocompleteValue, setAutocompleteValue] = useState('');
    const [textAreaValue, setTextAreaValue] = useState('');
    const [alignment, setAlignment] = useState('Engineering');
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [currentArticleId, setCurrentArticleId] = useState('');

    const onDeleteClick = async (articleId) => {
        setLoading(true);
        if (!articles.length) {
            window.location.reload();
        }
        const response = await axios.delete(`http://localhost:4000/articles/${articleId}`);
        console.log(response)
        fetch('http://localhost:4000/articles').then((res) => res.json()).then((articles) => {
            setArticles(articles);
        }).catch(() => {
            fetch('http://localhost:4000/articles').then((res) => res.json()).then((articles) => {
                setArticles(articles);
            })
        });
        if (response.statusText === 'OK') {
            setLoading(false);
            setOpenDeleteModal(false);
        }
    }

    const onOpenDeleteModal = (idOfArticel) => {
        setOpenDeleteModal(true);
        setCurrentArticleId(idOfArticel);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!autocompleteValue.length || !textAreaValue.length || !alignment.length) {
            return;
        }
        const editData = {
            ...currentArticle,
            title: autocompleteValue,
            description: textAreaValue,
            alignment,
        }
        await axios.put(`http://localhost:5000/articles/${currentArticle.id}`, editData);
        setCurrentArticle(editData);
        handleClose();
    }
    const handleChange = (_event, newAlignment) => {
        setAlignment(newAlignment);
    };

    useEffect(() => {
        if (currentArticle) {
            setAutocompleteValue(currentArticle.title);
            setTextAreaValue(currentArticle.description);
            setAlignment(currentArticle.alignment)
        }
    }, [currentArticle]);

    const onEditClick = (currentArticleId) => {
        const findCurrentArticle = articles.find(el => el.id === currentArticleId);
        setCurrentArticle(findCurrentArticle);
        handleOpen();
    }


    return (
        !loading ?
            model.map(({ groupName, groupedArticles }) => {
                return (
                    <>
                        <Grid item container direction={"column"} justifyContent={'center'} alignItems={'center'} gap={2}>
                            <Grid>
                                <Typography fontSize={'25px'} fontWeight={700} color={'black'}>{groupName}</Typography>
                            </Grid>
                            <Grid item container direction={"column"} justifyContent={'center'} alignItems={'center'} gap={3}>
                                {groupedArticles.map((article) => {
                                    return (
                                        <Card sx={{ width: 500 }}>
                                            <CardMedia
                                                sx={{ height: 200 }}
                                                image={'https://thumbs.dreamstime.com/z/article-reading-16383133.jpg'}
                                            />
                                            <CardContent style={{
                                                maxHeight: 250,
                                                overflowX: 'hidden',
                                                overflowY: 'scroll',
                                            }}>
                                                <Typography gutterBottom variant="h5" component="div">
                                                    {article.title}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary" style={{
                                                    wordWrap: 'break-word',
                                                    overflowX: 'hidden',
                                                    overflowY: 'scroll',
                                                }}>
                                                    {article.description}
                                                </Typography>
                                            </CardContent>
                                            <CardActions>
                                                <Grid item container justifyContent="flex-end" paddingRight={1} gap={4} paddingBottom={2}>
                                                    <Button
                                                        variant='contained'
                                                        onClick={() => onOpenDeleteModal(article.id)}
                                                    >Delete</Button>
                                                    <Button
                                                        variant='contained'
                                                        onClick={() => onEditClick(article.id)}
                                                    >Edit</Button>
                                                </Grid>
                                            </CardActions>
                                        </Card>
                                    )
                                })}
                            </Grid>
                        </Grid>
                        <Modal
                            open={openDeleteModal}
                            onClose={() => setOpenDeleteModal(false)}
                        >
                            <Grid
                                item
                                container
                                style={style}
                                alignItems="center"
                                justifyContent="center"
                                sx={{ backgroundColor: theme.palette.primary.dark }}
                                width="600px"
                                height="200px"
                                direction="column"
                                gap={5}
                                marginTop={3}
                                borderRadius="20px"
                            >
                                <Grid sx={{ color: 'white' }}>
                                    <Typography sx={{ fontSize: '18px' }}>
                                        Are you sure you want to delete this article?
                                    </Typography>
                                </Grid>
                                <Grid item container gap={2} alignItems={'center'} justifyContent={"center"}>
                                    <Button variant='contained' onClick={() => onDeleteClick(currentArticleId)}>Yes</Button>
                                    <Button variant='contained' onClick={() => setOpenDeleteModal(false)}>No</Button>
                                </Grid>
                            </Grid>
                        </Modal>
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <form onSubmit={handleSubmit} style={style}>
                                <Grid
                                    item
                                    container
                                    alignItems="center"
                                    justifyContent="center"
                                    sx={{ backgroundColor: theme.palette.primary.dark }}
                                    width="500px"
                                    height="600px"
                                    direction="column"
                                    gap={5}
                                    marginTop={3}
                                    borderRadius="20px"
                                >
                                    <Grid alignItems="center" justifyContent="center">
                                        <Typography pb={5} sx={{ color: 'gray', fontSize: '35px' }}>Edit Article</Typography>
                                    </Grid>
                                    <Grid item alignItems="center" justifyContent="center">
                                        <ToggleButtonGroup
                                            color="primary"
                                            value={alignment}
                                            exclusive
                                            onChange={handleChange}
                                            sx={{
                                                padding: '10px',
                                                borderRadius: '10px',
                                                display: 'flex',
                                                gap: '25px',
                                                justifyContent: 'space-between',
                                                "& .MuiToggleButtonGroup-grouped": {
                                                    color: 'white'
                                                },
                                                "& .Mui-selected": {
                                                    backgroundColor: `${theme.palette.primary.light} !important`,
                                                    color: 'black !important'
                                                }
                                            }}
                                        >
                                            {['Engineering', 'IT', 'Health', 'Other'].map((spec) => {
                                                return (
                                                    <ToggleButton
                                                        sx={{
                                                            fontWeight: 500,
                                                            color: 'white',
                                                            border: '1px solid white !important',
                                                            borderRadius: '12px !important',
                                                        }}
                                                        value={spec}
                                                    >
                                                        {spec}
                                                    </ToggleButton>
                                                )
                                            })}
                                        </ToggleButtonGroup>
                                    </Grid>
                                    <Grid width="400px">
                                        <Autocomplete
                                            freeSolo
                                            inputValue={autocompleteValue}
                                            options={[]}
                                            onInputChange={(event, value) => {
                                                setAutocompleteValue(value);
                                            }}
                                            getOptionLabel={(option) => option.title}
                                            onChange={(event, value) => {
                                                setAutocompleteValue(value.title);
                                            }}
                                            fullWidth
                                            renderInput={(params) => <TextField {...params} label="Title" />}
                                        />
                                    </Grid>
                                    <Grid width="400px">
                                        <TextareaAutosize
                                            value={textAreaValue}
                                            onChange={(e) => setTextAreaValue(e.target.value)}
                                            placeholder="Description"
                                            maxRows={2}
                                            minRows={2}
                                            style={{
                                                maxHeight: '100px',
                                                minHeight: '100px',
                                                maxWidth: '400px',
                                                minWidth: '400px',
                                                borderRadius: '6px'
                                            }}
                                        />
                                    </Grid>
                                    <Grid>
                                        <Button
                                            type="submit"
                                            sx={{
                                                color: (theme) => theme.palette.primary.contrastText,
                                                border: '1px solid gray',
                                                width: '150px'
                                            }}
                                        >Edit</Button>
                                    </Grid>
                                </Grid >
                            </form>
                        </Modal>
                    </>
                )
            }) : <CircularIndeterminate />
    );
}

export default RenderArticles;