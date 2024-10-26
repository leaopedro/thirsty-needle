import React from 'react';
import {  Link} from 'react-router-dom';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

type NavItemProps = {
    $isactive?: boolean;
};

const NavMenu: React.FC = () => {
    const location = useLocation();
    const $isactive = location.pathname === '/about';
    return (
    <NavMenuComponent>
        <StyledLink to="/participants">
            <NavItem $isactive={location.pathname === '/participants' ? true : undefined}>Participants</NavItem>
        </StyledLink>
        <StyledLink to="/trials">
            <NavItem $isactive={location.pathname === '/trials' ? true : undefined}>Trials</NavItem>
        </StyledLink>
    </NavMenuComponent>
  );
}

const NavMenuComponent = styled.nav`
    display: flex;
    gap: 20px;
    @media (max-width: 500px) {
        font-size: 12px;
    }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const NavItem = styled.div<NavItemProps>`
  color: ${(props) => (props.$isactive ? "#325F64" : "#757575")};
  font-weight: ${(props) => (props.$isactive ? "bold" : "normal")};
`;

export default NavMenu;