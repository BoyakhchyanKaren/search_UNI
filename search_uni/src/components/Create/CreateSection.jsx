import React, { useEffect, useState } from "react";
import { Autocomplete, Button, Grid, TextareaAutosize, TextField, Typography, useTheme, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useArticlesContext } from "../../context";
import { v4 } from 'uuid';
import axios from 'axios';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    boxShadow: 24,
    p: 4,
};


export const CreateSection = () => {
    const [existingDescriptions, setExistingDescriptions] = useState(null);
    const theme = useTheme();
    const [openFieldModal, setOpenFieldModal] = useState(false);
    const { articles } = useArticlesContext();
    const [fieldCreated, setFieldCreated] = useState(false);
    const getOptionsValues = () => {

        const onlyTitles = articles.map(({ title }) => (title));
        const uniqueChars = [...new Set(onlyTitles)];

        return uniqueChars.map((title) => ({ title }));

    }
    const [autocompleteValue, setAutocompleteValue] = useState('');
    const [textAreaValue, setTextAreaValue] = useState('');
    const [alignment, setAlignment] = useState('Engineering');

    const handleChange = (_event, newAlignment) => {
        console.log(alignment)
        setAlignment(newAlignment);
        if (newAlignment === 'add field') {
            setOpenFieldModal(true);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!autocompleteValue.length || !textAreaValue.length || !alignment.length) {
            return;
        }
        const createdData = {
            title: autocompleteValue,
            description: textAreaValue,
            alignment,
            id: v4(),
        }
        await axios.post('http://localhost:5000/articles', createdData);
        setAutocompleteValue('');
        setTextAreaValue('');
        setAlignment("Engineering");
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

    const onAddClick = async () => {
        const a = await axios.post('http://localhost:4000/descriptions', { name: alignment, id: v4() });
        if (a.status === 201) {
            setFieldCreated(true);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
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
                    <Typography pb={5} sx={{ color: 'gray', fontSize: '35px' }}>Create new Article</Typography>
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
                        {existingDescriptions?.map(e => e.name)?.map((spec) => {
                            return (
                                <ToggleButton
                                    sx={{
                                        fontWeight: 500,
                                        color: 'white',
                                        border: '1px solid white !important',
                                        borderRadius: '12px !important',
                                        padding: '4px !important'
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
                        options={getOptionsValues()}
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
                    >Create</Button>
                </Grid>
            </Grid >
            <Modal
                open={openFieldModal}
                onClose={() => setOpenFieldModal(false)}
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
                    <Grid item container gap={2} alignItems={'center'} justifyContent={"center"}>
                        <Typography sx={{ color: 'white', fontSize: '17px' }}>Please add field name, what you want!</Typography>
                        <TextField
                            fullWidth
                            value={alignment}
                            onChange={(e) => setAlignment(e.target.value)}
                        />
                        <Button onClick={() => onAddClick()}>Add</Button>
                    </Grid>
                </Grid>
            </Modal>
        </form>
    )
};
