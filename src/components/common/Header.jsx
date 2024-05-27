import { useRecoilState, useSetRecoilState } from "recoil";
import { StyledIcon } from "../../css/styled/Main/main.styled";
import { HeaderContainer } from "../../css/styled/common/header.styled";
import { IconsState } from "../../hooks/iconsState";
import { ChatActiveState } from "../../hooks/chatActiveState";
import { RoomsState } from "../../hooks/roomsState";
import { Bell } from "../Bell/Bell";
<<<<<<< HEAD
import HoverIcon from "./HoverIcon";
import { useState } from "react";
=======
import { getRoomInfo, getRole } from "../../function/common.js";
import { useState, useEffect } from "react";
>>>>>>> 16906166c7b7a70a9db41c971ba9b843c659540f

export const Header = () => {
    const [iconsState, setIconsState] = useRecoilState(IconsState);
    const setIsChatActive = useSetRecoilState(ChatActiveState);
<<<<<<< HEAD
    const [isHovered, setIsHovered] = useState(false);

    function handleMouseEnterOrLeave() {
        setIsHovered(!isHovered);
    }

    function example() {
        roomInfos.map(roomInfo => {
            setRoomsState(prevState => [...prevState, roomInfo]);
        })

    }
=======
    const [roomsState, setRoomsState] = useRecoilState(RoomsState);
    const [clicked, setClicked] = useState(false); // 클릭 여부를 저장하는 상태
    const handleGetRoomInfo = async () => {
        try {
            const roomInfos = await getRoomInfo();
            const role = await getRole(); // 로컬 스토리지에서 role 값을 가져옴
            // 역할에 따라서 roomsState 업데이트
            if (role === "TEACHER") {
                roomInfos.map(roomInfo => {
                    setRoomsState(prevState =>[...prevState, 
                        {
                            parentUserId: roomInfo.parentUserId,
                            parentName: roomInfo.parentName,
                            roomId: roomInfo.roomId
                        }
                    ]);
                });
            } else if (role === "PARENT") {
                roomInfos.map(roomInfo => {
                    setRoomsState(prevState => [...prevState,
                        {                        
                            teacherUserId: roomInfo.teacherUserId,
                            teacherName: roomInfo.teacherName,
                            roomId: roomInfo.roomId
                        }
                    ]);
                });
            }
        } catch (error) {
            console.error("Error fetching room info:", error);
        }
    };
    // useEffect 훅을 사용하여 업데이트 이후의 상태를 출력
    useEffect(() => {
        console.log(roomsState);
    }, [roomsState]);
>>>>>>> 16906166c7b7a70a9db41c971ba9b843c659540f

    return (
        <HeaderContainer>
            <div className="temporary_wrapper">
                <StyledIcon className="fas fa-user" size='30px' onClick={()=> {
                    setIsChatActive(false);
                    setIconsState(()=> ({
                        chatList: false,
                        peopleList: true,
                        setProfile: false,
                        house: false,
                        bell: false
                    }));
                }} $selected={iconsState["peopleList"] === true ? 'true' : 'false'} />
                <StyledIcon className="fas fa-comment" size="30px" onClick={()=> {
                    setIconsState(()=> ({
                        chatList: true,
                        peopleList: false,
                        setProfile: false,
                        house: false,
                        bell: false
                    }));
                }} $selected={iconsState["chatList"] === true ? 'true' : 'false'} />
            </div>
        
<<<<<<< HEAD
            <div className="temporary_wrapper"  style={{
                position: "relative"
            }}>
                <HoverIcon isVisible={isHovered}/>
                <StyledIcon className="fa-solid fa-rotate" size="30px" 
                    onMouseEnter={handleMouseEnterOrLeave}
                    onMouseLeave={handleMouseEnterOrLeave}
=======
            <div className="temporary_wrapper">
                <StyledIcon className="fa-solid fa-rotate" size="30px" onClick={() => handleGetRoomInfo()}
>>>>>>> 16906166c7b7a70a9db41c971ba9b843c659540f
                />
            </div>

            <div className="temporary_wrapper" style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}>
                <Bell />
                <StyledIcon className="fa-solid fa-clock" size="30px" onClick={() => {
                    setIconsState(()=> ({
                        chatList: false,
                        peopleList: false,
                        setProfile: true,
                        house: false,
                        bell: false
                    }));
                }} $selected={iconsState["setProfile"] === true ? 'true' : 'false'}/>
    
                {/* 매안 공간 : 차트, 알림 등등 보여주기 */}
                <StyledIcon className="fa-solid fa-house" size="30px" onClick={() => {
                    setIconsState(()=> ({
                        chatList: false,
                        peopleList: false,
                        setProfile: false,
                        house: true,
                        bell: false
                    }));
                }} $selected={iconsState["house"] === true ? 'true' : 'false'}/>
            </div>   
        </HeaderContainer>
    )
}