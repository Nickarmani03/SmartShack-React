import React from "react"
import { NavBar } from "./nav/NavBar"
import { ApplicationViews } from "./ApplicationViews"
import "./SmartShack.css"

export const SmartShack = () => {
   return(
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
)
}