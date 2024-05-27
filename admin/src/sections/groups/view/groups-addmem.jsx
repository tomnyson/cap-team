import { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Stack } from '@mui/material';

export default function GroupsAddMember() {
    

    return (
        <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4" sx={{ mb: 5 }}>
                    Thêm thành viên vào nhóm
                    </Typography>

            </Stack>
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
            >


            </Box>
        </Container>
    );
}