import { useState } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import { useRouter } from 'src/routes/hooks';
import { bgGradient } from 'src/theme/css';
import Iconify from 'src/components/iconify';
import { useForm, Controller } from 'react-hook-form';
import { useToast } from '../../context/ToastContext';
import authServices from '../../services/auth.services';
// ----------------------------------------------------------------------

export default function LoginView() {
  const theme = useTheme();

  const router = useRouter();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const { showToast } = useToast();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    try {
      await authServices.login(data);
      showToast('Đăng nhập thành công', 'success');
      router.push('/dashboard');
    } catch (error) {
      showToast(error.message, 'error');
    }
  };

  const renderForm = (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <Controller
          name="email"
          control={control}
          defaultValue=""
          rules={{
            required: 'Email là bắt buộc',
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              message: 'email address không đúng',
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Email"
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ''}
              sx={{ marginBottom: 3 }}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          defaultValue=""
          rules={{
            required: 'Mật khẩu is required',
            minLength: { value: 6, message: 'Mật khẩu ít nhất 6 số' },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Password"
              type={showPassword ? 'text' : 'password'}
              error={!!errors.password}
              helperText={errors.password ? errors.password.message : ''}
              sx={{ marginBottom: 3 }}
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
          )}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
        <Link onClick={() => router.push('/forgot-password')} variant="subtitle2" underline="hover">
          Quên mật khẩu
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" color="primary">
        Login
      </LoadingButton>
    </form>
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
      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4">Đăng Nhập</Typography>

          <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            Chưa có tài khoản?
            <Link
              onClick={() => router.push('/register')}
              variant="subtitle2"
              sx={{ ml: 0.5, cursor: 'pointer' }}
            >
              Đăng ký
            </Link>
          </Typography>
          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
