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
import { Autocomplete, TextareaAutosize, TextField, useTheme, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useEffect } from 'react';

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
    const { currentArticle, setCurrentArticle } = useArticlesContext();

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [autocompleteValue, setAutocompleteValue] = useState('');
    const [textAreaValue, setTextAreaValue] = useState('');
    const [alignment, setAlignment] = useState('Engineering');
    const onDeleteClick = async (articleId) => {
        await axios.delete(`http://localhost:4000/articles/${articleId}`);
        window.location.reload();
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

    return currentArticle ? (
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
                <Grid item container justifyContent="flex-end" paddingRight={3} gap={4} paddingBottom={2}>
                    <Button
                        variant='contained'
                        onClick={() => onDeleteClick(currentArticle.id)}
                    >Delete</Button>
                    <Button
                        variant='contained'
                        onClick={() => handleOpen()}
                    >Edit</Button>
                </Grid>
            </Card >
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
    ) : null;
}