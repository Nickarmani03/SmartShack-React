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
          {/* <style>{'body { background-image: url(https://www.lefthudson.com/wp-content/uploads/2019/11/black-wood-wallpaper-elegant-35-hd-wood-wallpapers-backgrounds-for-free-download-ideas-of-black-wood-wallpaper.jpg); }'}</style>  */}
           
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