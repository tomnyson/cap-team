import { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Stack } from '@mui/material';

export default function GroupsView() {
    const [groupName, setGroupName] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRoaWVuOTk5QGdtYWlsLmNvbSIsImlhdCI6MTcxNjgyNjMxNywiZXhwIjoxNzE2OTk5MTE3fQ.79tZJ1voY8Xq0v7jBFbziHwe7uVPlms31AlX4k8X6_M";
            const response = await axios.post('https://api.ptepathway.com/api/createGroup', {
                name: groupName,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}` // replace `token` with your actual token
                }
            });

            console.log(response.data);
        } catch (error) {
            console.error('There was an error!', error);
        }
    };

    return (
        <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4" sx={{ mb: 5 }}>
                    Tạo nhóm
                </Typography>

            </Stack>
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
            >

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <TextField
                        label="Tên nhóm"
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                        required
                    />
                    <Box mt={2}>
                        <Button type="submit">Tạo nhóm</Button>
                    </Box>
                </form>
            </Box>
        </Container>
    );
}