"use client";

import React from 'react';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ConfigProvider, theme as antdTheme } from 'antd';

export function Providers({ children }: { children: React.ReactNode }) {
    const theme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    return (
        <ChakraProvider value={defaultSystem}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <ConfigProvider theme={{ algorithm: antdTheme.darkAlgorithm }}>
                    {children}
                </ConfigProvider>
            </ThemeProvider>
        </ChakraProvider>
    );
}
