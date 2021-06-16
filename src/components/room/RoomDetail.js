import React, { useContext, useEffect, useState } from "react"
import { RoomContext } from "./RoomProvider"
import "./Room.css"
import { useParams, useHistory } from "react-router-dom"

export const RoomDetail = () => {
    const { getRoomById } = useContext(RoomContext)
    const [room, setRoom] = useState({ members: [], devices: [] })


    // hook function useParams() allows code to read route parameter from URL
    const { roomId } = useParams() // use when there's a dynamic route.

    // dependency stops once device id is found
    useEffect(() => {
        getRoomById(parseInt(roomId)
        ).then(room => { setRoom(room) })
    }, [roomId])


    const history = useHistory()

    return (
        <section className="room" key={room.id}>
            <h3 className="room__name"> {room.name} </h3>
            {/* <div className="room__address"> {room.address} </div> */}
            <div className="room__members">
                <h3>members: </h3>
                {room.members.map(member =>
                    <div className="room__member__name"> {member.name} </div>
                )}
            </div>
            <div className="room__devices" key={room.id}>
                <h3>Current devices:</h3>
                {room.devices.map(device =>
                    <div className="room__device__name"> {device.name} </div>
                )}
            </div>
            <button onClick={() => {
                history.push(`/rooms/edit/${room.id}`)
            }}>Edit</button>
        </section>
    )
}