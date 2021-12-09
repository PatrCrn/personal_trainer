import * as React from 'react';
import {Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle} from '@material-ui/core';
import {useState} from "react";

export default function Editcustomer(props) {
    const [open, setOpen] = React.useState(false);
    const [customer, setCustomer] = useState({
        firstname:'', lastname:'', email:'', phone:'', streetaddress:'', postcode:'', city:''
    });

    const handleClickOpen = () => {
        setCustomer({
            firstname: props.customer.firstname,
            lastname: props.customer.lastname,
            email: props.customer.email,
            phone: props.customer.phone,
            streetaddress: props.customer.streetaddress,
            postcode: props.customer.postcode,
            city: props.customer.city
        })
        console.log(props.customer)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handeInputChange = (event) => {
        setCustomer({...customer, [event.target.name]: event.target.value})
    }

    const editCustomer = () => {
        props.editCustomer(customer, props.customer.links[0].href);
        handleClose();
    }

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Edit
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit chosen customer</DialogTitle>
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
                    <Button onClick={editCustomer}>Update</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}