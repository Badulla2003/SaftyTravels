import { useEffect, useState } from "react"
import axiosRequest from "../axios";
import '../SeatSelectionStyles/SeatSelection.css'

export function SeatSelectionSub() {

    const [seatData, setSeatData] = useState([]);

    const [selectedSeats, setSelectedSeats] = useState([]);

    useEffect(() => {
        getSeatsData()

    }, [])


    function getSeatsData() {
        axiosRequest.get('/getSeatsData', {
            params: {
                busId: 1
            }
        })
            .then((data) => setSeatData(data.data))
            .catch((err) => console.log(err))

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


    return (
        <>
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
        </>
    )
}