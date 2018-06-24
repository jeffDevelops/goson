import styled from 'styled-components';

const Text = styled.p`
  text-transform: uppercase;
  font-size: 1.5em;
  font-style: italic;
  font-weight: 600;
  letter-spacing: .03em;
  line-height: 1.em;
  font-family: 'Karla', sans-serif;
  width: 100%;
  color: ${props => props.color ? props.color : '#000'}
  margin: ${props => props.justify === 'right' ? '0 0 0 auto' : '0'}

  @media (max-width: 700px) {
    font-size: 1.1em;
  }
`;

export default Text;