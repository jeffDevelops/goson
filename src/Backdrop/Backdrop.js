import React from 'react';

import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';

import './Backdrop.css';

export default function Backdrop() {
  const images = [];

  for (let i = 0; i < 10; i++) {
    for (let j = 1; j <= 20; j++) {
      images.push({ srcIndex: j, alt: `I'm In (${j})`});
    }
  }

  return (
    <Container className="backdrop" fluid={ true } >
      { images.map((image, index) => {
        return <img className="image" src={ require(`./images/GoSon${image.srcIndex}.jpg`) } alt={ image.alt } key={ index } />;
      })}
    </Container>
  );
}