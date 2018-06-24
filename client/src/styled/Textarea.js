import styled from 'styled-components';

const Textarea = styled.textarea`
  border-color: ${props => props.borderColor ? props.borderColor : 'rgba(255, 255, 255, .5)'};
  background-color: ${props => props.bgColor ? props.bgColor : 'rgba(255, 255, 255, .1)'};
  color: ${props => props.color ? props.color : '#fff'};
  border-width: 0;
  border-style: 'solid';
  border-radius: 4px;
  width: 100%;
  height: 350px;
  outline: none;
  font-size: 1.3em;
  font-family: 'Karla';
  letter-spacing: .03em;
  line-height: 1.5em;
  display: block;
  margin: 0 auto 15px auto;
  padding: 20px;
  box-sizing: border-box;

  &:active, &:focus {
    box-shadow: 0 0 10px 6px rgba(255, 255, 255, 0.3);
  }
`;

export default Textarea;