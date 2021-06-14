import React, { useContext, useEffect } from "react"
import { FamilyMemberContext } from "./FamilyMemberProvider"
import "./FamilyMember.css"

export const FamilyMemberList = () => {
    // This state changes when `getfamilymembers()` is invoked below
    const { familyMembers, getFamilyMembers } = useContext(FamilyMemberContext)

    //useEffect - reach out to the world for something
    useEffect(() => {
        console.log("FamilyMemberList: useEffect - getFamilyMembers")
        getFamilyMembers()
    }, [])


    return (
        <section className="familyMembers">
            {
                familyMembers.map(familyMember => {
                    return (
                        <div className="familyMember" key={familyMember.id} id={`familyMember--${familyMember.id}`}>
                            <div className="familyMember__name">
                                Name: {familyMember.name}
                            </div>
                            <div className="familyMember__type">
                                Type: {familyMember.type}
                            </div>
                            
                        </div>
                    )
                })
            }
        </section>
    )
}