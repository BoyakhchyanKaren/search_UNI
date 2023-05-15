import React, { useState } from 'react';
import Card from '@mui/material/Card';
import { Grid } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useArticlesContext } from '../context';
import axios from 'axios';
import Modal from '@mui/material/Modal';
import { Autocomplete, TextareaAutosize, Badge, IconButton, TextField, useTheme, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useEffect } from 'react';
import ClearIcon from '@mui/icons-material/Clear';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    boxShadow: 24,
    p: 4,
};

export default function MediaCard() {
    const theme = useTheme();

    const { currentArticle, setCurrentArticle, setArticles, articles, showArticles } = useArticlesContext();
    const [existingDescriptions, setExistingDescriptions] = React.useState(null);
    const [openFieldModal, setOpenFieldModal] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [fieldCreated, setFieldCreated] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [autocompleteValue, setAutocompleteValue] = useState('');
    const [textAreaValue, setTextAreaValue] = useState('');
    const [alignment, setAlignment] = useState('Engineering');
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [currentArticleId, setCurrentArticleId] = useState('');
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
        window.location.reload();
        handleClose();
    }
    const handleChange = (_event, newAlignment) => {
        setAlignment(newAlignment);
    };

    const getDeletableDescriptions = existingDescriptions?.map((element) => {
        if (element.name === 'add field') {
            return element;
        }
        const currentFind = articles?.find((shouldBeArticleFindable) => shouldBeArticleFindable.alignment === element.name);
        if (currentFind) {
            return element;
        } else {
            return {
                ...element,
                isDeletable: true,
            }
        }
    })

    const onOpenDeleteModal = (idOfArticel) => {
        setOpenDeleteModal(true);
        setCurrentArticleId(idOfArticel);
    }

    const onDescriptionRemove = async (descriptionID) => {
        await axios.delete(`http://localhost:4000/descriptions/${descriptionID}`);
        const a = await axios.get('http://localhost:5000/articles/descriptions');
        setExistingDescriptions(a.data);
        setFieldCreated(false);
        setOpenFieldModal(false);
    }

    const getDescriptions = async () => {
        const a = await axios.get('http://localhost:5000/articles/descriptions');
        setExistingDescriptions(a.data);
        setFieldCreated(false);
        setOpenFieldModal(false);
    }

    useEffect(() => {
        getDescriptions().catch(err => console.log(err));
    }, [fieldCreated]);

    const onDeleteClick = async (articleId) => {
        if (!articles.length) {
            window.location.reload();
        }
        const response = await axios.delete(`http://localhost:4000/articles/${articleId}`);
        fetch('http://localhost:4000/articles').then((res) => res.json()).then((articles) => {
            setArticles(articles);
        }).catch(() => {
            fetch('http://localhost:4000/articles').then((res) => res.json()).then((articles) => {
                setArticles(articles);
            })
        });
        if (response.statusText === 'OK') {
            setOpenDeleteModal(false);
            window.location.reload();
        }

    }

    useEffect(() => {
        if (currentArticle) {
            setAutocompleteValue(currentArticle.title);
            setTextAreaValue(currentArticle.description);
            setAlignment(currentArticle.alignment)
        }
    }, [currentArticle]);

    return currentArticle ? (
        <>
            {showArticles.map((curArticle) => {
                return (
                    <>
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
                                    {curArticle.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" style={{
                                    overflowX: 'hidden',
                                    overflowY: 'auto',
                                }}
                                    width="700px"
                                    height="200px"
                                >
                                    {curArticle.description}
                                </Typography>
                            </CardContent>
                            <Grid item container justifyContent="flex-end" paddingRight={3} gap={4} paddingBottom={2}>
                                <Button
                                    variant='contained'
                                    onClick={() => onOpenDeleteModal(curArticle.id)}
                                >Delete</Button>
                                <Button
                                    variant='contained'
                                    onClick={() => handleOpen()}
                                >Edit</Button>
                            </Grid>
                        </Card >
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
                                    <Button variant='contained' onClick={() => onDeleteClick(curArticle)}>Yes</Button>
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
                                    <Grid item alignItems="center" justifyContent="center" sx={{
                                        overflowX: 'scroll',
                                        overflowY: 'hidden',
                                        width: '400px'
                                    }}>
                                        <ToggleButtonGroup
                                            color="primary"
                                            value={alignment}
                                            exclusive
                                            onChange={handleChange}
                                            sx={{
                                                padding: '20px 0',
                                                borderRadius: '10px',
                                                display: 'flex',
                                                gap: '25px',
                                                "& .MuiToggleButtonGroup-grouped": {
                                                    color: 'white'
                                                },
                                                "& .Mui-selected": {
                                                    backgroundColor: `${theme.palette.primary.light} !important`,
                                                    color: 'black !important'
                                                }
                                            }}
                                        >
                                            {getDeletableDescriptions?.map((spec) => {
                                                if (spec.isDeletable) {
                                                    return (
                                                        <ToggleButton
                                                            sx={{
                                                                fontWeight: 500,
                                                                color: 'white',
                                                                border: '1px solid white !important',
                                                                borderRadius: '12px !important',
                                                                padding: '8px 40px',
                                                            }}
                                                            value={spec.name}
                                                        >
                                                            <Badge badgeContent={
                                                                <IconButton onClick={() => onDescriptionRemove(spec.id)} sx={{
                                                                    width: '20px', marginBottom: '30px',
                                                                    height: '20px',
                                                                    marginLeft: '70px',
                                                                    backgroundColor: 'gray',
                                                                    borderRadius: '10px',
                                                                    "&:hover": {
                                                                        backgroundColor: 'wheat'
                                                                    }
                                                                }}>
                                                                    <ClearIcon sx={{
                                                                        width: '17px',
                                                                        "&:hover": {
                                                                            cursor: 'pointer',
                                                                        }
                                                                    }} />

                                                                </IconButton>

                                                            }>
                                                                {spec.name}
                                                            </Badge>
                                                        </ToggleButton>
                                                    )
                                                }
                                                return (
                                                    <ToggleButton
                                                        sx={{
                                                            fontWeight: 500,
                                                            color: 'white',
                                                            border: '1px solid white !important',
                                                            borderRadius: '12px !important',
                                                            padding: '8px 40px',
                                                        }}
                                                        value={spec.name}
                                                    >
                                                        {spec.name}
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
            })}
        </>
    ) : null;
}