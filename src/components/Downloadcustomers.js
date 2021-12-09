import {useEffect, useState} from "react";

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

export default function Downloadcustomers() {
    const [customers, setCustomers] = useState([]);

    useEffect(() => fetchData(), []);

    let headers = {
        firstname: 'Firstname',
        lastname: "Lastname",
        streetaddress: "Address",
        postcode: "Postal code",
        city: "City",
        email: "Email",
        phone: "Phone"
    };

    const fetchData = ()=>{
        fetch('https://customerrest.herokuapp.com/api/customers')
            .then(resp => resp.json())
            .then(data => setCustomers(data.content))
    }

    let fileTitle = 'customers';

    const newCustomers = customers.map(({content, links, ...item}) => item)

    exportCSVFile(headers, newCustomers, fileTitle);
}