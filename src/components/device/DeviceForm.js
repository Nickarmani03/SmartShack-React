import React, { useContext, useEffect, useState } from "react"
import { RoomContext } from "../room/RoomProvider"
import { DeviceContext } from "../device/DeviceProvider"
import { MemberContext } from "../member/MemberProvider"
import "./Device.css"
import { useHistory } from 'react-router-dom';

export const DeviceForm = () => {
    const { addDevice } = useContext(DeviceContext)
    const { rooms, getRooms } = useContext(RoomContext)
    const { members, getMembers } = useContext(MemberContext)

    /*
    With React, we do not target the DOM with `document.querySelector()`. Instead, our return (render) reacts to state or props.
  
    Define the intial state of the form inputs with useState()
    */

    const [device, setDevice] = useState({
        name: "",
        type: "",
        roomId: 0,
        memberId: 0
    });

    const history = useHistory();

    /*
    Reach out to the world and get members state
    and room state on initialization.
    */
    useEffect(() => {
        getMembers().then(getRooms)
    }, [])

    //when a field changes, update state. The return will re-render and display based on the values in state
    //Controlled component
    const handleControlledInputChange = (event) => {
        /* When changing a state object or array,
        always create a copy, make changes, and then set state.*/
        const newDevice = { ...device }
        /* device is an object with properties.
        Set the property to the new value
        using object bracket notation. */
        newDevice[event.target.id] = event.target.value
        // update state
        setDevice(newDevice)
    }

    const handleClickSavedevice = (event) => {
        event.preventDefault() //Prevents the browser from submitting the form

        const roomId = parseInt(device.roomId)
        const memberId = parseInt(device.memberId)

        if (roomId === 0 || memberId === 0) {
            window.alert("Please select a room and a family member")
        } else {
            //Invoke addDevice passing the new device object as an argument
            //Once complete, change the url and display the device list

            const newDevice = {
                name: device.name,
                type: device.type,
                roomId: roomId,
                memberId: memberId
            }
            addDevice(newDevice)
                .then(() => history.push("/devices"))
        }
    }

    return (
        <>
            <form className="DeviceForm">
                <h2 className="deviceForm__title">Have a new Device?</h2>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="name">Device name:  </label>
                        <input type="text" id="name" required autoFocus className="form-control" placeholder="device name" value={device.name} onChange={handleControlledInputChange} />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="name">Device type:  </label>
                        <input type="text" id="type" required autoFocus className="form-control" placeholder="device type" value={device.type} onChange={handleControlledInputChange} />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="room">Assign to a Room:   </label>
                        <select name="roomId" id="roomId" className="form-control" value={device.roomId} onChange={handleControlledInputChange}>
                            <option value="0">Select a Room</option>
                            {rooms.map(l => (
                                <option key={l.id} value={l.id}>
                                    {l.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="memberId">Family Member: </label>
                        <select name="" id="memberId" className="form-control" value={device.memberId} onChange={handleControlledInputChange}>
                            <option value="0">Select a Family Member</option>
                            {members.map(c => (
                                <option key={c.id} value={c.id}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </fieldset>
                <button className="btn btn-primary" onClick={handleClickSavedevice}>
                    Save Device
                </button>
            </form>
        </>

    )
}