import React, { useContext, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import { GameContext } from "./GameProvider.js"
import "./game.css"

export const GameList = (props) => {
    const { games, getGames } = useContext(GameContext)

    const history = useHistory()

    useEffect(() => {
        getGames()
    }, [])

    return (
        <>
            <header>
                <button className="btn btn-2 btn-sep icon-create"
                    onClick={() => {
                        history.push({ pathname: "/games/new" })
                            }}
                        >Register New Game
                </button>
            </header>
            <article className="games__list">
                {
                    games.map(game => {
                        return <section key={`game--${game.id}`} className="game">
                            <div className="game__edit">
                                <button className="btn btn-2" onClick={() => history.push(`/games/${game.id}/edit`)} >Edit</button>
                            </div>
                            <div className="game__title">{game.title}</div>
                            <div className="game__description">{game.description}</div>
                            <div className="game__players">{game.number_of_players} players needed</div>
                        </section>
                    })
                }
            </article>
        </>
    )
}