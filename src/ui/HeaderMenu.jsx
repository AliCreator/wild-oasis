import { useNavigate } from "react-router-dom";
import ButtonIcon from "./ButtonIcon";
import Logout from "../features/authentication/Logout";
import DarkMode from "./DarkMode";
import styled from "styled-components";
import { HiOutlineUser } from "react-icons/hi2";

const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 0.4rem;
`;

export default function HeaderMenu() {
  const navigate = useNavigate();
  return (
    <StyledHeaderMenu>
      <li>
        <ButtonIcon onClick={() => navigate("/account")}>
          <HiOutlineUser />
        </ButtonIcon>
      </li>
      <li>
        <DarkMode />
      </li>
      <li>
        <Logout />
      </li>
    </StyledHeaderMenu>
  );
}
