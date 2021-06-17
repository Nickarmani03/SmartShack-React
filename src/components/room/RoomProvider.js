import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need data
export const RoomContext = createContext()

// This component establishes what data can be used.
export const RoomProvider = (props) => {

    const [rooms, setRooms] = useState([])

    const getRooms = () => {
        return fetch("http://localhost:8088/rooms?_embed=members&_embed=devices") // & is a way to limit the response returned
        .then(res => res.json())
        .then(setRooms) //changes the variable. updates the state
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
    const releaseRoom = roomId => {
        return fetch(`http://localhost:8088/rooms/${roomId}`, {
            method: "DELETE"
        })
            .then(getRoomById)
    }

    const getRoomById = (roomId) => {
        return fetch(
          `http://localhost:8088/rooms/${roomId}?_embed=members&_embed=devices`
        ).then((res) => res.json());
      };

    /*
        You return a context provider which has the
        `rooms` state, `getRooms` function,
        and the `addroom` function as keys. This
        allows any child elements to access them.
    */
    return (
        <RoomContext.Provider value={
            { rooms, getRooms, addRoom, getRoomById, releaseRoom }
        }>
            {props.children}
        </RoomContext.Provider>
    )
}