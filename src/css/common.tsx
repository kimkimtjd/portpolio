import styled from "styled-components";

interface StyledInputProps {
  isError?: boolean;
}

// column 방향의 Flex 컨테이너
export const FlexColumn = styled.div`
    display:flex;
    flex-direction:column;
`;

export const FlexColumnStartStart = styled.div`
    display:flex;
    flex-direction:column;
    justify-content: flex-start;;
    align-items: flex-start;
`;


export const FlexColumnStartCenter = styled.div`
    display:flex;
    flex-direction:column;
    justify-content: flex-start;;
    align-items: center;
`;


export const FlexColumnCenterStart = styled.div`
    display:flex;
    flex-direction:column;
    justify-content: center;
    align-items: flex-start;
`;


export const FlexColumnAllCenter = styled.div`
    display:flex;
    flex-direction:column;
    justify-content: center;
    align-items: center;
`;

export const FlexColumnBeween = styled.div`
    display:flex;
    flex-direction:column;
    justify-content: space-between;
    align-items: center;
`;


// row 방향의 Flex 컨테이너
export const FlexRow = styled.div`
    display:flex;
    flex-direction:row;
`;

export const FlexRowStartCenter = styled.div`
    display:flex;
    flex-direction:row;
    justify-content: flex-start;
    align-items: center;
`;

export const FlexRowCenterStart = styled.div`
    display:flex;
    flex-direction:row;
    justify-content: center;
    align-items: flex-start;
`;

export const FlexRowStartStart = styled.div`
    display:flex;
    flex-direction:row;
    justify-content: flex-start;
    align-items: flex-start;
`;

export const FlexRowEndCenter = styled.div`
    display:flex;
    flex-direction:row;
    justify-content: flex-end;
    align-items: center;
`;

export const FlexRowCenterEnd = styled.div`
    display:flex;
    flex-direction:row;
    justify-content: center;
    align-items: flex-end;
`;

export const FlexRowStartEnd = styled.div`
    display:flex;
    flex-direction:row;
    justify-content: flex-start;
    align-items: flex-end;
`;

export const FlexRowEndStart = styled.div`
    display:flex;
    flex-direction:row;
    justify-content: flex-end;
    align-items: flex-start;
`;


export const FlexRowBetweenCenter = styled.div`
    display:flex;
    flex-direction:row;
    justify-content: space-between;
    align-items: center;
`;

export const FlexRowAllCenter = styled.div`
    display:flex;
    flex-direction:row;
    justify-content: center;
    align-items: center;
`;



export const HomeTitle = styled.h1`
    font-size: 24px;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.30);
    display: inline-block;
`;

export const CloseIcon = styled.img`
  width: 13px;
  height: 13px;
  cursor: pointer;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.2);
  }
`;


export const StyledInput = styled.input.withConfig({
  shouldForwardProp: (prop) => prop !== "isError"
})<StyledInputProps>`
  width: 100%;
  padding: 5px 5px;
  font-size: 14px;
  border-radius: 6px;
  border: 1px solid ${({ isError }) => (isError ? "#ff4d4f" : "#ccc")};
  outline: none;
  transition: border-color 0.3s ease;
  &:focus {
    border-color: ${({ isError }) => (isError ? "#ff4d4f" : "#4a90e2")};
  }
  margin-top:5px;
`;