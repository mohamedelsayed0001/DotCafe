import './home.css'
import { useEffect } from "react";
import LogoImage from './LogoImage';
import Logedinbutton from './Logedinbutton';
import SignupButton from './signupbutton';
import Roll from './roll';


function Home({ signed,setWindow }) {
    useEffect(() => {
        document.body.classList.add('home-body');
        return () => {
            document.body.classList.remove('home-body');
        };
    }, []);

    return(
        <>
            {signed ? (
               
                <Logedinbutton ></Logedinbutton>
            ) : (
                <SignupButton setwindow={setWindow}></SignupButton>
            )}
            <LogoImage></LogoImage>
            <Roll></Roll>  
        </>
    );
}
export  default Home;