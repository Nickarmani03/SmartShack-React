import React, { useContext, useEffect, useState } from "react"
import { MemberContext } from "./MemberProvider"
import "./Member.css"
import { useParams, useHistory } from "react-router-dom"

export const MemberDetail = () => {
    const { members } = useContext(MemberContext)
    const [ member, setMember ] = useState({ room: {}})

    /*
        Given the example URL above, this will store the value
        of 5 in the memberId variable
    */
    const { memberId } = useParams()

    const history = useHistory()

    useEffect(() => {
        const thisMember = members.find(a => a.id === memberId) || { room: {}}

        setMember(thisMember)}, [memberId])

    return (
        <section className="member" key={member.id}>
        <h3 className="member__name"> {member.name} </h3>
        <div className="member__room"> Room: {member.room.name} </div>
        {/* <button onClick={() => {
            history.push(`/members/edit/${member.id}`)
        }}>Edit</button> */}
    </section>
    )
}