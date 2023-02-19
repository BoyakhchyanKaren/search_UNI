import React, { useState } from "react";
import { Autocomplete, Button, Grid, TextareaAutosize, TextField, Typography, useTheme, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useArticlesContext } from "../../context";
import { v4 } from 'uuid';
import axios from 'axios';

export const CreateSection = () => {
    const theme = useTheme();
    const { articles } = useArticlesContext();
    const getOptionsValues = () => {

        const onlyTitles = articles.map(({ title }) => (title));
        const uniqueChars = [...new Set(onlyTitles)];

        return uniqueChars.map((title) => ({ title }));

    }
    const [autocompleteValue, setAutocompleteValue] = useState('');
    const [textAreaValue, setTextAreaValue] = useState('');
    const [alignment, setAlignment] = useState('Engineering');

    const handleChange = (_event, newAlignment) => {
        setAlignment(newAlignment);
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
        </form>
    )
};
