//provider modules maintains the application state. The provider components handle all interactions with the database+
//State is reserved only for interactivity, that is, data that changes over time. 

import React, { useState, createContext } from "react"// useState  to hold and set the array of devices.


// The context is imported and used by individual components that need data
export const DeviceContext = createContext()
//Context stores a certain kind of data to be used in your application
//createContext maintains state


// This component establishes what data can be used. it will assist in creating, editing, and removing the data. will transmit the data
// the hook (function) to define a variable that holds the state of the component, and a function that updates it
export const DeviceProvider = (props) => {//transfers the data back and forth
    //the components that uses the data must be defined as children components, and React will send an object to each component.
    // props is the arguement getting passed

    const [devices, setDevices] = useState([])// imported from react. it defines a state variable to show initial state. useState gets invoked passed as an arguement, like saying useApplicationState. useState will always return an array with 2 items. and it needs to be deconstructed.
    //useState is a function returns an array that we need to deconstruct into 2 variables. the first item is the value of the array its an empty array of devices in this case at this time it means let devices = []. it is a variable that holds the state. 
    //the second item is a funtion. it a variable that mutates the state,  SetDevices in this case. its jobs is to mutate devices to get a new value.  


    const [searchTerms, setSearchTerms] = useState("")
    //search mutates and changes state. it tracts what the user types in
    // then the list reacts to the state

    const getDevices = () => {// will reach out to get the devices from the API /Json     
        return fetch("http://localhost:8088/devices?_expand=member&_expand=room&_sort=room.id") //  converts the json stringified array into a javascript array
            .then(res => res.json())// converts to js 
            .then(setDevices) // takes the data that comes back from the API and passes it through the SetDevices function. setDevices will then change the value of devices above and updates the state with the returned array
    }


    const addDevice = (deviceObj) => {// device is an object
        return fetch("http://localhost:8088/devices", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(deviceObj)
        })
            .then(response => response.json())
    }

    const releaseDevice = (deviceId) => {
        return fetch(`http://localhost:8088/devices/${deviceId}`, {//backtics allow for the interpolation. its needed her so we can inject a variable into a string
            method: "DELETE"
        })
            // .then(getDeviceById)
            .then(getDevices)
    }
    //Expose the method via the deviceContext below

    const getDeviceById = (deviceId) => {
        return fetch(`http://localhost:8088/devices/${deviceId}?_expand=member&_expand=room&_sort=room.id`)
            .then(res => res.json())
    }

    const updateDevice = device => {
        return fetch(`http://localhost:8088/devices/${device.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(device)
        })
            .then(getDevices) // rerenders with the newest API
    }

    /*
        You return a context provider which has the
        `devices` state, `getdevices` function,
        and the `addDevice` function as keys. This
        allows any child elements to access them.
    */
    return (
        <DeviceContext.Provider value={// The value of the state is what this provider exposes to the rest of the application. the object below
            { devices, getDevices, addDevice, releaseDevice, getDeviceById, updateDevice, searchTerms, setSearchTerms }//the value is an object with these as keys it will allow each one to be invoked. will allow other modules to access them.

        }>{props.children}
        </DeviceContext.Provider>// props = properties of all child componets. ensures the child have access to the properties, and it is an object. the arguement to the provider function. takes all the arguments and wraps them in an object.
    )
}  // With this, other components can access the array of objects being stored in the devices variable, and they can invoke the, getDevice and addDevice functions.