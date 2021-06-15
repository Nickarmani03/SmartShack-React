import React, { useContext, useEffect } from "react"
import { MemberContext } from "./MemberProvider"
// import { Avatar1 } from "../../IMG/44554.PNG"
import "./Member.css"
import { useHistory } from 'react-router-dom'

export const MemberList = () => {
    // This state changes when `getmembers()` is invoked below
    const { members, getMembers } = useContext(MemberContext)

    //useEffect - reach out to the world for something
    useEffect(() => {
        console.log("MemberList: useEffect - getMembers")
        getMembers()
    }, [])

    const history = useHistory()
    return (
        <>
        <h2>Family Members</h2>
        <button className="form" onClick={
                () => history.push("/members/create")}>
                Add New Member
            </button>
        <section className="familyMembers">
            {
                members.map(member => {
                    return (
                        <div className="familyMember" key={member.id} id={`member--${member.id}`}>
                            <div className="familyMember__name">
                                Name: {member.name}
                            </div>
                            <div className="familyMember__type">
                                Age: {member.age}
                            </div>
                            {/* <div className="familyMember__type">
                                Picture: <img src={ Avatar1 }/>
                            </div> */}

                        </div>
                    )
                })
            }
        </section>
        
        </>
    )
}