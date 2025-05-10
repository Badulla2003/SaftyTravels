
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom";
import axiosRequest from "../axios";
import { TravelImage } from "../BusesPageSideImg/travelImage";
import '../SeatSelectionStyles/BusesPage.css';
export function BusesPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const [busData, setBusData] = useState([]);
    const points = location.state.points || {};

    const tDate=location.state.tDate;

    const startingPoint = points.startingPoint;
    const destinationPoint = points.destinationPoint;

    useEffect(() => {
        axiosRequest.get("/getBusData", {
            params: {
                startingPoint: startingPoint,
                destinationPoint: destinationPoint,
                travelsDate:tDate
            }
        }).then((data) => setBusData(data.data))
            .catch((err) => console.log(err))
    }, [])


    console.log(busData)

    const selectSeat = (bus) => {
     //   console.log("bus Id :", bus.busId);
        navigate('/goToBusSeatsPage', { state: { bus, startingPoint, destinationPoint } });
    }

    return (

        <>
            <div className="busesPageDiv">
                <div className="sDImgsDiv">
                    <TravelImage />
                </div>

                <div className="busesListDiv">
                    {
                        busData == ''
                            ?

                            <div className="NoDataDiv">
                                <h2>No Buses Found On This Route</h2>
                            </div>

                            :

                            busData.map((bus) => {
                                return (

                                    <>
                                        <div className="busConDiv">
                                            <div className="busDetailsDiv"  onClick={() => selectSeat(bus)}>
                                                <div className="travelsNameDiv"><h2>{startingPoint} &#8594; {destinationPoint}</h2></div>
                                                <div className="busDetails">
                                                    <div className="kingDiv">
                                                        <label className="travelsName">{bus.travelsName}</label>
                                                        <label className="busType">{bus.busType}</label>
                                                        <label className="startsAt">Start@ {bus.stratsAt}</label>
                                                    </div>
                                                    <div className="kingDiv">
                                                        <label className="busNo">{bus.busNumber} .</label>
                                                        <label htmlFor="">Old - 1 year</label>
                                                        <label className="timing">{bus.sTime} - {bus.dTime}</label>
                                                        <label className="date">{bus.travelsDate}</label>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                    </>

                                )
                            })
                    }


                </div>
            </div>
        </>
      
    )
}




{/* // <div className="busConDiv">
                                        //     <div className="busDetailsDiv" onClick={() => selectSeat(bus)}>

                                        //         <div className="busDetails">
                                        //             <div className="travelsNameDiv"><label className="toDes">{startingPoint} &#8594; {destinationPoint}</label></div>
                                        //             <div>
                                        //                 <label className="travelsName"> Vasavi travels</label>
                                        //                 <label className="busType">Sleeper / Non-Ac</label>
                                        //                 <label className="startsAt">Start@ 300</label>
                                        //             </div>
                                        //             <div>
                                        //                 <label className="busNo">{bus.busNumber} .</label>
                                        //                 <label htmlFor="">Old - 1 year</label>
                                        //                 <label className="timing">10 Pm - 6 Am</label>
                                        //                 <label className="date">28-04-2025</label>
                                        //             </div>
                                        //         </div>
                                        //     </div>
                                        // </div> */}