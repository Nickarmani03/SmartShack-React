import React, { useContext, useEffect, useState } from "react"
import { MemberContext } from "../member/MemberProvider"

import "./Member.css"
import { useHistory } from 'react-router-dom';

export const MemberForm = () => {

    const { addMember, getMembers } = useContext(MemberContext)   

    /*
    With React, we do not target the DOM with `document.querySelector()`. Instead, our return (render) reacts to state or props.
  
    Define the intial state of the form inputs with useState()
    */

    const [member, setMember] = useState({
    });

    const history = useHistory();

    /*
    Reach out to the world and get devices state
    and member state on initialization.
    */
    useEffect(() => {
        getMembers()
    }, [])

    //when a field changes, update state. The return will re-render and display based on the values in state
    //Controlled component
    const handleControlledInputChange = (event) => {
        /* When changing a state object or array,
        always create a copy, make changes, and then set state.*/
        const newMember = { ...member }
        /* member is an object with properties.
        Set the property to the new value
        using object bracket notation. */
        newMember[event.target.id] = event.target.value
        // update state
        setMember(newMember)
    }

    const handleClickSavemember = (event) => {
        event.preventDefault() //Prevents the browser from submitting the form

        const memberId = parseInt(member.memberId)
        

        if (memberId === 0) {
            window.alert("Please enter a new member")
        } else {
            //Invoke addmember passing the new member object as an argument
            //Once complete, change the url and display the member list

            const newMember = {
                name: member.name,
                age: member.age,
                email: member.email,
                img: member.img,
            }
            addMember(newMember)
                .then(() => history.push("/members"))
        }
    }

    return (
        <form className="memberForm">
            <h2 className="memberForm__title">New member</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">New member Name:  </label>
                    <input type="text" id="name" required autoFocus className="form-control" placeholder="Enter member Name" value={member.name} onChange={handleControlledInputChange} />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group-age">
                    <label htmlFor="number">Enter Age:  </label>
                    <input type="text" id="age" required autoFocus className="form-control" placeholder="Enter Age" value={member.age} onChange={handleControlledInputChange} />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group-email">
                    <label htmlFor="email">Enter Email:  </label>
                    <input type="text" id="email" required autoFocus className="form-control" placeholder="Enter Email " value={member.eamil} onChange={handleControlledInputChange} />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group-img">
                    <label htmlFor="img">Enter Image:  </label>
                    <input type="img" id="img" required autoFocus className="form-control" placeholder="Enter a photo " value={member.img} onChange={handleControlledInputChange} />
                </div>
            </fieldset>

            {/* <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Device to add:  </label>
                    <select name="deviceId" id="deviceId" className="form-control" value={member.deviceId} onChange={handleControlledInputChange}>
                        <option value="0">Select a device</option>
                        {devices.map(l => (
                            <option key={l.id} value={l.id}>
                                {l.name}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset> */}
            <button className="btn btn-primary" onClick={handleClickSavemember}>
                Save Member
            </button>
        </form>
    )
}