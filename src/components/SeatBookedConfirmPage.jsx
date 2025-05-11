import { useLocation } from 'react-router-dom';
import '../styles/SeatBookedCon.css';
import html2pdf from 'html2pdf.js';

export function SeatBookedConfirmPage() {
  const location = useLocation();
  const { ticketsData, bus, route, pdPoints } = location.state || {}; // Safe destructuring

  if (!ticketsData || !bus || !route || !pdPoints) {
    return <div>No data found!</div>; // Handle missing data gracefully
  }

  const downloadPDF = () => {
    const element = document.getElementById('ticketContent');
    const opt = {
      margin: 0.5,
      filename: 'bus_ticket.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
    };
    html2pdf().set(opt).from(element).save();
  };

  return (
    <div className="ticketContainer" id="ticketContent">
      <h2 className="ticketTitle">🎟️ Bus Ticket Confirmation</h2>

      <div className="ticketSection">
        <h4>🛣️ Route</h4>
        <div className="ticketRow">
          <span>From:</span>
          <strong>{route.startingPoint}</strong>
          <span>To:</span>
          <strong>{route.destinationPoint}</strong>
        </div>
      </div>

      <div className="ticketSection">
        <h4>🚌 Bus Information</h4>
        <div className="ticketRow">
          <span>Travel Name:</span>
          <strong>{bus.travelsName}</strong>
        </div>
        <div className="ticketRow">
          <span>Bus Type:</span>
          <strong>{bus.busType}</strong>
        </div>
        <div className="ticketRow">
          <span>Bus Number:</span>
          <strong>{bus.busNumber}</strong>
        </div>
        <div className="ticketRow">
          <span>Travel Date:</span>
          <strong>{bus.travelsDate}</strong>
        </div>
        <div className="ticketRow">
          <span>Start Time:</span>
          <strong>{bus.stime}</strong>
        </div>
        <div className="ticketRow">
          <span>End Time:</span>
          <strong>{bus.dtime}</strong>
        </div>
      </div>

      <div className="ticketSection">
        <h4>📍 Pickup & Drop</h4>
        <div className="ticketRow">
          <span>Pickup:</span>
          <strong>{pdPoints.SBPoint}</strong>
        </div>
        <div className="ticketRow">
          <span>Drop:</span>
          <strong>{pdPoints.DBPoint}</strong>
        </div>
      </div>

      <div className="ticketSection">
        <h4>👤 Passenger Details</h4>
        {ticketsData.map((item, index) => (
          <div key={index} className="ticketPassenger">
            <div className="ticketRow">
              <span>Seat:</span>
              <strong>{item.seat.toString().slice(1)}</strong>
            </div>
            <div className="ticketRow">
              <span>Name:</span>
              <strong>{item.passenger.name}</strong>
            </div>
            <div className="ticketRow">
              <span>Age:</span>
              <strong>{item.passenger.age}</strong>
            </div>
          </div>
        ))}
      </div>

      <div className="footerNote">
        Thank you for choosing our service. Have a safe journey! 🌟
      </div>

      <button onClick={downloadPDF} className="printButton">
        ⬇️ Download Ticket
      </button>
    </div>
  );
}
