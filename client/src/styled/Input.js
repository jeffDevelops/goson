import styled from 'styled-components';

const Input = styled.input`
  border-color: ${props => props.borderColor ? props.borderColor : 'rgba(255, 255, 255, .5)'};
  background-color: ${props => props.bgColor ? props.bgColor : 'rgba(255, 255, 255, .1)'};
  color: ${props => props.color ? props.color : '#fff'};
  float: ${props => props.right ? 'right' : 'none'};
  border-width: 0;
  border-style: 'solid';
  border-radius: 4px;
  width: 95%;
  outline: none;
  font-size: 1.3em;
  font-family: 'Karla';
  letter-spacing: .03em;
  line-height: 1.5em;
  display: block;
  padding: 20px;
  box-sizing: border-box;

  &:active, &:focus {
    box-shadow: 0 0 10px 6px rgba(255, 255, 255, 0.3);
  }



  @media (max-width: 700px) {
    &::placeholder {
      font-size: .6em;
    }
  }

`;

export default Input;