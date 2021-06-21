import React, { useContext, useEffect, useState } from "react"
import { MemberContext } from "./MemberProvider"
import "./Member.css"
import { useParams, useHistory } from "react-router-dom"

export const MemberDetail = () => {
    const { getMemberById, releaseMember } = useContext(MemberContext)
    const [myMember, setMembers] = useState({ room: {} })


    const { memberId } = useParams()



    useEffect(() => {
        getMemberById(parseInt(memberId)
        ).then(member => { setMembers(member) })
    }, [memberId])

    const history = useHistory()

    const handleRelease = () => {
        releaseMember(myMember.id).then(() => {
            history.push("/members");
        })
    }

    return (
        <section className="member" key={myMember.id}>
            <h3 className="member__name"> {myMember.name} </h3>
            <div className="member__type">
                <div><img src={myMember.imageURL} alt="member image" />
                </div></div>
            <div className="member__email"> Email: {myMember.email} </div>
            <div className="member__type">age: {myMember.age}</div>
            <button onClick={handleRelease}>Remove Family Member</button>
            {/* <button onClick={() => {
            history.push(`/members/edit/${member.id}`)
        }}>Edit</button> */}
        </section>
    )
}