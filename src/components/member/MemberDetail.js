import React, { useContext, useEffect, useState } from "react"
import { MemberContext } from "./MemberProvider"
import "./Member.css"
import { useParams, useHistory } from "react-router-dom"

export const MemberDetail = () => {
    const { getMemberById, releaseMember } = useContext(MemberContext)
    const [myMember, setMembers] = useState({ room: {} })


    const { memberId } = useParams()// url of members

    useEffect(() => {
        if (memberId) {
            getMemberById(parseInt(memberId)).then((memberObj) => {
                setMembers(memberObj)
            });
        } else { setMembers(myMember) }
    }, [memberId]);

    const history = useHistory()

    const handleRelease = () => {
        releaseMember(myMember.id).then(() => {
            history.push("/members");
        })
    }

    const member = parseInt(localStorage.getItem("smartshack_member"))

    return (
        <section className="member" key={myMember.id}>

            <h3 className="member__name"> {myMember.name} </h3>
            <div className="member__imageURL">
                <img src={myMember.imageURL} alt="member image" /></div>
            <div className="member__email"> Email: {myMember.email} </div>
            <div className="member__type">Age: {myMember.age}</div>

            {member === myMember.id ? <button onClick={() => {
                handleRelease()
            }}>Remove Family Member</button> : <div></div>}

            {member === myMember.id ?
                <button onClick={() => {
                    history.push(`/members/edit/${myMember.id}`)
                }}>  Edit Member </button> : <div></div>}

        </section>
    )
}