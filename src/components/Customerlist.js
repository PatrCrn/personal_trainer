import React, {useEffect, useState} from "react";
import ReactTable from "react-table-6";
import "react-table-6/react-table.css"
import {Button} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import Addcustomer from "./Addcustomer";
import Editcustomer from "./Editcustomer";

export default function Customerlist() {
    const [customers, setCustomers] = useState([]);

    useEffect(() => fetchData(), []);

    const fetchData = ()=>{
        fetch('https://customerrest.herokuapp.com/api/customers')
            .then(resp => resp.json())
            .then(data => setCustomers(data.content))
        console.log(customers)
    }

    const deleteCustomer = (link) => {
        if (window.confirm("Are you sure ?")) {
            fetch(link, {method:'DELETE'})
                .then(() => fetchData())
                .catch(err => console.log(err))
        }
    }

    const editCustomer = (customer, link) => {
        fetch(link, {
            method:'PUT',
            headers:{
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(customer)
        })
            .then(() => fetchData())
            .catch(err => console.log(err))
    }

    const saveCustomer = (customer) => {
        fetch('https://customerrest.herokuapp.com/api/customers', {
            method:'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(customer)
        })
            .then(res => fetchData())
            .catch(err => console.log(err))
    }

    const columns = [
        {
            Header : 'Firstname',
            accessor: 'firstname'
        },
        {
            Header : 'Lastname',
            accessor: 'lastname'
        },
        {
            Header : 'Address',
            accessor: 'streetaddress'
        },
        {
            Header : 'Postal Code',
            accessor: 'postcode'
        },
        {
            Header : 'City',
            accessor: 'city'
        },
        {
            Header : 'Email',
            accessor: 'email'
        },
        {
            Header : 'Phone',
            accessor: 'phone'
        },
        {
            sortable: false,
            filterable: false,
            width: 100,
            Cell: row => <Editcustomer customer={row.original} editCustomer={editCustomer} />
        },
        {
            sortable: false,
            filterable: false,
            width: 120,
            accessor: "links.0.href",
            Cell: row => <Button
                //onClick={() => deleteCustomer(row.value)}
                onClick={() => console.log(row.value)}
                startIcon={<DeleteIcon />}
                color="secondary"
                size='small'
                variant="contained"
            >
                Delete
            </Button>
        }
    ]

    return (
        <div>
            <Addcustomer saveCustomer={saveCustomer} />
            <ReactTable filterable={true} data={customers} columns={columns} />
        </div>
    );
}