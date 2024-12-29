import cart from '../assets/tracking.svg';

function Controlbuttons({ setWindow }) {
    return (
        <div style={{ display: "flex"}}>
{     <img src={cart} alt="Cart" style={{ width: "50px", height: "50px", position: "absolute", left: "20%",top:"3.5%" }}  onClick={()=>{setWindow("reviewOrder")}}/> 
}

            <button
        onClick={() => setWindow("menu")}
        style={{
            width: "80px",
            borderRadius: "10px",
            border: "none",
            position: "absolute",
            left: "90%",
            top: "4%",
            backgroundColor: "rgba(251, 165, 165, 0.2)",
            boxShadow: "inset 0px 2.9px 5px rgba(0, 0, 0, 0.2)",
            '@media (max-width: 768px)': {
                left: "70%",
                width: "80px"
            },
            '@media (max-width: 480px)': {
                left: "60%",
                width: "60px"
            }
        }}
    >
        Menu
    </button>
    <button
        onClick={() => setWindow("track")}
        style={{
            width: "80px",
            borderRadius: "15px",
            border: "none",
            position: "absolute",
            
            backgroundColor: "rgba(251, 165, 165, 0.2)",
            left: "80%",
            top: "4%",
            boxShadow: "inset 0px 2.9px 5px rgba(0, 0, 0, 0.2)",
            '@media (max-width: 768px)': {
                left: "50%",
                width: "80px"
            },
            '@media (max-width: 480px)': {
                left: "40%",
                width: "60px"
            }
        }}
    >
        Track
    </button>
        </div>
    );
}

export default Controlbuttons;
