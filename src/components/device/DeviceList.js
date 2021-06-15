import React, { useContext, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import { DeviceContext } from "./DeviceProvider"
import "./Device.css"

export const DeviceList = () => {
    // This state changes when `getdevices()` is invoked below
    const { devices, getDevices } = useContext(DeviceContext) //deconstructs objects from the context from the provider.js

    //useEffect - reach out to the world for something
    useEffect(() => {// use effect must have a function
        console.log("deviceList: useEffect - getDevices")
        getDevices()
    }, [])

    const history = useHistory()

    return (
        <>
            <h2>Devices</h2>
          
            <section className="devices">
                {
                    devices.map(device => {
                        return (
                            <div className="device" key={device.id} id={`device--${device.id}`}>
                                <div className="device__name">
                                    Name: {device.name}
                                </div>
                                <div className="device__type">
                                    Type: {device.type}
                                </div>
                                <div className="device__roomID">
                                    Room: {device.roomId}
                                </div>
                            </div>
                        )
                    })
                }
            </section>
            <button onClick={
                () => history.push("/devices/create")
            }>
                Add New Device
            </button>
        </>
    )
}