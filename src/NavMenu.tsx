import React from 'react';
import {  Link} from 'react-router-dom';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';


type NavItemProps = {
    isActive: boolean;
};

const NavMenu: React.FC = () => {
    const location = useLocation();
    const isActive = location.pathname === '/about';
    return (
    <NavMenuComponent>
        <StyledLink to="/participants">
            <NavItem isActive={location.pathname === '/participants'}>Participants</NavItem>
        </StyledLink>
        <StyledLink to="/trials">
            <NavItem isActive={location.pathname === '/trials'}>Trials</NavItem>
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
  color: ${(props) => (props.isActive ? "#325F64" : "#757575")};
  font-weight: ${(props) => (props.isActive ? "bold" : "normal")};
`;

export default NavMenu;