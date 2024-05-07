import Divider from '@mui/material/Divider';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Icon from '@mui/material/Icon';
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import './App.css';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

import Avatar from '@mui/material/Avatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';

import { TwitterPicker, ColorResult } from 'react-color';
const label = { inputProps: { 'aria-label': 'Switch demo' } };

var colorDef = ['#FF6900', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3', '#ABB8C3', '#EB144C', '#F78DA7', '#9900EF'];

const postData = async (data: any) => {
  try {
      const response = await fetch('/endpoint', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
      });
      return await response.json();
  } catch (error) {
      throw new Error(`Error sending data: ${error}`);
  }
};

function sendItemUpdate(data: any) {
  if (data) {
    var response: any = postData(data)
  }
}

interface LightSwitchProps {
  initialState: boolean;
  switchName: string;
}

interface ColorPickerMenuProps {
  button: React.ReactNode;
  onColorChange: (color: ColorResult) => void;
}

const ColorPickerMenu: React.FC<ColorPickerMenuProps> = ({ button, onColorChange }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      {React.cloneElement(button as React.ReactElement, {
        onClick: handleClick,
      })}
      <Menu
        id="color-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem>
          <TwitterPicker 
            onChangeComplete={onColorChange} 
            triangle="hide"
            colors={colorDef}
          />
        </MenuItem>
      </Menu>
    </div>
  );
};

const items = [
  { title: 'Main Light', isOn: false, id: 1 },
  { title: 'Bedroom Light', isOn: false, id: 2 },
  { title: 'Bedroom Light 2', isOn: false, id: 3 },
];

const findIdByName = (name: string): number | null => {
  const item = items.find((item) => item.title === name);
  return item ? item.id : null;
};

const LightSwitchWithColorPicker: React.FC<LightSwitchProps> = ({ initialState, switchName }) => {
  const [checked, setChecked] = useState(initialState);
  const [lightColor, setLightColor] = useState<string>('#FCB900'); // Initial color



  const handleChange = () => {
    setChecked((prev) => !prev);
    let lData = {
      command: "switchChange",
      id: findIdByName(switchName),
      state: !checked,
      color: lightColor
    }
    
    sendItemUpdate(lData)
  };

  const handleColorChange = (color: ColorResult) => {
    const hexColor = color.hex;
    setLightColor(hexColor);
    let lData = {
      command: "colorChange",
      id: findIdByName(switchName),
      state: checked,
      color: lightColor
    }
    console.log(lData)
    sendItemUpdate(lData)
  };

  return (
    <Box display="flex" alignItems="center">
      <Switch
        checked={checked}
        onChange={handleChange}
        color="primary"
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
      <Chip label={switchName} variant="outlined" color={ !checked ? "default" : "primary"} sx={{ marginLeft: 3, marginRight: 3, width: "200px"}}/>
      <Box ml={1}>
        <ColorPickerMenu 
          button={
            <IconButton aria-label="delete">
              <LightbulbIcon style={{ color: checked ? lightColor : "#8F8F8F" }} />
            </IconButton>
          } 
          onColorChange={handleColorChange}
        />
      </Box>
    </Box>
  );
};

interface LightSwitchCardProps {
  switchName: string;
  initialState: boolean;
}

const LightSwitchCard: React.FC<LightSwitchCardProps> = ({ switchName, initialState}) => {
  return (
    <Card
      sx={{ 
        minWidth: 275, 
        maxWidth: 400, 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginBottom: "3px"
      }}
    >
      <Box>
        <LightSwitchWithColorPicker switchName={switchName} initialState={initialState} />
      </Box>
    </Card>
  );
};



function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Typography sx={{ minWidth: 100 }}>     <a target="_blank" href={process.env.PUBLIC_URL + "/hemsida/" + "index.html"} > Home</a></Typography>
        <Typography sx={{ minWidth: 100 }}>Configuration</Typography>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose}>
          <Avatar /> Profile
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}

export default function MyApp() {

  const listItems = items.map(item => <li><LightSwitchCard switchName={item.title} initialState={item.isOn}/></li>);

  return (
    <div>
      <Box sx={{display: 'inline-block'}}><AccountMenu /></Box>
      <br></br>
      <Divider textAlign="center">PAGE</Divider>
      <ul className={"lightList"} id="lightList" >{listItems}</ul>
    </div>
  );
}