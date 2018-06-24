import styled from 'styled-components';

const Header = styled.h1`
  box-sizing: border-box;
  font-family: 'Ranger', 'Arial', 'Helvetica', sans-serif;
  font-size: 7em;
  margin: 0;
  color: ${props => props.color ? props.color : '#000'}
  line-height: 1.2em;
  /* float: ${props => props.justify === 'right' ? 'right' : 'none'} */

  @media (max-width: 700px) {
    font-size: 3em;
  }
`;

export default Header;