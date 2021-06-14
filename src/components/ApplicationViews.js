//responds to the user click for a change in the url
import React from "react"
import { Route } from "react-router-dom"
import { DeviceProvider } from "./device/DeviceProvider"
import { DeviceList } from "./device/DeviceList"
import { FamilyMemberProvider } from "./familymember/FamilyMemberProvider"
import { FamilyMemberList } from "./familymember/FamilyMemberList"
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

            
            <FamilyMemberProvider>
                <Route path="/familymember">
                    <FamilyMemberList />
                </Route>
            </FamilyMemberProvider>

            <RoomProvider>
                <Route path="/room">
                    <RoomList />
                </Route>
            </RoomProvider>
        </>
    )
}