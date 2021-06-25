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
import { DeviceSearch } from "./device/DeviceSearch"

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
                       

                        <Route exact path="/devices/create">
                            <DeviceForm />
                        </Route>

                        <Route exact path="/devices/detail/:deviceId(\d+)">
                            {/* the colon means to capture whats here and assign it to deviceId */}
                            {/* only capture it if its a number for the \d for the details and then a number in the browswer*/}
                            <DeviceDetail />
                        </Route>

                        <Route exact path="/devices/edit/:deviceId(\d+)">
                            <DeviceForm />
                        </Route>

                        <Route exact path="/devices">
                            <DeviceSearch />
                            <DeviceList />
                        </Route>

                    </RoomProvider>
                </MemberProvider>
            </DeviceProvider>


            <MemberProvider>
                <RoomProvider>
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
                </RoomProvider>
            </MemberProvider>

            <RoomProvider>
                <DeviceProvider>
                    <MemberProvider>
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
                    </MemberProvider>
                </DeviceProvider>
            </RoomProvider>
        </>
    )
}

//this page routes between components and makes different context available between those components

// it provides the devices and members to those different routes. 