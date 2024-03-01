'use client'
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Image from "next/image";

export default function DenseAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar style={{backgroundColor: 'rgb(76 29 149)'}} className='h-20 justify-center' position="static">
        <Toolbar variant="dense">
            <div className=" mr-4 w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 bg-white dark:ring-gray-500">
                <Image src='/logo.png' alt='hero' width={60}
                    height={50} className='object-contain'/>
            </div>
        
           
          <Typography variant="h6" color="inherit" component="div">
            Cat Lovers
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}