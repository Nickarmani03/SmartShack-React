import React, { useContext, useEffect, useState } from "react"
import { DeviceContext } from "./DeviceProvider"
import "./Device.css"
import { useParams, useHistory } from "react-router-dom"


export const DeviceDetail = ({ device }) => {
    const { getDeviceById, releaseDevice } = useContext(DeviceContext);
    const [myDevice, setDevices] = useState({ room: {}, member: {} });
  
    const { deviceId } = useParams()
    
  
    useEffect(() => {
      if (deviceId) {        
        getDeviceById(parseInt(deviceId)).then((deviceObj) => {
          setDevices(deviceObj)
        });
      } else {
        setDevices(device)
      }
    }, [deviceId])
  
    const history = useHistory()
  
    const handleRelease = () => {
      releaseDevice(myDevice.id).then(() => {
        history.push("/devices");
      })
    }
  
    return (
        <section className="device" key={myDevice.id}>
            <h3 className="device__name">Name: {myDevice.name}</h3>
            <div className="device__type">Type:{myDevice.type}</div>
            <div className="device__room">Room: {myDevice.room.name}</div>
            <div className="device__owner">Member: {myDevice.member.name}</div>
            <button onClick={handleRelease}>Remove Device</button>
        </section>
    )
}