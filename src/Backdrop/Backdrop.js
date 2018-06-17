import React from 'react';

import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';

import './Backdrop.css';

const Backdrop = (props) => {
  const images = [];
  if (props.numImages <= 20) {
    for (let i = 0; i < props.numImages; i++) {
      images.push({ srcIndex: i, alt: `I'm In (${i})`});
    }
  } else {
    const numberOfLoops = Math.floor(props.numImages / 20);
    const remainder = props.numImages % 20;
    for (let i = 0; i < numberOfLoops; i++) {
      for (let j = 0; j < 20; j++) {
        images.push({ srcIndex: j, alt: `I'm In (${j})`});
      }
    }
    for (let i = 0; i < remainder; i++) {
      images.push({ srcIndex: i, alt: `I'm In (${i})`});
    }
    
  }

  return (
    <Container className="backdrop" fluid={ true } >
      { images.map((image, index) => {
        return <img className="image" src={ require(`./images/GoSon${image.srcIndex + 1}.jpg`) } alt={ image.alt } key={ index } />;
      })}
    </Container>
  );
}

export default Backdrop;