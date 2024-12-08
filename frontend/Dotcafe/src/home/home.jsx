import './home.css'

import LogoImage from './LogoImage';
import Logedinbutton from './Logedinbutton';
import SignupButton from './signupbutton';
import Roll from './roll';


function Home({ isLoggedIn }) {

    return(
        <>
            {isLoggedIn ? (
                <Logedinbutton ></Logedinbutton>
            ) : (
                <SignupButton></SignupButton>
            )}
            <LogoImage></LogoImage>
            <Roll></Roll>
        </>
    );
}
export  default Home;