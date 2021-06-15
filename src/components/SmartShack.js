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
                            <article>
                                <div className="device_app"><h2>SmartShack</h2></div>
                                <section className="device_title"> <h2>Where smart devices live with smarter people.</h2>
                                    {/* <div><h3>Begin with adding devices below:</h3></div> */}

                                </section>
                            </article>
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
