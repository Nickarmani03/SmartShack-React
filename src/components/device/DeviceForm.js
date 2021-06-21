import React, { useContext, useEffect, useState } from "react"
import { RoomContext } from "../room/RoomProvider"
import { DeviceContext } from "./DeviceProvider"
import { MemberContext } from "../member/MemberProvider"
import "./Device.css"
import { useHistory, useParams } from 'react-router-dom';

export const DeviceForm = () => {
  const { addDevice, getDeviceById, updateDevice } = useContext(DeviceContext) // allows it to use the data
  const { rooms, getRooms } = useContext(RoomContext)
  const { members, getMembers } = useContext(MemberContext)

  //for edit, hold on to state of device in this view
  const [device, setDevices] = useState({}) //returns a pair: the current state value and a function that lets you update it.

  //wait for data before button is active
  const [isLoading, setIsLoading] = useState(true);

  const { deviceId } = useParams()// can capture the variable name. 
  // used when there's a dynamic route to capture the primary key at the end of the route in Application views.
// use the useParams hook to deconstruct the deviceId and use it in this component


  const history = useHistory()// force a url change when the button is clicked. returns a value


  //when field changes, update state. This causes a re-render and updates the view.
  //Controlled component
  const handleControlledInputChange = (event) => {
    //When changing a state object or array,
    //always create a copy make changes, and then set state.
    const newDevice = { ...device }
    //device is an object with properties.
    //set the property to the new value
    newDevice[event.target.id] = event.target.value
    //update state
    setDevices(newDevice)
  }

  const handleSaveDevice = () => {
    if (parseInt(device.roomId) === 0) {
      window.alert("Please select a room")
    } else {
      //disable the button - no extra clicks
      setIsLoading(true);
      if (deviceId) {
        //PUT - updates it
        updateDevice({
          id: device.id,
          name: device.name,
          type: device.type,
          imageURL: device.imageURL,
          description: device.description,
          ipAddress: device.ipAddress,
          dateAdded: device.dateAdded,
          roomId: parseInt(device.roomId),
          memberId: parseInt(device.memberId)
        })
          .then(() => history.push(`/devices/detail/${device.id}`))
      } else {
        //POST - adds it
        addDevice({
          name: device.name,
          type: device.type,
          imageURL: device.imageURL,
          description: device.description,
          ipAddress: device.ipAddress,
          dateAdded: device.dateAdded,
          roomId: parseInt(device.roomId),
          memberId: parseInt(device.memberId)
        })
          .then(() => history.push("/devices"))
      }
    }
  }

  // Get members and rooms. If deviceId is in the URL, getDeviceById
  useEffect(() => { //runs initially once. then it will run every time the location state changes
    //when a field changes, update state. The return will re-render and display based on the values in state
    getMembers().then(getRooms).then(() => {
      if (deviceId) {
        getDeviceById(deviceId)
          .then(device => {
            setDevices(device)
            setIsLoading(false)
          })
      } else {
        setIsLoading(false)
      }
    })
  }, [])

  //since state controlls this component, we no longer need
  //useRef(null) or ref

  return (
    <form className="deviceForm">
      <h2 className="deviceForm__title">New device</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="deviceName">Device name: </label>
          <input type="text" id="name" name="name" required autoFocus className="form-control"
            placeholder="device name"
            onChange={handleControlledInputChange}
            value={device.name} />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="name">Type of Device:  </label>
          <input type="text" id="type" name="type" required autoFocus className="form-control" placeholder="device type" value={device.type} onChange={handleControlledInputChange} />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="text">Paste image URL:</label>
          <input type="text" id="imageURL" name="imageURL" required autoFocus className="form-control" placeholder="Image URL from webpage" value={device.imageURL} onChange={handleControlledInputChange} />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="name">Device Description:  </label>
          <input type="text" id="description" required autoFocus className="form-control" placeholder="describe your device" value={device.description} onChange={handleControlledInputChange} />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="name">Device IP Address:  </label>
          <input type="text" id="ipAddress" name="ipAddress" required autoFocus className="form-control" placeholder="ipAddress" value={device.ipAddress} onChange={handleControlledInputChange} />
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <label htmlFor="date">Date Added:  </label>
          <input type="date" id="dateAdded" name="dateAdded" required autoFocus className="form-control" placeholder="Date Added" value={device.dateAdded} onChange={handleControlledInputChange} />
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <label htmlFor="room">Assign to room: </label>
          <select value={device.roomId} name="roomId" id="roomId" className="form-control" onChange={handleControlledInputChange}>
            <option value="0">Select a room</option>
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
          <label htmlFor="member">Family Member: </label>
          <select value={device.memberId} name="" id="memberId" className="form-control" onChange={handleControlledInputChange}>
            <option value="0">Select a member</option>
            {members.map(c => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </fieldset>
      <button className="btn btn-primary"
        disabled={isLoading}
        onClick={event => {
          event.preventDefault() // Prevent browser from submitting the form and refreshing the page
          handleSaveDevice()
        }}>
        {deviceId ? <>Save device</> : <>Add device</>}</button>
      <div> </div>
    </form>
  )
}