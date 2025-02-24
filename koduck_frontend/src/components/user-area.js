import React, { useState, useEffect, useContext } from 'react';

import { Button, Menu } from '@arco-design/web-react';
import { IconLaunch, IconUser } from '@arco-design/web-react/icon';

import { useNavigate, useLocation } from 'react-router-dom';
import { useBreakpoint, isMobile, breakpoints } from '../hooks/breakpoint';
import { AuthContext } from '../providers/auth-provider';

const MenuItem = Menu.Item;

const UserArea = ({ className }) => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const breakpoint = useBreakpoint();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleLogoutClick = () => {
    logout();
    window.location.reload();
  }

  const openUserGuide = () => {
    window.open('https://github.com/hjl667/kodee', '_blank');
  };

  return (
    isMobile(breakpoint)
    ? <div className='flex flex-row justify-end items-center h-full w-full space-x-2'>
        <Button type="dashed" shape="circle" onClick={openUserGuide}>
          <IconLaunch />
        </Button>
        <Button type="dashed" shape="circle" onClick={handleLoginClick}>
          <IconUser />
        </Button>
      </div>
    :<Menu
        className={className}
        mode={'vertical'}
      >
        <MenuItem onClick={openUserGuide}>
          <IconLaunch className='text-base'/>
          User Guide
        </MenuItem>
        {
          // 登陆之后不可再跳转近登陆页面
          !isLoggedIn() ?
            <MenuItem onClick={handleLoginClick}> 
              <IconUser className='text-lg'/>
              Log In
            </MenuItem>
          :
            <MenuItem onClick={handleLogoutClick}> 
              <IconUser className='text-lg'/>
              Log Out
            </MenuItem>
        }
      </Menu>
  );
};

export default UserArea;
