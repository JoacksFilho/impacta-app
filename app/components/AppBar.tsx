import {AppBar, Toolbar, Typography} from "@mui/material";
import Image from "next/image";
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import * as React from "react";

const pages = ['Início', 'DashBoard'];

const AppBarMenu = () => {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  
    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElUser(event.currentTarget);
    };
  
    const handleCloseNavMenu = () => {
      setAnchorElNav(null);
    };
  
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };
  
    return (
        
            <AppBar position="static" color="primary" style={{ marginBottom: "40px" }}>
                <Toolbar>
                <div style={{ marginRight: '10px', height: '120px', width: '100px' }}> {/* Ajuste o estilo conforme necessário */}
                    <Image src="/logo.png" alt="Logo" layout="fill" objectFit="contain" />
                </div>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    {pages.map((page) => (
                    <Button
                        key={page}
                        onClick={handleCloseNavMenu}
                        sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                        {page}
                    </Button>
                    ))}
                    </Box>
                </Toolbar>
            </AppBar>
        
    );
};

export default AppBarMenu;