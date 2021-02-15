import { createEvent } from "@testing-library/react"
import React, { useContext, useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { GameContext } from "../game/GameProvider"
import { EventContext } from "./EventProvider"


export const EventForm = () => {
    const history = useHistory()

    const [currentEvent, setEvent] = useState({
        gameId: 0,
        date: "",
        location: ""
    })
    const { games, getGames } = useContext(GameContext)
    const { createEvent } = useContext(EventContext)

    useEffect(() => {
        // Get all existing games from API
        getGames()
    }, [])

    const changeEventState = (domEvent) => {
        const newEventState = Object.assign({}, currentEvent)
        newEventState[domEvent.target.name] = domEvent.target.value
        setEvent(newEventState)
    }

    return (
        <form className="eventForm">
            <h2 className="eventForm__title">Schedule New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameId">Game: </label>
                    <select name="gameId" className="form-control"
                        value={ currentEvent.gameId }
                        onChange={ changeEventState }>
                        <option value="0">Select a game...</option>
                        {
                            games.map(game => (
                                <option key={game.id} value={game.id}>{game.title}</option>
                            ))
                        }
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="location">Location: </label>
                    <input type="text" name="location" required autoFocus className="form-control"
                        value={currentEvent.location}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date and Time: </label>
                    <input type="datetime-local" name="date" required autoFocus className="form-control"
                        value={currentEvent.date}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>

            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()

                    // Create the event
                    const event = {
                        gameId: parseInt(currentEvent.gameId),
                        location: currentEvent.location,
                        date: currentEvent.date
                    }
                    createEvent(event)
                        .then(() => history.push("/events"))
                    // Once event is created, redirect user to event list
                }}
                className="btn btn-primary">Create Event</button>
        </form>
    )
}