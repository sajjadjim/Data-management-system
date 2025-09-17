import React from 'react';
import Section1 from './section1/Section1';
import Section2 from './section2/Section2';
import FAQ from './section3/FAQ';
import Section4 from './section4/Section4';

const Home = () => {
    return (
        <div>
            <Section1></Section1>
            <Section2></Section2>
            <Section4></Section4>
            <FAQ></FAQ>
        </div>
    );
};

export default Home;