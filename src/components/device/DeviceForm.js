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

  //wait for data before button is active. disables the button from submitting a blank form
  const [isLoading, setIsLoading] = useState(true);

  // const [bluetoothChecked, setBluetoothChecked] = useState(false);  

  // const [wifiChecked, setWifiChecked] = useState(false);


  // function getFormData(event)
  // {
  //   console.warn(bluetoothChecked, wifiChecked)
  //   event.preventDefault()
  // }



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

  const handleIsBluetooth = () => {
    const newDevice = { ...device }

    newDevice.isBluetooth = !newDevice.isBluetooth

    setDevices(newDevice)
  }


  const handleIsWifi = () => {
    const newDevice = { ...device }

    newDevice.isWifi = !newDevice.isWifi

    setDevices(newDevice)
  }


    const handleSaveDevice = () => {
      if (parseInt(device.roomId) === 0) {
        window.alert("Please select a room")
      } else {
        //disable the button - no extra clicks
        setIsLoading(true);
        if (deviceId) {
          // the PUT - updates it
          updateDevice({
            id: device.id,
            name: device.name,
            type: device.type,
            imageURL: device.imageURL,
            description: device.description,
            ipAddress: device.ipAddress,
            dateAdded: device.dateAdded,
            isBluetooth: device.isBluetooth,
            isWifi: device.isWifi,
            roomId: parseInt(device.roomId),
            memberId: parseInt(device.memberId)
          })
            .then(() => history.push(`/devices/detail/${device.id}`))
        } else {
          //the POST - adds it
          addDevice({
            name: device.name,
            type: device.type,
            imageURL: device.imageURL,
            description: device.description,
            ipAddress: device.ipAddress,
            dateAdded: device.dateAdded,
            isBluetooth: device.isBluetooth,
            isWifi: device.isWifi,
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
            .then(device => {//the response is the device Object
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
        
        <style>{'body { background-image: url(https://www.vastuwiki.com/wp-content/uploads/2016/06/house-high-quality-wallpaper_015636679_148.jpg); }'}</style> 

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
            <label htmlFor="isBluetooth">Is this device Bluetooth connected?</label>
            <input type="checkbox" id="isBluetooth" name="isBluetooth" checked={device.isBluetooth} required autoFocus
              className="form-control" placeholder="is the device Bluetooth"
              onChange={handleIsBluetooth} />
          </div>
        </fieldset>
        {/* 
      <fieldset>
        <div className="form-group">
          <label htmlFor = "isWifi"><input 
            type="checkbox" value= {device.isWifi} name= "isWifi" id="isWifi" onChange={(event)=> setWifiChecked(event.target.checked)}/><span>Is this device Wifi?</span>
            </label>
        </div>
      </fieldset> */}

        {/* <fieldset> 
      <div> 
      <label><input type="checkbox" value="checked" onChange = {(e) => this.setState({check: !check.value})}/> Checkbox </label>
    </div>
    </fieldset> */}

        <fieldset>
          <div className="form-group">
            <label htmlFor="isWifi">Is this device Wifi connected?</label>
            <input type="checkbox" id="isWifi" name="isWifi" checked={device.isWifi} required autoFocus
              className="form-control" placeholder="is the device Wifi"
              onChange={handleIsWifi} />
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
