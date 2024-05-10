import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
const Navbar = () => {
  
  const navigate = useNavigate();
  const accountType = localStorage.getItem('accountType');
  const [showDropdown, setShowDropdown] = useState(false);

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <NavContainer>
      <NavMenu>
        <NavItem><NavLinks to="/">Find Job</NavLinks></NavItem>
        <NavItem><NavLinks to="/companies">Companies</NavLinks></NavItem>
        {accountType === 'hiring' && <NavItem><NavLinks to="/jobUpload">Upload Job</NavLinks></NavItem>}
        <NavItem><NavLinks to="/about">About</NavLinks></NavItem>
        <NavItem>
          <ProfileIcon onClick={handleDropdownToggle}>
            <FaUser />
            {showDropdown && (
              <DropdownMenu>
                <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
                <DropdownItem><NavLink to="/user">Profile</NavLink></DropdownItem>
              </DropdownMenu>
            )}
          </ProfileIcon>
        </NavItem>
      </NavMenu>
    </NavContainer>
  );
}

export default Navbar;

const NavContainer = styled.nav`
  background-color: #F7FDFD;
  color: #9333EA;
  padding: 10px;
`;

const NavMenu = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center; 
  justify-content: space-evenly;
`;

const NavItem = styled.li`
  margin-right: 10px;
`;

const NavLinks = styled(NavLink)`
  color: #9333EA;
  text-decoration: none;
  padding: 5px 10px;
  &:hover {
    opacity: 0.8;
  }
`;

const ProfileIcon = styled.div`
  position: relative;
  cursor: pointer;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
`;

const DropdownItem = styled.div`
  padding: 8px 10px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;
