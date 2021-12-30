import React from 'react';
import Card from '../components/Forecast/Card';
import Selection from '../components/Forecast/Selection';

const Forecast = function Forecast() {
  return (
    <main>
      <Selection />
      <section>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </section>
    </main>
  );
};

export default Forecast;
