import React, { useState, useContext, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import { Link } from "react-router-dom"
import { DeviceContext } from "./DeviceProvider"
import "./Device.css"

export const DeviceList = () => {
    // This state changes when `getdevices()` is invoked below
    const { devices, getDevices } = useContext(DeviceContext) 
    //deconstructs objects from the context from the provider.js

    //useEffect - reach out to the world for something
    useEffect(() => {// use effect must have a function
        console.log("deviceList: useEffect - getDevices")
        getDevices()
    }, [])

    const history = useHistory()

    return (
        <>
            <h2>Devices</h2>
            <div className="vertical-center">
                <button onClick={() => history.push("/devices/create")
                }>
                    Add New Device
                </button>
            </div>
            <section className="devices">
                {
                    devices.map(device =>
                        <div className="device" key={device.id} id={`device--${device.id}`}>
                            <div className="devices__name"></div>
                            <Link to={`/devices/detail/${device.id}`}>
                                {device.name}
                            </Link>
                        </div>
                    )
                }
            </section>

        </>
    )
}