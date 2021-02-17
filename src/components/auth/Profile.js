import React, { useEffect, useContext } from "react"
import { ProfileContext } from "./ProfileProvider.js"
import "./Profile.css"


export const Profile = () => {
    const { profile, getProfile } = useContext(ProfileContext)

    useEffect(() => {
        getProfile()
    }, [])

    return (
        <article className="profile">
            <header>
                <h1>Your Profile</h1>
            </header>
            <section className="profile__info">
                <header className="profile__header">
                    <h3>Your Info</h3>
                </header>
                <div className="profile__name">
                    Welcome: {profile.gamer && profile.gamer.user.first_name} {profile.gamer && profile.gamer.user.last_name}
                </div>
                <div className="profile__username">Username: {profile.gamer && profile.gamer.user.username}</div>
                <div className="profile__bio">About you: {profile.gamer && profile.gamer.bio}</div>
            </section>
            <section className="profile__registrations">
                <header className="registrations__header">
                    <h3>Your Events</h3>
                </header>
                <div className="registrations">
                    {
                        profile.events.map(event => {
                            return <div key={event.id} className="registration">
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
                            </div>
                        })
                    }
                </div>
            </section>
        </article>
    )
}