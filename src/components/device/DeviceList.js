import React, { useState, useContext, useEffect } from "react"
import { useHistory } from 'react-router-dom'
// import { Link } from "react-router-dom"
import { DeviceContext } from "./DeviceProvider"
import { DeviceDetail } from "./DeviceDetail"
import "./Device.css"

export const DeviceList = () => {
    // This state changes when `getdevices()` is invoked below
    const { devices, getDevices, searchTerms } = useContext(DeviceContext)
    //deconstructs objects from the context from the provider.js

    // Since you are no longer ALWAYS displaying all of the devices
    const [filteredDevices, setFiltered] = useState([])
    const history = useHistory()

    // Empty dependency array - useEffect only runs after first render
    useEffect(() => {
        getDevices()
    }, [])

    useEffect(() => {
        if (searchTerms !== "") {

            // If the search field is not blank, display matching devices
            const subset = devices.filter(device => device.name.toLowerCase().includes(searchTerms.toLowerCase()) //filter returns an array of objects with the matching results
            )
            setFiltered(subset)
        } else {
            // If the search field is blank, display all devices
            setFiltered(devices)
        }
    }, [searchTerms, devices])

//returns the JSX. use an explicit return return()
    return (// for <>  JSX expressions can only return one JSX componet for every function. cannot do 2 siblings. you need to use a empty component called a fragment. an unnamed element.
        //.map inside of JSX when you need to iterate an array of objects and convert them into an array of JSX. passed to an device object
        // no dollar signs needed to interpolate in JSX {device.type}
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
                    filteredDevices.map(device => {
                        return <DeviceDetail key={device.id} device={device} />
                    })
                }
            </section>

        </>
    )
}