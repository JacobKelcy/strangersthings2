import styled from "styled-components";

export default styled.form`
  & {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding: 20px;
    margin: 20px;
  }
  & > div {
    width: 300px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }
`;
