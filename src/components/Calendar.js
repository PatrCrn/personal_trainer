import React, {useEffect, useState} from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!

export default function Calendar () {
    const [trainings, setTrainings] = useState([]);

    useEffect(() => fetchData(), []);

    const fetchData = ()=>{
        fetch('https://customerrest.herokuapp.com/gettrainings')
            .then(resp => resp.json())
            .then(data => setTrainings(data))
    }


    return (
        <FullCalendar
            headerToolbar={{center: 'dayGridMonth, dayGridWeek'}}
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={
                trainings.map(training => {
                    return {
                        id: training.id,
                        title: "" + training.activity + "/" + training.customer.firstname + " " + training.customer.lastname,
                        start: training.date
                    }
                })
            }
        />
    )
}