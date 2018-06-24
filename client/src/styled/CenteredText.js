import styled from 'styled-components';

const CenteredText = styled.p`
  text-align: center;
  margin: 50px auto 120px auto;
  color: ${props => props.color ? props.color : '#000'};
  text-transform: uppercase;
  font-size: 1.5em;
  font-style: italic;
  font-weight: 600;
  letter-spacing: .03em;
  line-height: 1.em;
  font-family: 'Karla', sans-serif;
  width: 60%;
`;

export default CenteredText;