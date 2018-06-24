import styled from 'styled-components';

const FileInput = styled.input.attrs({ type: 'file' })`
  box-sizing: border-box;
  color: #fff;
  font-family: 'Karla', sans-serif;
  text-transform: uppercase;
  background-color: rgba(255, 255, 255, .1);
  border-radius: 3px;
  padding: 10px;
  width: 100%;
  display: block;
  margin: 0 auto 15px auto;
  outline: none;

  &:active, &:focus {
    box-shadow: 0 0 10px 6px rgba(255, 255, 255, 0.3);
  }
`;

// Browser won't display less than 1px, but 0px breaks tab order

export default FileInput;