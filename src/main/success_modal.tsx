import { FlexColumnAllCenter, FlexColumnCenterStart, FlexRowBetweenCenter, FlexRowEndCenter, FlexRowStartCenter } from "../css/common";
import styled from "styled-components";

interface FirstOption {
    title: string;
    trual: boolean;
}

interface NotModalProps {
  onClose: () => void;
}

function SuccessModal({ onClose }: NotModalProps) {
    const first_option: FirstOption[] = [
        { title: "도움이 되는 답변", trual: false },
        { title: "필요한 법률 정보를 찾아줌", trual: false },
        { title: "만족스러운 법률 검토 결과를 제공함", trual: false },
        { title: "기타", trual: false },
    ];

    const submit_re = () => {
        onClose()
        //제출하기 함수
    }


    return (
        <FlexColumnCenterStart style={{ padding: "30px 20px" }}>
            <h3 style={{ fontSize: "32px" }}>어떤 점이 만족스러웠나요?</h3>
            <p style={{ fontSize: "20px", color: "#33383e", marginTop: "14px" }}>아래 항목을 선택해주세요 ( 중복가능 )</p>
            <Line />

            {first_option.map((item: FirstOption, index: number) => (
                <FlexRowStartCenter key={index} style={{ marginBottom: "15px" }}>
                    <Checkbox type="checkbox" id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} style={{ fontSize: "18px", color: "#61666c", marginLeft: "10px" }}>{item.title}</Label>
                </FlexRowStartCenter>
            ))}
            <Line />
            <p style={{ fontSize: "20px", color: "#33383e", marginTop: "20px" }}>구제적인 이유 ( 선택 )</p>
            <InputText
                placeholder="구체적인 사유를 작성해주세요 ( 100자 이내 )"
            // value={title ?? ""}  // null 방지
            // onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            //     setTitle(e.target.value)
            // }
            />
            <FlexRowEndCenter style={{ width:"100%"}}>
                <FlexRowBetweenCenter style={{ marginTop: "50px" }}>
                    <FlexColumnAllCenter style={{ background: "#84848f", marginRight: "10px", padding: "20px 57px", borderRadius: "5px", cursor: "pointer" }}
                        onClick={onClose}>
                        <p style={{ fontSize: "16px", color: "white" }}>취소하기</p>
                    </FlexColumnAllCenter>
                    <FlexColumnAllCenter style={{ background: "black", padding: "20px 57px", borderRadius: "5px", cursor: "pointer" }} 
                        onClick={() => submit_re()}>
                        <p style={{ fontSize: "16px", color: "white" }}>제출하기</p>
                    </FlexColumnAllCenter>
                </FlexRowBetweenCenter>
            </FlexRowEndCenter>    
        </FlexColumnCenterStart>
    );
}

export default SuccessModal;

const Line = styled.div`
  height: 2px;
  background: #f0f0f0;
  width: 90%;
  margin: 25px 0 20px 0px;
`;

const Checkbox = styled.input`
  margin-right: 10px;
  transform: scale(1.2);
  cursor: pointer;
`;

const Label = styled.label`
  font-size: 16px;
  cursor: pointer;
`;

const InputText = styled.textarea.attrs({
    maxLength: 100, // 최대 입력 글자수 300자
})`
  width: 550px;
  height:124px;
  background-color: transparent;
  resize: none;          /* 크기 조절 불가 */
  overflow: auto;        /* 필요시 스크롤 표시 */
  outline: none;
  line-height: 1.5;
  padding:20px;
  margin-top:15px;
  border-radius: 10px;
  border: solid 2px #707070;
    color: black;      /* 글자 색상 */
    font-weight: 600;     /* 글자 두께 */
  &::placeholder {
    color: #91969c;      /* 글자 색상 */
    font-size: 18px;      /* 글자 크기 */
    font-weight: 600;     /* 글자 두께 */
  }
`;