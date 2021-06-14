import React, { useContext, useEffect } from "react"
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


    return (
        <section className="devices">
            {
                devices.map(device => {
                    return (
                        <div className="device" key={devices.id} id={`device--${device.id}`}>
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
    )
}