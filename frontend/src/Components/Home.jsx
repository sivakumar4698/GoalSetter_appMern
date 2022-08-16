import React from 'react';
import home from '../assets/home.jpg'

const Home = () => {
  return (
    <>  
    <h1>
        App Features
     </h1>
     <ul>
        <li>
            Register
        </li>
        <li>
            Set goals
        </li>
        <li>
            Check your goals
        </li>
        <li>
            Delete goals once completed
        </li>
     </ul>
     <img style={{width: "500px", height: "300px"}}src={home}/>
    </>
  );
}

export default Home;
