import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom";
import '../styles/HomePage.css';
import { places } from '../data/PlacesList.js';
import { useLocation } from "react-router-dom";
import tirupatiImage from '../data/PlacesImagesLocation/tirupati.webp';
import '../BusesPageSideImg/TravelImg.css';
import { imagesData } from "../data/PlacesImages";
import bbus from '../data/PlacesImagesLocation/bbuss.jpg';
import busStopImg from '../data/PlacesImagesLocation/busStop.jpeg';


export function HomePage() {
    const [points, setPoints] = useState({ startingPoint: '', destinationPoint: '' });
    const userefPoints = useRef(points);
    const navigate = useNavigate();

    const date = new Date();
    const today = date.toISOString().substring(0, 10);

    const [tDate, setTDate] = useState(today);


    const getValues = (event) => {
        event.preventDefault();
        const name = event.target.name;
        const value = event.target.value;
        setPoints((pre) => ({ ...points, [name]: value }));
    }
    const goToBusesPage = () => {
        navigate("/goToBusesPage", { state: { points, tDate } });
    }

    console.log(points)

    const starting = points.startingPoint;
    const destination = points.destinationPoint;

    const [s, setS] = useState("Starting place");
    const [d, SetD] = useState("Destination place")

    const [startingImg, setStartingImg] = useState(bbus);
    const [destinationImg, setDestinationImg] = useState(bbus);

    useEffect(() => {
        if (points.startingPoint != '' || points.destinationPoint != '') {

            const s = (imagesData.filter((img) => img.name.toLowerCase() === starting.toLowerCase()));
            const d = imagesData.filter((img) => img.name.toLowerCase() === destination.toLowerCase());
            if (s.length > 0) {
                setStartingImg(s[0].img);
                setS(s[0].name);
            }
            else {
                setStartingImg(bbus);

            }
            if (d.length > 0) {
                setDestinationImg(d[0].img);
                SetD(d[0].name);
            }
            else {

                setDestinationImg(bbus);
            }

        }

    }, [starting, destination]);


    const getDate = (event) => {
        setTDate(event.target.value);
    }

    return (
        <>
            <div className="homePageDiv">

                <div className="homeBodyDiv">
                    <div className="leftSideBodyDiv">
                       
                            <div className="inputDiv">
                                <div className="sDiv">
                                    <input type="text" list="starting" className="startingInput" name="startingPoint" onChange={getValues} placeholder="Starting point" required />
                                    <datalist id="starting">
                                        {
                                            places.map((place) => {
                                                return (
                                                    <option value={place}>{place}</option>
                                                )
                                            })
                                        }

                                    </datalist>
                                </div>

                                <div className="dDiv">
                                    <input type="text" list="ending" className="destinationInput" name="destinationPoint" onChange={getValues} placeholder="DestinationPoint" required />
                                    <datalist id="ending">
                                        {
                                            places.map((place) => {
                                                return (
                                                    <option value={place}>{place}</option>
                                                )
                                            })
                                        }

                                    </datalist>
                                </div>
                            </div>

                            <div className="selectDateDiv">
                                <input type="date" className="selectDateInput" id="" defaultValue={today} onChange={(event) => getDate(event)} required />
                                <input type="submit" value="Submit" className="submitButton" onClick={goToBusesPage} />
                            </div>
                      
                    </div>

                    <div className="rightSideBodyDiv">
                        <div className="travelsImgDiv">
                            <div className="startingImageDiv">
                                <img className="startingImage" src={startingImg} alt="no img" />
                                <label htmlFor="" className="spl">{s}</label>
                            </div>
                            <div className="destinationImageDiv">
                                <img className="destinationImage" src={destinationImg} alt="no img" />
                                <label htmlFor="" className="dpl">{d}</label>
                            </div>
                        </div>
                    </div>


                </div>

            </div >

        </>
    )
}



