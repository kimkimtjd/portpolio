import { FlexRowBetweenCenter, FlexRowAllCenter , FlexColumnAllCenter , FlexColumnStartCenter } from "../css/common";
// import Logo_black from "../assets/main.png";
import Side_Bar from "../assets/common/sidebar_back.png";
import Option_first from "../assets/common/option_first.png";
import Option_second from "../assets/common/option_second.png";
import Option_third from "../assets/common/option_third.png";
import Side_Active from "../assets/common/side_active.png";
import Side_None from "../assets/common/side_active_none.png";
import { useState } from "react";

interface SidaBarProps {
    selectedIndex: number;
    onSelect: (index: number) => void;
}

const SidaBar = ({ selectedIndex, onSelect }: SidaBarProps) => {
    const [isOpen, setIsOpen] = useState(true);

    const option = [
        { img: Option_first , text: "About Me"},
        { img: Option_second , text: "Career"},
        { img: Option_third , text: "Project"},
        { img: Option_third , text: "Contact"},
    ];

    return (
        <FlexColumnStartCenter style={{
            background: "#f5f6f9", 
            height: "100%", 
            flexShrink: 0  ,
            width: isOpen ? "210px" : "86px", 
            transition: "width 0.3s"
        }}>
            {/* 로고 + 토글 */}
            <FlexRowBetweenCenter style={{ padding: "17px 20px", width: "100%" , justifyContent:"flex-end" }}>
               
                <FlexRowAllCenter style={{ cursor: "pointer" }} onClick={() => setIsOpen(prev => !prev)}>
                    <img
                        src={Side_Bar}
                        style={{ height: "28px", position: "relative", left: isOpen ? "20px" : "10px",
                            transform:isOpen? "" : "rotate(180deg)"
                        }}
                    />
                    <img
                        src={Side_Bar}
                        style={{ height: "28px", transform:isOpen? "" : "rotate(180deg)" , position:"relative" , right:isOpen? "" : "10px"}}
                    />
                </FlexRowAllCenter>
            </FlexRowBetweenCenter>

            {/* 메뉴 */}
            <FlexColumnAllCenter>
                {option.map((item, index) => (
                    <FlexRowBetweenCenter
                        key={index}
                        onClick={() => onSelect(index)} // 부모로 전달
                        style={{
                            width:isOpen? "176px" :"54px",
                            height:"68px",
                            borderRadius:"10px",
                            background:"white",
                            marginTop:index === 0 ? "15px" : "15px",
                            cursor:"pointer",
                            justifyContent:isOpen ? "" : "center"
                        }}
                    >
                        <FlexRowAllCenter>
                            {/* <img
                                src={item.img}
                                style={{ height: "32px", marginLeft: isOpen? "20px" : "0px" }}
                            /> */}
                            <p style={{
                                color:selectedIndex === index ? "#1c69ff" :"black",
                                marginLeft:"30px",
                                fontSize:"18px",
                                fontWeight:selectedIndex === index ? "bold": "",
                                display:isOpen?"block" : "none"
                            }}>{item.text}</p>
                        </FlexRowAllCenter>
                        <img
                            src={selectedIndex === index ? Side_Active : Side_None}
                            style={{ height: "20px", marginRight:"25px", display:isOpen?"block" : "none" }}
                        />
                    </FlexRowBetweenCenter>
                ))}
            </FlexColumnAllCenter>
        </FlexColumnStartCenter>
    );
};

export default SidaBar;
