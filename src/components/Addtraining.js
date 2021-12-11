import * as React from 'react';
import dayjs from 'dayjs';
import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Select,
    MenuItem
} from '@material-ui/core';
import {useState} from "react";


export default function Addtraining(props) {
    const [open, setOpen] = React.useState(false);
    const [training, setTraining] = useState({
        date:dayjs(new Date()).format("YYYY-MM-DD"), activity:'', duration:0, customer:''
    });
    const [customers, setCustomers] = useState([]);

    const fetchCustomers = ()=>{
        fetch('https://customerrest.herokuapp.com/api/customers')
            .then(resp => resp.json())
            .then(data => setCustomers(data.content))
        console.log(customers)
    }

    const handleClickOpen = () => {
        fetchCustomers();
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handeInputChange = (event) => {
        setTraining({...training, [event.target.name]: event.target.value})
    }

    const addTraining = () => {
        props.saveTraining(training);
        handleClose();
    }

    return (
        <div>
            <Button style={{margin: 20}} variant="contained" onClick={handleClickOpen}>
                Add a training
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add a training</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="date"
                        value={training.date}
                        onChange={e=>handeInputChange(e)}
                        label="Date"
                        fullWidth
                        variant="standard"
                        required={true}
                    />
                    <TextField
                        margin="dense"
                        name="activity"
                        value={training.activity}
                        onChange={e=>handeInputChange(e)}
                        label="Activity"
                        fullWidth
                        variant="standard"
                        required={true}
                    />
                    <TextField
                        margin="dense"
                        name="duration"
                        value={training.duration}
                        onChange={e=>handeInputChange(e)}
                        label="Duration"
                        type="number"
                        fullWidth
                        variant="standard"
                        required={true}
                    />
                    <Select
                        name="customer"
                        value={training.customer}
                        label="Customer"
                        onChange={e=>handeInputChange(e)}
                    >
                        {customers.map(customer => (
                            <MenuItem value={"https://customerrest.herokuapp.com/api/customers/" + customer.links[0].href.slice(49)} key={customer.id}>{customer.firstname} {customer.lastname}</MenuItem>
                            )
                        )}
                    </Select>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={addTraining}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}