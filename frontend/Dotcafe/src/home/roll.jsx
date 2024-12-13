import './home.css';
import React, { useState, useEffect } from 'react';
import Drink1 from '../assets/drink1.svg';
import Drink2 from '../assets/drink2.svg';
import Drink3 from '../assets/drink3.svg';
import Drink4 from '../assets/drink4.svg';

const drinks = {Drink1,Drink2,Drink3,Drink4}

function Roll (){

  
    return (
      <>
        <div className='circle'></div>
        <img src={Drink1} alt="Drink" className="moving-drink1" />
        <img src={Drink2} alt="Drink" className="moving-drink2" />
        <img src={Drink3} alt="Drink" className="moving-drink3" />
        <img src={Drink4} alt="Drink" className="moving-drink4" />
        <div className='Ellipse1'></div>
        <div className='Ellipse2'></div>
        <div className='Ellipse3'></div>
        <div className='Ellipse4'></div>
      </>
    );
}
export default Roll;