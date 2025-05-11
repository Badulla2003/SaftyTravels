import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"
import axiosRequest from "../axios";
import { PassangerSelection } from "../SeatSelectionSubCompo/PassangerSelection";
import { SeatSelectionSub } from "../SeatSelectionSubCompo/SeatSelectionSub";
// import '../SeatSelectionStyles/SeatSelectionPage.css';
// import '../SeatSelectionStyles/busDetailsDiv.css';
import '../styles/SeatSel.css'
export function SeatSelection() {
  const location = useLocation();
  // const [seatData, setSeatData] = useState([]);
  const startingPoint = location.state.startingPoint;
  const destinationPoint = location.state.destinationPoint;
  const bus = location.state.bus || '';

  const route={startingPoint,destinationPoint};

  for (let i = 0; i < 5; i++) {
    console.log("id :", bus.id);
  }

  const [seatData, setSeatData] = useState([]);

  const navigate = useNavigate();

  /*
    customer logic
  */

  console.log("Bus ", bus)



  async function getAllRegisteredPassangers() {
    console.log("getAllPassworking");
    await axiosRequest.get('/getAllSavedPassangers')
      .then((res) => setSavedCustomers(res.data))
      .catch((err) => console.log(err));
    console.log("running")
  }




  const [customer, setCustomer] = useState({});
  const [savedCustomers, setSavedCustomers] = useState([]);
  const [sclClicked, setSclClicked] = useState([]);

  const [selectedPassangers, setSelectedPassangers] = useState([]);

  const addValuesToCustomer = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setCustomer((pre) => ({ ...pre, [name]: value }));
    p.current = customer;
  }


  useEffect(() => {
    getAllRegisteredPassangers();
  }, [])

  const deleteSavedCustomer = async (id) => {
    console.log("delete clicked")
    await axiosRequest.get('/removeCustomer',
      {
        params: {
          customerId: id
        }
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    getAllRegisteredPassangers();
  }

  const saveCustomer = async (customer) => {
    console.log("save customer ", customer);
    await axiosRequest.post('/addCustomer', customer)
      .then((response) => console.log(response)).catch((err) => console.log(err));
    getAllRegisteredPassangers();
    setMakeAddPassanger(!makeAddPassanger);
  }



  async function getAllRegisteredPassangers() {
    console.log("getAllPassworking");
    await axiosRequest.get('/getAllSavedPassangers')
      .then((res) => setSavedCustomers(res.data))
      .catch((err) => console.log(err));
    console.log("running")
  }


  const [makeAddPassanger, setMakeAddPassanger] = useState(true);

  const makeAddPassangerDiv = () => {
    setMakeAddPassanger(!makeAddPassanger);
  }








  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    getSeatsData();

  }, [])


  function getSeatsData() {
    console.log(bus.id);
    axiosRequest.get('/getSeatsData', {
      params: {
        busId: bus.id
      }
    })
      .then((data) => setSeatData(data.data))
      .catch((err) => console.log(err));

  }

  const lowerSingleSeatData = seatData.filter((seat) => seat.seatType === 'singleSeater');
  const lowerDoubleSeatData = seatData.filter((seat) => seat.seatType === 'doubleSeater');
  const upperSingleData = seatData.filter((seat) => seat.seatType === 'singleSleepers');
  const upperDoubleData = seatData.filter((seat) => seat.seatType === 'doubleSleeper');


  const lowerLeftSideSeats = lowerSingleSeatData.filter((seat) => (seat.seatNumber) % 3 == 0);
  const lowerRightSideSeats = lowerDoubleSeatData.filter((seat) => (seat.seatNumber) % 3 == 0);

  const lowerRightSide1 = lowerSingleSeatData.filter((seat) => seat.seatNumber % 3 != 0);
  const lowerRightSide2 = lowerDoubleSeatData.filter((seat) => seat.seatNumber % 3 != 0);

  const lowerLeft = [...lowerLeftSideSeats, ...lowerRightSideSeats];
  const lowerRight = [...lowerRightSide1, ...lowerRightSide2]


  const seatsSelected = (seatId) => {

    if (selectedSeats.includes(seatId)) {
      const d = selectedSeats.filter((item) => item != seatId);
      setSelectedSeats(d);
    }
    else {
      setSelectedSeats([...selectedSeats, seatId]);
    }

  }

     const [pdPoints,setPdPoints]=useState();
     const getPDValues=(event)=>{
      const name=event.target.name;
      const value=event.target.value;
      setPdPoints((pre)=>({...pre,[name]:value}));
     }

  /*
  
  Ticket Booking Logic
  1.first get seatIds
  2.get bus id
  3.get Passangers list
  */


  const [ticketsData, setTicketsData] = useState([]);

  useEffect(() => {
    if (selectedSeats.length === sclClicked.length && selectedSeats.length > 0) {
      const data = selectedSeats.map((seat, i) => ({
        seat: seat,
        passenger: sclClicked[i],
      }));
      setTicketsData(data);
      console.log("tickets data", data); // Log updated data directly
    }
    else {

    }
  }, [selectedSeats, sclClicked]);



  const addToSelectedPassangers = (customer) => {

    if (sclClicked.includes(customer)) {
      const d = sclClicked.filter((item) => item != customer);
      setSclClicked(d);
    }
    else {
      setSclClicked([...sclClicked, customer]);
    }
  }

  const bookTicket = async (td, bid) => {
    let b = false;
    if (sclClicked.length == selectedSeats.length && sclClicked != 0 && selectedSeats != 0) {
      console.log("Booking deatsils ", ticketsData, " ", bus.busId)
      b = await axiosRequest.post('/bookTickets',
        {
          ticketData: ticketsData,
          busId: bus.id

        }).catch((err) => console.log(err));
      if (b != null) {
        console.log(b);
        navigate('/seatBookedConfirm',{state:{ticketsData,bus,route,pdPoints}});
      }

    }
  }

  console.log(pdPoints,"  points")

  return (
    <>
      {/* <PassangerSelection /> */}


      <div className="seatsSelectionPageDiv">

        <div className="seatSelectionDiv">
          <div className="seatsDiv">
            <div className="lowerDiv1">
              <h3>
                LowerSection
              </h3>
              <div className="lowerDiv">

                <div className="lowerDoubleSeatsDiv">
                  {
                    lowerRight.map(
                      (seat) => {
                        let isSelected = false;
                        selectedSeats.map((seat1) => {
                          if (seat.seatId == seat1) {
                            isSelected = true;
                          }
                        })
                        return (
                          <input type="submit" value={seat.seatNumber} className={`${seat.status ? `bookedSeater` : ''}${isSelected ? "selected" : "NotSelected"}`} onClick={() => seatsSelected(seat.seatId)} />
                        )
                      }
                    )
                  }
                </div>
                <div className="lowerSingleSeatsDiv">
                  {
                    lowerLeft.map(
                      (seat) => {
                        let isSelected = false;
                        selectedSeats.map((seat1) => {
                          if (seat.seatId == seat1) {
                            isSelected = true;
                          }
                        })
                        return (
                          <input type="submit" value={seat.seatNumber} className={`${seat.status ? `bookedSeater` : ''}${isSelected ? "selected" : "NotSelected"}`} onClick={() => seatsSelected(seat.seatId)} />
                        )
                      }
                    )
                  }
                </div>
              </div>
            </div>
            <div className="upperDiv1">
              <h3>
                UpperSection
              </h3>
              <div className="upperDiv">
                <div className="upperSingleSeatsDiv">
                  {
                    upperSingleData.map(
                      (seat) => {
                        let isSelected = false;
                        selectedSeats.map((seat1) => {
                          if (seat.seatId == seat1) {
                            isSelected = true;
                          }
                        })
                        return (
                          <input type="submit" value={seat.seatNumber} className={`${seat.status ? `bookedSleeper` : ''}${isSelected ? "selectedSleeper" : "NotSelectedSleeper"}`} onClick={() => seatsSelected(seat.seatId)} />
                        )
                      }
                    )
                  }
                </div>
                <div className="upperDoubleSeatsDiv">
                  {
                    upperDoubleData.map(
                      (seat) => {
                        let isSelected = false;
                        selectedSeats.map((seat1) => {
                          if (seat.seatId == seat1) {
                            isSelected = true;
                          }
                        })
                        return (
                          <input type="submit" value={seat.seatNumber} className={`${seat.status ? `bookedSleeper` : ''}${isSelected ? "selectedSleeper" : "NotSelectedSleeper"}`} onClick={() => seatsSelected(seat.seatId)} />
                        )
                      }
                    )

                  }

                </div>
              </div>
            </div>
          </div>
        </div>



        <div className="seatBusPassangerDiv">
          <div >
            <div className="busDetailsDiv">
              <div className="travelsNameDiv"><h2>{startingPoint} &#8594; {destinationPoint}</h2></div>
              <div className="busDetails">
                <div>
                  <label className="travelsName">{bus.travelsName}</label>
                  <label className="busType">{bus.busType}</label>
                  <label className="startsAt">Start@ {bus.startsAt}</label>
                </div>
                <div>
                  <label className="busNo">{bus.busNumber} .</label>
                  <label htmlFor="">Old - 1 year</label>
                  <label className="timing">{bus.sTime} Pm - {bus.dTime} Am</label>
                  <label className="date">28-04-2025</label>
                </div>
              </div>
            </div>
          </div>

          <div className="BDPointsDiv">
            <div className="BPSelectionDiv">
              <label htmlFor="SBPoint" className="SBPoint">Selact Boarding Point</label>
              <select name="SBPoint" id="sbpCss" onChange={getPDValues}>
                <option value="Ameerpet">Ameerpet</option>
                <option value="Kacheguda">Kacheguda</option>
              </select>
            </div>

            <div className="DPSelectionDiv">
              <label htmlFor="DBPoint" className="SBPoint">Selact Boarding Point</label>
              <select name="DBPoint" id="dbpCss"onChange={getPDValues} >
                <option value="Ameerpet">Ameerpet</option>
                <option value="Kacheguda">Kacheguda</option>
              </select>
            </div>

          </div>

          <div className="passangerSelectionDiv">

            <div className="passangersDetailsDiv">
              <h3>select passanger</h3>

              <div className="passangersSelectionDiv">
                {


                  savedCustomers == ''
                    ? "no data"
                    :
                    savedCustomers.map((customer) => {

                      let isClicked = false;
                      sclClicked.map((item) => {
                        if (item == customer) {
                          isClicked = true;
                        }
                      })

                      return (
                        <>
                          <div className="passangerDiv">
                            <label className={!isClicked ? "passangerName" : "passangerNameUnClicked"}

                              onClick={(event) => {
                                event.preventDefault();
                                addToSelectedPassangers(customer);
                              }
                              }

                            >{customer.name}</label>
                            <input type="button" className="selectButton" value="Edit" name={customer.name} />
                            <input type="submit" value="delete" className="deleteButton" onClick={(event) => {
                              event.preventDefault();
                              deleteSavedCustomer(customer.customerId)
                            }
                            } />
                          </div>
                        </>
                      )


                    })

                }

                < input type="submit" className="addButton" value="Add Passanger" onClick={makeAddPassangerDiv} />

              </div>
            </div>

            {
              makeAddPassanger
                ? ''
                :
                <div className="passangerRegisterDiv">
                  <h1>Add passanger</h1>
                  <div>
                    <label htmlFor="name">name </label><input type="text" name="name" value={customer.name} onChange={addValuesToCustomer} />
                  </div>

                  <div>
                    <label htmlFor="email">email </label><input type="text" name="email" value={customer.email} onChange={addValuesToCustomer} />

                  </div>
                  <div>
                    <label htmlFor="age">age </label><input type="text" name="age" value={customer.age} onChange={addValuesToCustomer} />
                  </div>
                  <div>
                    <label htmlFor="phone">phone </label><input type="text" name="phoneNumber" value={customer.phoneNumber} onChange={addValuesToCustomer} />
                  </div>
                  <div>
                    <label htmlFor="place">place </label><input type="text" name="place" value={customer.place} onChange={addValuesToCustomer} />
                  </div>
                  <div>
                    <label htmlFor="city">city </label><input type="text" name="city" value={customer.city} onChange={addValuesToCustomer} />
                  </div>

                  <div className="saveButtonDiv">
                    <input type="submit" value="save" className="saveButton" onClick={(event) => {
                      event.preventDefault();
                      saveCustomer(customer)
                    }
                    } />
                  </div>
                </div>

            }
          </div>


          {
            selectedSeats.length == sclClicked.length && selectedSeats != 0 ?
              <>
                <div className="ticketDetailsDiv">
                  <div className="tickets">
                    {

                      ticketsData.map((ticket) => {
                        return (
                          <div className="seatNoCostDiv">
                            <label className="passName">{ticket.passenger.name}</label>
                            <label className="seatNo">seat - {ticket.seat}</label>
                            <label className="seatCost">&#8377; 500</label>
                          </div>
                        )
                      })

                    }
                  </div>

                </div>
              </>
              : ''
          }


          <div className="ticketButtonDiv">
            <input type="submit" className="bookButton" value="Book Ticket" onClick={() => bookTicket(ticketsData, bus.busId)} />
          </div>


        </div>
      </div>

    </>
  )
}