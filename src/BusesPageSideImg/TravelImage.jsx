import { useLocation } from "react-router-dom";
import tirupatiImage from '../data/PlacesImagesLocation/bbuss.jpg';
import './TravelImg.css';
import { imagesData } from "../data/PlacesImages";
import { useEffect, useState } from "react";

export function TravelImage() {

    const location=useLocation();

     const idata=location.state.points || {};


         const starting = idata.startingPoint ;
        const destination =idata.destinationPoint ;
    
       console.log(starting," ",destination,imagesData)
       
        const [sImg,setSImg]=useState(tirupatiImage);
        const [dImg,setDImg]=useState(tirupatiImage);
  useEffect(()=>{
        if(starting!='' || destination!=''){
            const s=  (imagesData.filter((img) => img.name.toLowerCase() === starting.toLowerCase()));
            const d = imagesData.filter((img) => img.name.toLowerCase() === destination.toLowerCase());
           if(s.length>0){
              setSImg(s[0].img);
  
           }
           if(d.length>0){
            setDImg(d[0].img);
           }
          }
        },[]);
 
    

    
   
   
    return (
        <>
            <div className="travelsImgDiv">
                <div className="startingImgDiv">
                    <img className="startingImg" src={sImg} alt="no img" />
                </div>
                <div className="destinationImgDiv">
                    <img className="destinationImg" src={dImg} alt="no img" />
                </div>
            </div>
        </>
    )

}