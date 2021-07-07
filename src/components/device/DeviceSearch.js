//accepts user input to search

import React, { useContext } from "react"
import { DeviceContext } from "./DeviceProvider"
import "./Device.css"

export const DeviceSearch = () => {
  const { setSearchTerms } = useContext(DeviceContext)

  return (
    <>
      <div className="vertical-center">
        <div className="inputSearch">
          Device search:</div>
        <input type="text"
          className="input--search--box"
          onKeyUp={(event) => setSearchTerms(event.target.value)}
          placeholder="Search for a device... " />
      </div>
    </>
  )
}
// this component's sole responsibility is to capture the text from the user. As the user types, you must immediately update the searchTerms state variable in the parent component.