import React, { useContext, useEffect, useState } from "react"
import { DeviceContext } from "./DeviceProvider"
import "./Device.css"
import { useParams, useHistory } from "react-router-dom"


export const DeviceDetail = ({ device }) => {
  const { getDeviceById, releaseDevice } = useContext(DeviceContext); // shared context from the provider. 

  const [myDevice, setDevices] = useState({ room: {}, member: {} })//useState captures it in the SetDevices
  //useState handles data that changes in app. when state changes it will reflect to the UI/on the page to reflect the latest value
  //invoke the setDevices value is function to set the value of myDevice so it will rerender the data at the bottom in the return



  // hook function useParams() allows code to read route parameter from URL.
  const { deviceId } = useParams() // use when there's a dynamic route. pulls from the URL. the route is changeable


  useEffect(() => {// runs on first page load, and then every time the state of the JSX changes
    if (deviceId) {
      getDeviceById(parseInt(deviceId))//after the componet renders, go get the device. parse it to change the string to a number
        .then((deviceObj) => {  //converts the data
          setDevices(deviceObj) //then set it
        });
    } else { setDevices(device) }
  }, [deviceId])// iof the array is empty it will run once and then stop.
  // dependency stops once device id is found

  const history = useHistory()// force a url change when a button is clicked. returns value

  const handleRelease = () => {
    releaseDevice(myDevice.id)
      .then(() => {
        history.push("/devices");
      })
  }


  return (
    <>
    <style>{'body { background-image: url(https://www.lefthudson.com/wp-content/uploads/2019/11/black-wood-wallpaper-elegant-35-hd-wood-wallpapers-backgrounds-for-free-download-ideas-of-black-wood-wallpaper.jpg); }'}</style> 

      <section className="device" key={myDevice.id}>
      

      <h3 className="device__name">Name: {myDevice.name}</h3>

        <div className="device__type">Type:  {myDevice.type}</div>

        <div className="device__imageURL"><img src={myDevice.imageURL} alt="Smart Device" />
        </div>

        <div className="device__ipAddress">Device IP:  {myDevice.ipAddress}</div>

        <div className="device__description">Description:  {myDevice.description}</div>

        <div className="device__room">Room: {myDevice.room.name}</div>

        <div className="device__owner">Family Member:  {myDevice.member.name}</div> 

        <div className="device__date">Date Added:  {myDevice.dateAdded}</div>
        

        <div className="device__bluetooth"> {myDevice.isBluetooth ? "Bluetooth is enabled" : "Currently not using Bluetooth"}</div>


        <div className="device__wifi"> {myDevice.isWifi ? "Wifi is enabled" : "Currently not on Wifi"}</div>

        <button onClick={handleRelease}>Remove Device</button>


        <button onClick={() => { history.push(`/devices/edit/${myDevice.id}`) } //changes the url when clicked.
        }>Edit Device</button>
      </section>
    </>
  )
}