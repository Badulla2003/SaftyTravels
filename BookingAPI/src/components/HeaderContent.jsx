
import '../styles/HomePage.css';
export function HeaderContent() {

    const date = new Date();
    const today = date.toDateString();


    return (
        <header className='topDiv'>
        
                {/* <div className="dateDiv">
                    <p>{today}</p>
                </div> */}
                <div style={{ display: "flex" }}>
                    <div className="titleDiv">
                        Safty Travels
                    </div>
                    <div className="subTitleDiv">
                        At Your Service
                    </div>
                </div>
                <div className="homeSubmitDiv">
                    <input type="submit" className="homeSubmit" value="Home" />
                    <input type="submit" className="logineButton" value="Login/Register" />
                </div>
      

        </header>
    )
}