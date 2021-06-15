import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need data
export const DeviceContext = createContext()

// This component establishes what data can be used.
export const DeviceProvider = (props) => {

    const [devices, setDevices] = useState([])

    const getDevices = () => {
        return fetch("http://localhost:8088/devices?_expand=room")
            .then(res => res.json())
            .then(setDevices)
    }

    const addDevice = deviceObj => {
        return fetch("http://localhost:8088/devices", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(deviceObj)
        })
            .then(response => response.json())
    }

    /*
        You return a context provider which has the
        `devices` state, `getdevices` function,
        and the `adddevice` function as keys. This
        allows any child elements to access them.
    */
    return (
        <DeviceContext.Provider value={
            { devices, getDevices, addDevice }
        }>{props.children}
        </DeviceContext.Provider>
    )
}