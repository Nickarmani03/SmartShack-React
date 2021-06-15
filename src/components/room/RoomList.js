import React, { useContext, useEffect } from "react"
import { RoomContext } from "./RoomProvider"
import "./Room.css"
import { useHistory } from 'react-router-dom'

export const RoomList = () => {
    // This state changes when `getRooms()` is invoked below
    const { rooms, getRooms } = useContext(RoomContext)

    //useEffect - reach out to the world for something
    useEffect(() => {
        console.log("RoomList: useEffect - getRooms")
        getRooms()
    }, [])
    const history = useHistory()

    return (
        <>
            <h2>Rooms</h2> 
            <button className="form" onClick={
                () => history.push("/rooms/create")}>
                Add New Room
            </button>
            <section className="rooms">{
                    rooms.map(room => {
                        return (
                            <div className="room" key={room.id} id={`room--${room.id}`}>
                                <div className="room__name">
                                    Name: {room.name}
                                </div>
                                <div className="room__device">
                                    Device: {room.deviceId}
                                </div>
                            </div>
                        )
                    })
                }
            </section>
           
        </>
    )
}