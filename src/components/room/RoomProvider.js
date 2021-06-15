import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need data
export const RoomContext = createContext()

// This component establishes what data can be used.
export const RoomProvider = (props) => {

    const [rooms, setRooms] = useState([])

    const getRooms = () => {
        return fetch("http://localhost:8088/rooms?_expand=location")
        .then(res => res.json())
        .then(setRooms)
    }

    const addRoom = roomObj => {
        return fetch("http://localhost:8088/rooms", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(roomObj)
        })
        .then(getRooms)
    }

    /*
        You return a context provider which has the
        `rooms` state, `getRooms` function,
        and the `addroom` function as keys. This
        allows any child elements to access them.
    */
    return (
        <RoomContext.Provider value={{
            rooms, getRooms, addRoom
        }}>
            {props.children}
        </RoomContext.Provider>
    )
}