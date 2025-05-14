
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./components/HomePage";
import { BusesPage } from "./components/BusesPage";
import { SeatSelection } from "./components/SeatSelection";
import { SeatBookedConfirmPage } from "./components/SeatBookedConfirmPage";
import { HeaderContent } from "./components/HeaderContent";

export function HomeController() {
    return (
        <>
        <HeaderContent/>
        <BrowserRouter  basename="/SaftyTravels">
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/goToBusesPage" element={<BusesPage/>} />
                <Route path="/goToBusSeatsPage" element={<SeatSelection/>}/>
                <Route path="/seatBookedConfirm" element={<SeatBookedConfirmPage/>}/>
            </Routes>
        </BrowserRouter>
        </>
    )
}