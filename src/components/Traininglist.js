import React, {useEffect, useState} from "react";
import ReactTable from "react-table-6";
import "react-table-6/react-table.css"
import {Button} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import dayjs from 'dayjs';
import Addtraining from "./Addtraining";

export default function Traininglist() {
    const [trainings, setTrainings] = useState([]);

    useEffect(() => fetchData(), []);

    const fetchData = ()=>{
        fetch('https://customerrest.herokuapp.com/api/trainings')
            .then(resp => resp.json())
            .then(data => setTrainings(data.content))
    }

    const deleteTraining = (link) => {
        if (window.confirm("Are you sure ?")) {
            fetch(link, {method:'DELETE'})
                .then(() => fetchData())
                .catch(err => console.log(err))
        }
    }

    const saveTraining = (training) => {
        fetch('https://customerrest.herokuapp.com/api/trainings', {
            method:'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(training)
        })
            .then(res => fetchData())
            .catch(err => console.log(err))
    }

    const columns = [
        {
            Header : 'Date',
            accessor: 'date',
            Cell : (props)=>{
                // The hour changes to GMT+1 timezone, so 0h11 goes to 1h11
                const formatDate = dayjs(props.value).format("DD-MM-YYYY HH[h]mm")
                return <span>{formatDate}</span>
            }
        },
        {
            Header : 'Duration (min)',
            accessor: 'duration'
        },
        {
            Header : 'Activity',
            accessor: 'activity'
        },
        {
            sortable: false,
            filterable: false,
            width: 120,
            accessor: "links.0.href",
            Cell: row => <Button
                onClick={() => deleteTraining(row.value)}
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
            <Addtraining saveTraining={saveTraining} />
            <ReactTable filterable={true} data={trainings} columns={columns} />
        </div>
    );
}