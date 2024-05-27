import { useState } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';
import { Grid } from '@mui/material';

// ----------------------------------------------------------------------

export default function RegisterView() {
  const theme = useTheme();

  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const handleClick = () => {
    router.push('/dashboard');
  };

  const renderForm = (
    <Grid container spacing={5}>
      <Grid item xs={6}>
        <TextField fullWidth name="email" label="Email" sx={{ marginBottom: 3 }} />
        <TextField
          name="password"
          fullWidth
          label="password"
          sx={{ marginBottom: 3 }}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField fullWidth name="password" label="Số ĐT" />
      </Grid>
      <Grid item xs={6}>

        <TextField fullWidth sx={{ marginBottom: 3 }} name="email" label="Email address" />
        <TextField fullWidth sx={{ marginBottom: 3 }} name="name" label="Tên người dùng" />
        <TextField fullWidth name="address" label="Địa chỉ" />
      </Grid>
      <Grid item xs={12}>
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          color="inherit"
          onClick={handleClick}
        >
          Đăng Nhập
        </LoadingButton>
      </Grid>
    </Grid>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 600,
          }}
        >
          <Typography variant="h4">Đăng ký Tài Khoản</Typography>

          <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            Đã có tài khoản?
            <Link variant="subtitle2" sx={{ ml: 0.5 }}>
              Đăng nhập
            </Link>
          </Typography>
          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
