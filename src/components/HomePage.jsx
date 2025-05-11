import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import '../styles/HomePage.css';
import '../chatStyles/home.css'
import { places } from '../data/PlacesList.js';
import { imagesData } from "../data/PlacesImages";
import bbus from '../data/PlacesImagesLocation/bbuss.jpg';

export function HomePage() {
    const [points, setPoints] = useState({ startingPoint: '', destinationPoint: '' });
    const navigate = useNavigate();
    const date = new Date();
    const today = date.toISOString().substring(0, 10);
    const [tDate, setTDate] = useState(today);

    const [startingImg, setStartingImg] = useState(bbus);
    const [destinationImg, setDestinationImg] = useState(bbus);
    const [starting, setStarting] = useState("Starting place");
    const [destination, setDestination] = useState("Destination place");

    useEffect(() => {
        if (points.startingPoint && points.destinationPoint) {
            const s = imagesData.find((img) => img.name.toLowerCase() === points.startingPoint.toLowerCase());
            const d = imagesData.find((img) => img.name.toLowerCase() === points.destinationPoint.toLowerCase());

            setStartingImg(s ? s.img : bbus);
            setDestinationImg(d ? d.img : bbus);
            setStarting(s ? s.name : "Starting place");
            setDestination(d ? d.name : "Destination place");
        }
    }, [points]);

    const getValues = (event) => {
        event.preventDefault();
        const name = event.target.name;
        const value = event.target.value;
        setPoints((prev) => ({ ...prev, [name]: value }));
    }

    const getDate = (event) => {
        setTDate(event.target.value);
    }

    const goToBusesPage = (event) => {
        event.preventDefault();
        navigate("/goToBusesPage", { state: { points, tDate } });
    }

    return (
        <div className="homePageDiv">
            <div className="homeBodyDiv">
                <div className="leftSideBodyDiv">
                    <div className="inputDiv">
                        <div className="sDiv">
                            <input type="text" list="starting" className="startingInput" name="startingPoint" onChange={getValues} placeholder="Starting point" required />
                            <datalist id="starting">
                                {places.map((place) => <option key={place} value={place} />)}
                            </datalist>
                        </div>
                        <div className="dDiv">
                            <input type="text" list="ending" className="destinationInput" name="destinationPoint" onChange={getValues} placeholder="DestinationPoint" required />
                            <datalist id="ending">
                                {places.map((place) => <option key={place} value={place} />)}
                            </datalist>
                        </div>
                    </div>
                    <div className="selectDateDiv">
                        <input type="date" className="selectDateInput" value={tDate} onChange={getDate} required />
                        <input type="submit" value="Submit" className="submitButton" onClick={goToBusesPage} />
                    </div>
                </div>
                <div className="rightSideBodyDiv">
                    <div className="travelsImgDiv">
                        <div className="startingImageDiv">
                            <img className="startingImage" src={startingImg} alt="starting point" />
                            <label className="spl">{starting}</label>
                        </div>
                        <div className="destinationImageDiv">
                            <img className="destinationImage" src={destinationImg} alt="destination point" />
                            <label className="dpl">{destination}</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
