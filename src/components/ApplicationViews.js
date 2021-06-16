//responds to the user click for a change in the url
import React from "react"
import { Route } from "react-router-dom"
import { DeviceProvider } from "./device/DeviceProvider"
import { DeviceList } from "./device/DeviceList"
import { MemberProvider } from "./member/MemberProvider"
import { MemberList } from "./member/MemberList"
import { RoomProvider } from "./room/RoomProvider"
import { RoomList } from "./room/RoomList"
import { DeviceForm } from "./device/DeviceForm"
import { RoomForm } from "./room/RoomForm"
import { MemberForm } from "./member/MemberForm"
import { DeviceDetail } from "./device/DeviceDetail"
import { RoomDetail } from "./room/RoomDetail"
import { MemberDetail } from "./member/MemberDetail"

export const ApplicationViews = () => {
    return (
        <>

            <DeviceProvider>
                <Route exact path="/">
                    <DeviceList />
                </Route>
            </DeviceProvider>

            <DeviceProvider>
                <MemberProvider>
                    <RoomProvider>
                        <Route exact path="/devices">
                            <DeviceList />
                        </Route>

                        <Route exact path="/devices/create">
                            <DeviceForm />
                        </Route>

                        <Route exact path="/devices/detail/:deviceId(\d+)">
                            <DeviceDetail />
                        </Route>

                    </RoomProvider>
                </MemberProvider>
            </DeviceProvider>


            <MemberProvider>
                <Route exact path="/members">
                    <MemberList />
                </Route>
                <Route exact path="/members/create">
                    <MemberForm />
                </Route>

                <Route exact path="/members/detail/:memberId(\d+)">
                            <MemberDetail />
                        </Route>
            </MemberProvider>

            <RoomProvider>
                <DeviceProvider>
                    <Route
                        exact path="/rooms">
                        <RoomList />
                    </Route>

                    <Route exact path="/rooms/create">
                        <RoomForm />
                    </Route>

                    <Route
                        exact path="/rooms/detail/:roomId(\d+)">
                        <RoomDetail />
                    </Route>
                </DeviceProvider>
            </RoomProvider>
        </>
    )
}