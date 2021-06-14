import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need data
export const FamilyMemberContext = createContext()

// This component establishes what data can be used.
export const FamilyMemberProvider = (props) => {

    const [familymembers, setFamilyMembers] = useState([])

    const getFamilyMembers = () => {
        return fetch("http://localhost:8088/familymembers?_expand=location")
        .then(res => res.json())
        .then(setFamilyMembers)
    }

    const addFamilyMember = familyMemberObj => {
        return fetch("http://localhost:8088/familymembers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(familyMemberObj)
        })
        .then(getFamilyMembers)
    }

    /*
        You return a context provider which has the
        `FamilyMembers` state, `getFamilyMembers` function,
        and the `addFamilyMember` function as keys. This
        allows any child elements to access them.
    */
    return (
        <FamilyMemberContext.Provider value={{
            familymembers, getFamilyMembers, addFamilyMember
        }}>
            {props.children}
        </FamilyMemberContext.Provider>
    )
}