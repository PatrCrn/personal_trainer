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

    const convertToCSV = (objArray) => {
        let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
        let str = '';

        for (let i = 0; i < array.length; i++) {
            let line = '';
            for (let index in array[i]) {
                if (line !== '') line += ','

                line += array[i][index];
            }
            str += line + '\r\n';
        }
        return str;
    }

    const exportCSVFile = (headers, customers, fileTitle) => {
        if (headers) {
            customers.unshift(headers);
        }

        // Convert Object to JSON
        let jsonCustomers = JSON.stringify(customers);
        // Then to CSV
        let csv = convertToCSV(jsonCustomers);

        let fileName = fileTitle + '.csv' || 'export.csv';

        let blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        if (navigator.msSaveBlob) {
            navigator.msSaveBlob(blob, fileName);
        } else {
            let link = document.createElement("a");
            if (link.download !== undefined) { // feature detection
                // Browsers that support HTML5 download attribute
                let url = URL.createObjectURL(blob);
                link.setAttribute("href", url);
                link.setAttribute("download", fileName);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }
    }

    const downloadCustomers = () => {
        const headers = {
            firstname: 'Firstname',
            lastname: "Lastname",
            streetaddress: "Address",
            postcode: "Postal code",
            city: "City",
            email: "Email",
            phone: "Phone"
        };

        const fileTitle = 'customers';

        const newCustomers = customers.map(({content, links, ...item}) => item)

        exportCSVFile(headers, newCustomers, fileTitle);
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
                onClick={() => deleteCustomer(row.value)}
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
            <Addcustomer saveCustomer={saveCustomer} downloadCustomers={downloadCustomers}/>
            <ReactTable filterable={true} data={customers} columns={columns} />
        </div>
    );
}