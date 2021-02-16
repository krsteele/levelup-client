import React, { useContext, useEffect } from "react"
import { EventContext } from "./EventProvider.js"
import { useHistory } from "react-router-dom"
import "./event.css"

export const EventList = (props) => {
    const history = useHistory()

    const { events, getEvents, joinEvent } = useContext(EventContext)



    useEffect(() => {
        getEvents()
    }, [])

    return (
        <article className="events">
            <header className="events__header">
                <h1>Level Up Game Events</h1>
                <button className="btn btn-2 btn-sep icon-create"
                    onClick={() => {
                        history.push({ pathname: "/events/new" })
                            }}
                        >Schedule New Event
                </button>
            </header>
            <div className="events__list">
                {
                    events.map(event => {
                        return <section key={event.id} className="registration">
                            <div className="registration__game">{event.game.title}</div>
                            <div>{event.location}</div>
                            <div>
                                {
                                    new Date(event.event_time).toLocaleDateString("en-US",
                                    {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                        
                                    })
                                }
                            </div>
                            <div>
                                {
                                    new Date(event.event_time).toLocaleTimeString("en-US")
                                }
                            </div>
                        </section>
                    })
                }
            </div>
        </article >
    )``
}