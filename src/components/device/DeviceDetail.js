import React, { useContext, useEffect, useState } from "react"
import { DeviceContext } from "./DeviceProvider"
import "./Device.css"
import { useParams } from "react-router-dom"

export const DeviceDetail = () => {
    const { devices } = useContext(DeviceContext)
    const [ device, setDevice ] = useState({ room: {}, member: {} })

    /*
        Given the example URL above, this will store the value
        of 5 in the deviceId variable
    */
    const { deviceId } = useParams();


    useEffect(() => {
        const thisDevice = devices.find(a => a.id === deviceId) || { room: {}, member: {} }

        setDevice(thisDevice)}, [deviceId])

    return (
    <section className="devices">
        <h3 className="device__name">{ device.name }</h3>
        <div className="device__breed">{ device.type}</div>
        <div className="device__room">Room: { device.room.name }</div>
        <div className="device__owner">Member: { device.member.name }</div>
    </section>
    )
}