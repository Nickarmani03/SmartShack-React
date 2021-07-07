import React, { useContext, useEffect, useState } from "react"
import { MemberContext } from "../member/MemberProvider"
import { useHistory, useParams } from 'react-router-dom';
import "./Member.css"

export const MemberForm = () => {
  const { addMember, getMembers, updateMember, getMemberById } = useContext(MemberContext)

  /*
  With React, we do not target the DOM with `document.querySelector()`. Instead, our return (render) reacts to state or props.
 
  Define the intial state of the form inputs with useState()
  */


  //for edit, hold on to state of member in this view
  const [member, setMembers] = useState({})
  //wait for data before button is active
  const [isLoading, setIsLoading] = useState(true)

  const { memberId } = useParams()

  const history = useHistory()



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
    setMembers(newMember)
  }


  const handleSaveMember = () => {
    if (member.memberId === 0) {
      window.alert("Please Enter a New Member")
    } else {
      //disable the button - no extra clicks
      setIsLoading(true);
      if (memberId) {
        //PUT - update
        updateMember({
          id: member.id,
          name: member.name,
          age: member.age,
          email: member.email,
          imageURL: member.imageURL,

        })
          .then(() => history.push(`/members/detail/${member.id}`))
      } else {
        //POST - add
        addMember({
          name: member.name,
          age: member.age,
          email: member.email,
          imageURL: member.imageURL,
        })
          .then(() => history.push("/members"))
      }
    }
  }

  // Get customers and locations. If memberId is in the URL, getMemberById
  useEffect(() => {
    getMembers().then(() => {
      if (memberId) {
        getMemberById(memberId)
          .then(member => {
            setMembers(member)
            setIsLoading(false)
          })
      } else {
        setIsLoading(false)
      }
    })
  }, [])
  return (

    <form className="memberForm">
      <h2 className="memberForm__title"> Member</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="name"> Member's Name:  </label>
          <input type="text" id="name" required autoFocus className="form-control" placeholder="Enter a Member's Name" value={member.name} onChange={handleControlledInputChange} />
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group-age">
          <label htmlFor="number">Enter Member's Age:  </label>
          <input type="text" id="age" required autoFocus className="form-control" placeholder="Enter Age" value={member.age} onChange={handleControlledInputChange} />
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group-email">
          <label htmlFor="email">Add an Email:  </label>
          <input type="text" id="email" required autoFocus className="form-control" placeholder="Enter an Email " value={member.email} onChange={handleControlledInputChange} />
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group-img">
          <label htmlFor="text">Add an Image:  </label>
          <input type="text" id="imageURL"
            name="imageURL" required autoFocus className="form-control" placeholder="Enter a Photo " value={member.imageURL} onChange={handleControlledInputChange} />
        </div>
      </fieldset>

      <button className="btn btn-primary"
        disabled={isLoading}
        onClick={event => {
          event.preventDefault() // Prevent browser from submitting the form and refreshing the page
          handleSaveMember()
        }}>
        {memberId ? <>Save Family Member</> : <>Add Family Member</>}</button>
    </form>
  )
}