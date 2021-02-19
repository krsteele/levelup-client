import React, { useContext, useState, useEffect } from "react"
import { GameContext } from "./GameProvider.js"
import { useHistory } from 'react-router-dom'


export const GameForm = (props) => {
    const history = useHistory()
    const { createGame, getGameTypes, gameTypes, getGame, editGame } = useContext(GameContext)

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentGame, setCurrentGame] = useState({
        description: "",
        numberOfPlayers: 0,
        title: "",
        gameTypeId: 0
    })

    /*
        Get game types on initialization so that the <select>
        element presents game type choices to the user.
    */
    useEffect(() => {
        getGameTypes()
    }, [])

    useEffect(() => {
        if ("gameId" in props.match.params) {
            getGame(props.match.params.gameId).then(game => {
                setCurrentGame({
                    description: game.description,
                    numberOfPlayers: game.number_of_players,
                    title: game.title,
                    gameTypeId: game.gametype.id
                })
            })
        }
    }, [props.match.params.gameId])

    /*
        Update the `currentGame` state variable every time
        the state of one of the input fields changes.
    */
    const changeGameState = (domEvent) => {
        const newGameState = Object.assign({}, currentGame)
        newGameState[domEvent.target.name] = domEvent.target.value
        setCurrentGame(newGameState)
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentGame.title}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="numberOfPlayers">Number of Players: </label>
                    <input type="number" name="numberOfPlayers" required autoFocus className="form-control"
                        value={currentGame.numberOfPlayers}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <textarea type="text" name="description" required autoFocus className="form-control"
                        value={currentGame.description}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameTypeId">Game Type: </label>
                    <select name="gameTypeId" className="form-control"
                        value={currentGame.gameTypeId}
                        onChange={changeGameState}>

                        <option value="0">Select a game type</option>
                        {gameTypes.map(t => (
                            <option key={t.id} value={t.id}>
                                {t.type}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>

            {
                ("gameId" in props.match.params)
                    ? <button 
                        onClick={evt => {
                            // Prevent form from being submitted
                            evt.preventDefault()
        
                            const game = {
                                id: parseInt(props.match.params.gameId),
                                title: currentGame.title,
                                numberOfPlayers: parseInt(currentGame.numberOfPlayers),
                                description: (currentGame.description),
                                gameTypeId: parseInt(currentGame.gameTypeId)
                            }
        
                            // Send POST request to your API
                            editGame(game)
                                .then(() => history.push("/"))
                        }}
                        className="btn btn-primary">Edit</button>
                    : <button type="submit"
                        onClick={evt => {
                            // Prevent form from being submitted
                            evt.preventDefault()
        
                            const game = {
                                title: currentGame.title,
                                numberOfPlayers: parseInt(currentGame.numberOfPlayers),
                                description: (currentGame.description),
                                gameTypeId: parseInt(currentGame.gameTypeId)
                            }
        
                            // Send POST request to your API
                            createGame(game)
                                .then(() => history.push("/"))
                        }}
                        className="btn btn-primary">Create</button>
            }

        </form>
    )
}