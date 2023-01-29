import React, { useState } from "react";
import { Autocomplete, Button, Grid, TextareaAutosize, TextField, Typography, useTheme } from "@mui/material";
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!autocompleteValue.length || !textAreaValue.length) {
            return;
        }
        const createdData = {
            title: autocompleteValue,
            description: textAreaValue,
            id: v4(),
        }
        await axios.post('http://localhost:5000/articles', createdData);
        setAutocompleteValue('');
        setTextAreaValue('');
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
                height="500px"
                direction="column"
                gap={5}
                marginTop={6}
                borderRadius="20px"
            >
                <Grid alignItems="center" justifyContent="center">
                    <Typography pb={5} sx={{ color: 'gray', fontSize: '35px' }}>Create new Article</Typography>
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
