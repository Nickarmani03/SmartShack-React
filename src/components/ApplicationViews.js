//responds to the user click for a change in the url
import React from "react"
import { Route } from "react-router-dom"
import { DeviceProvider } from "./device/DeviceProvider"
import { DeviceList } from "./device/DeviceList"
import { MemberProvider } from "./member/MemberProvider"
import { MemberList } from "./member/MemberList"
import { RoomProvider } from "./room/RoomProvider"
import { RoomList } from "./room/RoomList"

export const ApplicationViews = () => {
    return (
        <>
           
            <DeviceProvider>
                <Route exact path="/">
                    <DeviceList />
                </Route>
            </DeviceProvider>

            <DeviceProvider>
                <Route exact path="/devices">
                    <DeviceList />
                </Route>
            </DeviceProvider>

            
            <MemberProvider>
                <Route path="/members">
                    <MemberList />
                </Route>
            </MemberProvider>

            <RoomProvider>
                <Route path="/rooms">
                    <RoomList />
                </Route>
            </RoomProvider>
        </>
    )
}