import Registration from "./registration";
function HandleLog(){
    const [window, setWindow] = useState("Home")
    {(window === "sign in " ) && <Registration window={window} setWindow={setWindow}  />}
    {(window === "sign up" ) && <Registration window={window} setWindow={setWindow}/>}
   
}
export default HandleLog;