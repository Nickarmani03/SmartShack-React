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

    return (
        <section className="member" key={myMember.id}>

            <h3 className="member__name"> {myMember.name} </h3>
            <div className="member__imageURL">
                <img src={myMember.imageURL} alt="member image" /></div>
            <div className="member__email"> Email: {myMember.email} </div>
            <div className="member__type">Age: {myMember.age}</div>
            <button onClick={handleRelease}>Remove Family Member</button>

            <button onClick={() => {
                history.push(`/members/edit/${myMember.id}`)
            }}>Edit</button>

        </section>
    )
}