import React, { useContext, useEffect, useState } from "react"
import { RoomContext } from "./RoomProvider"
import "./Room.css"
import { useParams, useHistory } from "react-router-dom"

export const RoomDetail = () => {
    const { getRoomById, releaseRoom } = useContext(RoomContext)
    const [room, setRooms] = useState({  devices: [] })
// members: [],

    // hook function useParams() allows code to read route parameter from URL
    const { roomId } = useParams() // use when there's a dynamic route.

    // dependency stops once device id is found
    useEffect(() => {
        getRoomById(parseInt(roomId)
        ).then(room => { setRooms(room) })
    }, [roomId])


    const history = useHistory()

    const handleRelease = () => {
        releaseRoom(room.id).then(() => {
          history.push("/rooms");
        })
      }

    return (
<>
        <style>{'body { background-image: url(https://images.unsplash.com/photo-1514803400321-3ca29fc47334?ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8c21hcnQlMjBob3VzZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80); }'}</style>

        <section className="room" key={room.id}>

            <h3 className="room__name"> {room.name} </h3>
            {/* <div className="room__members">
                <h3>Family Members: {room.members.length}</h3>
                {room.members.map((member) => (
                    <div>{member.name}</div>
                ))}
            </div> */}
            <div className="room__devices" key={room.id}>
                <h3>Devices: {room.devices.length}</h3>
                {room.devices.map((device) => (
                    <div className="room__device__name"> {device.name}</div>
                ))}
            </div>
            <button onClick={() => {
                history.push(`/rooms/edit/${room.id}`)
            }}>Edit</button>
             <button onClick={handleRelease}>Remove Room</button>
        </section>
        </>
    )
}