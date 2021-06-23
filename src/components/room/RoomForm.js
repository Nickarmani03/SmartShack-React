import React, { useContext, useEffect, useState } from "react"
import { RoomContext } from "../room/RoomProvider"
import { DeviceContext } from "../device/DeviceProvider"
import "./Room.css"
import { useHistory } from 'react-router-dom';

export const RoomForm = () => {
    const { addRoom, getRooms } = useContext(RoomContext)
    const { devices, getDevices } = useContext(DeviceContext)

    /*
    With React, we do not target the DOM with `document.querySelector()`. Instead, our return (render) reacts to state or props.
  
    Define the intial state of the form inputs with useState()
    */

    const [room, setRooms] = useState({
    });

    const history = useHistory();

    /*
    Reach out to the world and get devices state
    and room state on initialization.
    */
    useEffect(() => {
        getDevices().then(getRooms)
    }, [])

    //when a field changes, update state. The return will re-render and display based on the values in state
    //Controlled component
    const handleControlledInputChange = (event) => {
        /* When changing a state object or array,
        always create a copy, make changes, and then set state.*/
        const newRoom = { ...room }
        /* room is an object with properties.
        Set the property to the new value
        using object bracket notation. */
        newRoom[event.target.id] = event.target.value
        // update state
        setRooms(newRoom)
    }

    const handleClickSaveRoom = (event) => {
        event.preventDefault() //Prevents the browser from submitting the form

        const roomId = parseInt(room.roomId)
        const deviceId = parseInt(room.deviceId)

        if (roomId === 0 || deviceId === 0) {
            window.alert("Please select a room and a family device")
        } else {
            //Invoke addRoom passing the new room object as an argument
            //Once complete, change the url and display the room list

            const newRoom = {
                name: room.name,
                // device: device.name,
                deviceId: parseInt(room.deviceId)
            }
            addRoom(newRoom)
                .then(() => history.push("/rooms"))
        }
    }

    return (
        <>
            <form className="roomForm">
                <h2 className="roomForm__title">New Room</h2>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="name">New Room Name:  </label>
                        <input type="text" id="name" required autoFocus className="form-control" placeholder="Enter Room Name" value={room.name} onChange={handleControlledInputChange} />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="name">Device to add:  </label>
                        <select name="deviceId" id="deviceId" className="form-control" value={room.deviceId} onChange={handleControlledInputChange}>
                            <option value="0">Select a device</option>
                            {devices.map(l => (
                                <option key={l.id} value={l.id}>
                                    {l.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </fieldset>
                <button className="btn btn-primary" onClick={handleClickSaveRoom}>
                    Save room
                </button>
            </form>
        </>
    )
}