import React from 'react';
import useDarkMode from 'use-dark-mode';
import { Switch } from 'antd';
import styled from 'styled-components'

const StyledSwitch = styled(Switch)`
  &.ant-switch {
    background-color: ${props => props.theme.colors.grey};
  }
`


const DarkModeToggle = () => {
  const darkMode = useDarkMode(false);

  return (
    <StyledSwitch checked={darkMode.value} onChange={darkMode.toggle} checkedChildren="🌙" unCheckedChildren="☀️" />
  );
};

export default DarkModeToggle;