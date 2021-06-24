import React from "react"
import { Route, Redirect } from "react-router-dom";
import { NavBar } from "./nav/NavBar"
import { ApplicationViews } from "./ApplicationViews"
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import "./SmartShack.css"

export const SmartShack = () => (
    <>
        <Route
            render={() => {
                if (localStorage.getItem("smartshack_member")) {
                    return (
                        <>
                            
                                <div className="smartshack_app">SmartShack</div>

                                <section className="device_title"> <h2>Where smart devices live with smarter people.</h2>
                                   

                                </section>
                            
                            <NavBar />
                            <ApplicationViews />
                        </>
                    );
                } else {
                    return <Redirect to="/login" />;
                }
            }}
        />
        <Route path="/login">
            <Login />
        </Route>
        <Route path="/register">
            <Register />
        </Route>
    </>
)
