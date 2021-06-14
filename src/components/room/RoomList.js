import React, { useContext, useEffect } from "react"
import { RoomContext } from "./RoomProvider"
import "./Room.css"

export const RoomList = () => {
    // This state changes when `getrooms()` is invoked below
    const { rooms, getRooms } = useContext(RoomContext)

    //useEffect - reach out to the world for something
    useEffect(() => {
        console.log("RoomList: useEffect - getRooms")
        getRooms()
    }, [])


    return (
        <section className="rooms">
            {
                rooms.map(room => {
                    return (
                        <div className="room" key={room.id} id={`room--${room.id}`}>
                            <div className="room__name">
                                Name: {room.name}
                            </div>
                            <div className="room__type">
                                Type: {room.type}
                            </div>
                            
                        </div>
                    )
                })
            }
        </section>
    )
}