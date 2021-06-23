import React, { useContext, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import { Link } from "react-router-dom"
import { RoomContext } from "./RoomProvider"
import "./Room.css"



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
           <style>{'body { background-image: url(https://www.vastuwiki.com/wp-content/uploads/2016/06/house-high-quality-wallpaper_015636679_148.jpg); }'}</style> 
           <h2>Rooms</h2>
            <div className="vertical-center">
            
                <button onClick={
                    () => history.push("/rooms/create")}>
                    Add New Room
                </button>
            </div>
            <section className="rooms">
                {
                    rooms.map(room =>
                        <div className="room" key={room.id} id={`room--${room.id}`}>
                            <div className="rooms__name"></div>
                            <Link to={`/rooms/detail/${room.id}`}>
                                {room.name}
                            </Link>
                        </div>
                        

                    )
                }
            </section>
        </>
    )
}