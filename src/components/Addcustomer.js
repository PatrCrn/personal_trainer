import * as React from 'react';
import {Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle} from '@material-ui/core';
import {useState} from "react";

export default function Addcustomer(props) {
    const [open, setOpen] = React.useState(false);
    const [customer, setCustomer] = useState({
        firstname:'', lastname:'', email:'', phone:'', streetaddress:'', postcode:'', city:''
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handeInputChange = (event) => {
        setCustomer({...customer, [event.target.name]: event.target.value})
    }

    const addCustomer = () => {
        props.saveCustomer(customer);
        handleClose();
    }

    return (
        <div>
            <Button style={{margin: 20}} variant="contained" onClick={handleClickOpen}>
                Add a customer
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add a customer</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="firstname"
                        value={customer.firstname}
                        onChange={e=>handeInputChange(e)}
                        label="Firstname"
                        fullWidth
                        variant="standard"
                        required={true}
                    />
                    <TextField
                        margin="dense"
                        name="lastname"
                        value={customer.lastname}
                        onChange={e=>handeInputChange(e)}
                        label="Lastname"
                        fullWidth
                        variant="standard"
                        required={true}
                    />
                    <TextField
                        margin="dense"
                        name="email"
                        value={customer.email}
                        onChange={e=>handeInputChange(e)}
                        label="Email"
                        type="email"
                        fullWidth
                        variant="standard"
                        required={true}
                    />
                    <TextField
                        margin="dense"
                        name="phone"
                        value={customer.phone}
                        onChange={e=>handeInputChange(e)}
                        label="Phone"
                        fullWidth
                        variant="standard"
                        required={true}
                    />
                    <TextField
                        margin="dense"
                        name="streetaddress"
                        value={customer.streetaddress}
                        onChange={e=>handeInputChange(e)}
                        label="Address"
                        fullWidth
                        variant="standard"
                        required={true}
                    />
                    <TextField
                        margin="dense"
                        name="postcode"
                        value={customer.postcode}
                        onChange={e=>handeInputChange(e)}
                        label="Postal Code"
                        fullWidth
                        variant="standard"
                        required={true}
                    />
                    <TextField
                        margin="dense"
                        name="city"
                        value={customer.city}
                        onChange={e=>handeInputChange(e)}
                        label="City"
                        fullWidth
                        variant="standard"
                        required={true}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={addCustomer}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}