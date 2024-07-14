import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Tabs, Tab, Box, Container } from '@mui/material';

const Navbar: React.FC = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <AppBar position="static" style={{ backgroundColor: '#DA0037', borderRadius: '1rem', marginTop: '2rem' }}>
            <Container maxWidth="lg">
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h6" noWrap component="div" sx={{ color: '#EDEDED', fontWeight: '700', cursor: 'default' }}>
                        Nia Pixel Show
                    </Typography>
                    <Box sx={{ display: 'flex' }}>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            TabIndicatorProps={{ style: { display: 'none' } }}
                        >
                            <Tab
                                label="Inicio"
                                disableRipple
                                sx={{
                                    color: '#EDEDED',
                                    fontWeight: '400',
                                    mx: 1.8,
                                    '&.Mui-selected': { color: '#EDEDED', fontWeight: '600' },
                                }}
                            />
                            <Tab
                                label="Sobre nós"
                                disableRipple
                                sx={{
                                    color: '#EDEDED',
                                    fontWeight: '400',
                                    mx: 1.8,
                                    '&.Mui-selected': { color: '#EDEDED', fontWeight: '600' },
                                }}
                            />
                            <Tab
                                label="Contato"
                                disableRipple
                                sx={{
                                    color: '#EDEDED',
                                    fontWeight: '400',
                                    mx: 1.8,
                                    '&.Mui-selected': { color: '#EDEDED', fontWeight: '600' },
                                }}
                            />
                        </Tabs>
                    </Box>
                    <Box sx={{ display: 'flex', gap: '1rem' }}>
                        <IconButton aria-label="cart" sx={{ color: '#EDEDED' }}>
                            <ShoppingCartIcon />
                        </IconButton>
                        <IconButton aria-label="account" sx={{ color: '#EDEDED' }}>
                            <AccountCircleIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar;
