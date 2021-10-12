import styled from '@emotion/styled';

const BigButton = styled.button`
  display: block;
  width: ${(props) => (props.width ? props.width : '100%')};
  max-height: 50px;
  margin: auto;
  padding: 10px 20px;
  background-color: ${(props) =>
    props.backgroundColor ? props.backgroundColor : '#fc5d3d'};
  border: 2px solid #212529;
  border-radius: 5px;
  font-size: 22px;
  cursor: pointer;
  &:disabled {
    background-color: #ced4da;
    opacity: 0.5;
    color: #495057;
    cursor: auto;
  }
`;

export default BigButton;
