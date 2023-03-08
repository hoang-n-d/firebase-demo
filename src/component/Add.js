import * as React from 'react';
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import {
    TextField,
    Typography,
    Switch,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    FormControlLabel,
    DialogContentText,
    Alert,
    AlertTitle,
    DialogActions,
} from "@mui/material";
import { Link } from 'react-router-dom';
export default function Add() {
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const baseURL = `https://6362100f66f75177ea2566ca.mockapi.io/Players/Players`;
    const formik = useFormik({
        initialValues: {
            name: "",
            nation: "",
            club: "",
            cost: 0,
            clip: "",
            info: "",
            img: "",
            famous: false,
        },
        
        onSubmit: (values) => {
            fetch(baseURL, {
                method: "POST",
                body: JSON.stringify(values),
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "same-origin",
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then((data) => setOpen(true))
                .catch((error) => console.log(error.message));
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required("Required.")
                .min(2, "Must be 2 characters or more"),
            nation: Yup.string()
                .required("Required.")
                .min(2, "Must be 2 characters or more"),
            club: Yup.string()
                .required("Required.")
                .min(2, "Must be 2 characters or more"),
            cost: Yup.number().integer()
                .required("Required.")
                .typeError("Please type a number."),
            info: Yup.string()
                .required("Required.")
                .min(10, "Must be 10 characters or more"),
            clip: Yup.string()
                .required("Required.")
                .min(10, "Must be 10 characters or more"),
            img: Yup.string()
                .required("Required.")
                .min(10, "Must be 10 characters or more"),
        }),
    });

    return(
        <div className='Add_main'>
            <h1>Add Player</h1>
        <form onSubmit={formik.handleSubmit} className='Add_info'>
            <TextField
                autoFocus
                margin="dense"
                name="name"
                label="Name"
                type="text"
                fullWidth
                variant="standard"
                value={formik.values.name}
                onChange={formik.handleChange}
                style={{color:"black"}}
            />
            {formik.errors.name && (
                <Typography variant="caption" color="red">
                    {formik.errors.name}
                </Typography>
            )}
            <TextField
                margin="dense"
                name="club"
                label="Club"
                type="text"
                fullWidth
                variant="standard"
                value={formik.values.club}
                onChange={formik.handleChange}
            />
            {formik.errors.club && (
                <Typography variant="caption" color="red">
                    {formik.errors.club}
                </Typography>
            )}
            <TextField
                margin="dense"
                name="nation"
                label="Nation"
                type="text"
                fullWidth
                variant="standard"
                value={formik.values.nation}
                onChange={formik.handleChange}
            />
            {formik.errors.nation && (
                <Typography variant="caption" color="red">
                    {formik.errors.nation}
                </Typography>
            )}
            <TextField
                margin="dense"
                name="img"
                label="URL of image"
                type="text"
                fullWidth
                variant="standard"
                value={formik.values.img}
                onChange={formik.handleChange}
            />
            {formik.errors.img && (
                <Typography variant="caption" color="red">
                    {formik.errors.img}
                </Typography>
            )}
            <TextField
                margin="dense"
                name="cost"
                label="Market value"
                type="number"
                fullWidth
                variant="standard"
                value={formik.values.cost}
                onChange={formik.handleChange}
            />
            {formik.errors.cost && (
                <Typography variant="caption" color="red">
                    {formik.errors.cost}
                </Typography>
            )}
            <TextField
                margin="dense"
                name="clip"
                label="Intro video"
                type="text"
                fullWidth
                variant="standard"
                value={formik.values.clip}
                onChange={formik.handleChange}
            />
            {formik.errors.clip && (
                <Typography variant="caption" color="red">
                    {formik.errors.clip}
                </Typography>
            )}
            <TextField
                multiline
                rows={2}
                margin="dense"
                name="info"
                label="Information"
                type="text"
                fullWidth
                variant="standard"
                value={formik.values.info}
                onChange={formik.handleChange}
            />
            {formik.errors.info && (
                <Typography variant="caption" color="red" display="block">
                    {formik.errors.info}
                    </Typography>
            )}
            <FormControlLabel
                control={<Switch />}
                label="Famous"
                name="famous"
                value={formik.values.famous}
                onChange={formik.handleChange}
            />
            <br />
            <Button variant="contained" size="medium" type="submit" className='Add_button'>
                <p className='Add_buttonc'>Add</p>
            </Button>
            
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Congraturation"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Alert severity="success">
                            <AlertTitle>Adding successful!</AlertTitle>
                        </Alert>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button>
                    <Typography textAlign="center">
                        <Link to='/dashboard' style={{textDecoration:"none"}}>Dashboard</Link>
                    </Typography>
                    </Button>
                    <Button autoFocus onClick={handleClose}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </form>
        </div>
    );
}