import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need data
export const MemberContext = createContext()

// This component establishes what data can be used.
export const MemberProvider = (props) => {

    const [members, setMembers] = useState([])

    const getMembers = () => {
        return fetch("http://localhost:8088/members?_expand=location")
            .then(res => res.json())
            .then(setMembers)
    }

    const addMember = memberObj => {
        return fetch("http://localhost:8088/members", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(memberObj)
        })
            .then(getMembers)
    }

    /*
        You return a context provider which has the
        `FamilyMembers` state, `getFamilyMembers` function,
        and the `addFamilyMember` function as keys. This
        allows any child elements to access them.
    */
    return (
        <MemberContext.Provider value={{
            members, getMembers, addMember
        }}>
            {props.children}
        </MemberContext.Provider>
    )
}