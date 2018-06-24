import styled from 'styled-components';

const Label = styled.label`
  width: 95%;
  float: ${props => props.right ? 'right' : 'none'};
`;

export default Label;