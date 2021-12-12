import React, {useEffect, useState} from "react";
import {Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis} from "recharts";

import { groupBy, sumBy } from 'lodash';
import {Tooltip} from "@material-ui/core";

export default function Statistics() {
    const [trainings, setTrainings] = useState([]);
    const [trainDuration, setTrainDuration] = useState();
    const [groupy, setGroupy] = useState({});
    const [dataRaw, setDataRaw] = useState([]);

    useEffect(() => {startData()}, []);

    // THIS FUNCTION FETCHES ALL TRAININGS
    const fetchData = async ()=>{
        await fetch('https://customerrest.herokuapp.com/api/trainings')
            .then(resp => resp.json())
            .then(data => setTrainings(data.content))
            .then(_=> {
                console.log("this is trainings")
                console.log(trainings)
            })
    }

    // THIS FUNCTION MODIFIES THE DATA BY TAKING OUT ATTRIBUTES : DATE/LINKS/CONTENT
    const modifyData = async () => {
        await fetchData()
            .then(_=>setTrainDuration(trainings.map(({date, links, content, ...keepAttrs}) => keepAttrs)))
            .then(_=> {
                console.log("this is train duration")
                console.log(trainDuration)
            })
    }

    // THIS FUNCTION GROUPS THE TRAININGS BY ACTIVITY
    const groupData = async () => {
        await  modifyData()
            .then(_=>setGroupy(groupBy(trainDuration, "activity")))
            .then(_=>{
                console.log("this is groupy")
                console.log(groupy)
            })
    }

    // THIS FUNCTION MAKES A NEW ARRAY OF OBJECTS AS -> key : activity / value : sum of each activity
    const sumData = async () => {
        await groupData()
            .then(_=>{
                console.log("this is the sumzzzzz")
                let dataLoop = []
                for (const [key, value] of Object.entries(groupy)) {
                    dataLoop.push({"activity": key, "total": sumBy(value, "duration")})
                }
                console.log("this is dataloop")
                console.log(dataLoop)
                dataLoop = dataLoop.map(train => dataRaw.find(obj => obj.activity === train.activity) || train);
                console.log("this is dataraw")
                setDataRaw(dataLoop)
            })
            .then(_=>console.log(dataRaw))
    }

    // Function to call for all the others to launch
    const startData = () => {
        sumData()
            .then(_ => console.log("done"))
    }

    const GetDataGraph = () => {
        return (
                <ResponsiveContainer width="100%" aspect={3}>
                    <BarChart
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                        // I didn't manage to put dataGraph in state so it could refresh
                        data={dataRaw}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="activity" fontSize={12} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="total" fill="#8884d8"/>
                    </BarChart>
                </ResponsiveContainer>
            )
    }

    return (
        <GetDataGraph />
    )
}