import axios from "axios"
import axiosRequest from "../axios"
import { useEffect, useState } from "react"
import './AddingBusToRoutePage.css';

export function AddingBusToRoutePage() {

    const [busInformation,setBusInformation]=useState();
    const [startingPoint,setStartingPoint]=useState();
    const [destinationPoint,setDestinationPoint]=useState();

    const ding = async () => {
        const busDetails = {
            busNumber: 1234,
            busType: "Sleeper",
            busCapacity: 45,
            singleSeaters: 10,
            doubleSeaters: 20,
            singleSleepers: 5,
            doubleSleepers: 10,
            travelsName: "Vinayaka",
            stime: 10.20,
            dtime: 6,
            startsAt: 11,
            travelDate: "2024-03-02"
        }
        const deal = await axiosRequest.post('/addBusToRoute',
            {
                busDetails: busInformation,
                startingPoint: startingPoint,
                destinationPoint: destinationPoint
            }


        ).then((res) => console.log(res)).catch((err) => console.log(err));



    }

    const getValues=(event)=>{
        const name=event.target.name;
        const value=event.target.value;
        setBusInformation((pre)=>({...pre,[name]:value}));
    }
    console.log(busInformation)


    return (
        <>
            <form action="">
                <div className="busDataDive">

                    <div className="placesInformationDiv">
                        <div>
                            <label htmlFor="startingPoint" className="labelText">Starting</label>
                            <input type="text" name="startingPoint" className="inputBox" required onChange={(event)=>setStartingPoint(event.target.value)}/>
                        </div>

                        <div>
                            <label htmlFor="destinationPoint" className="labelText">Destination</label>
                            <input type="text" name="destinationPoint" className="inputBox" required onChange={(event)=>setDestinationPoint(event.target.value)}/>
                        </div>
                    </div>

                    <div className="tbDiv">

                        <div className="travelsInformationDive">
                            <div>
                                <h3>Travels Information</h3>
                            </div>
                            <div className="travelsInformation">
                                <div>
                                    <label htmlFor="travelsName" className="labelText">Travels Name</label>
                                    <input type="text" name="travelsName" className="inputBox" required onChange={getValues}/>
                                </div>

                                <div>
                                    <label htmlFor="travelersContact">Contact</label>
                                    <input type="number" name="travelersContact" id="" />
                                </div>

                                <div>
                                    <label htmlFor="costAt" className="labelText">Price @</label>
                                    <input type="number" name="startsAt" className="inputBox" required onChange={getValues}/>
                                </div>

                                <div>
                                    <label htmlFor="travelDate" className="labelText">Date</label>
                                    <input type="date" name="travelDate" className="inputBox" required onChange={getValues}/>
                                </div>

                                <div>
                                    <label htmlFor="startingTime" className="labelText">Starting Time</label>
                                    <input type="time" name="stime" className="inputBox" required  onChange={getValues}/>
                                </div>

                                <div>
                                    <label htmlFor="destinationTime" className="labelText">Reaching Time</label>
                                    <input type="time" name="dtime" className="inputBox" required onChange={getValues} />
                                </div>
                            </div>
                        </div>


                        <div className="busInformationDiv">

                            <div>
                                <h3>Bus Information</h3>
                            </div>

                            <div>
                                <label htmlFor="busNumber" className="labelText">Bus Number</label>
                                <input type="text" name="busNumber" className="inputBox" required onChange={getValues}/>
                            </div>

                            <div>
                                <label htmlFor="busType" name="busType" className="labelText" >Bus Type</label>
                                <select name="busType" onChange={getValues} >
                                    <option value="Seater">Seater</option>
                                    <option value="Sleeper/Sleeper Ac">Sleeper/Sleeper Ac</option>
                                    <option value="Sleeper/Sleeper Non-Ac">Sleeper/Sleeper Non-Ac</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="singleSeaters" className="labelText">Single-Seaters</label>
                                <input type="number" name="singleSeaters" className="inputBox" required onChange={getValues}/>
                            </div>

                            <div>
                                <label htmlFor="doubleSeaters" className="labelText">Double-Seaters</label>
                                <input type="number" name="doubleSeaters" className="inputBox" required onChange={getValues}/>
                            </div>

                            <div>
                                <label htmlFor="singleSleeper" className="labelText">Single-Sleepers</label>
                                <input type="number" name="singleSleepers" className="inputBox" required onChange={getValues}/>
                            </div>

                            <div>
                                <label htmlFor="doubleSleeper" className="labelText">Double-Sleepers</label>
                                <input type="number" name="doubleSleepers" className="inputBox" required onChange={getValues}/>
                            </div>

                        </div>
                    </div>
                    <input type="submit" name="formSubmit" className="formSubmit" onClick={ding}/>
                </div>
            </form>
        </>
    )
}