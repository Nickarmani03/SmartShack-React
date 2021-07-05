import React, { useContext, useEffect } from "react"
import { MemberContext } from "./MemberProvider"
import { Link } from "react-router-dom"
// import { Avatar1 } from "../../IMG/44554.PNG"
import "./Member.css"
import { useHistory } from 'react-router-dom'

export const MemberList = () => {
    // This state changes when `getMembers()` is invoked below
    const { members, getMembers } = useContext(MemberContext)

    //useEffect - reach out to the world for something
    useEffect(() => {
        console.log("MemberList: useEffect - getMembers")
        getMembers()
    }, [])

    const history = useHistory()
    return (
        <>
        {/* <style>{'body { background-image: url(https://www.lefthudson.com/wp-content/uploads/2019/11/black-wood-wallpaper-elegant-35-hd-wood-wallpapers-backgrounds-for-free-download-ideas-of-black-wood-wallpaper.jpg); }'}</style>  */}

        <h2>Family Members</h2>
        <div className="vertical-center">
        <button className="form" onClick={
                () => history.push("/members/create")}>
                Add New Member
            </button>
            </div>
        <section className="members"> 
                {
                    members.map(member =>  
                    <div className="member" key={member.id} id={`member--${member.id}`}>
                    <div className="members__name">
                    <Link to={`/members/detail/${member.id}`}>
                          { member.name }
                        </Link>
                        </div>
                        </div>
                )
            }
        </section>
        
        </>
    )
}