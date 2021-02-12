import React, { useContext, useEffect } from "react"
import { EventContext } from "./EventProvider.js"
import "./event.css"

export const EventList = (props) => {
    const { events, getEvents } = useContext(EventContext)

    useEffect(() => {
        getEvents()
    }, [])

    return (
        <article className="events">
            <header className="events__header">
                <h1>Level Up Game Events</h1>
            </header>
            <div class="events__list">
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
                        </section>
                    })
                }
            </div>
        </article >
    )
}