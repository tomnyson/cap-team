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

export default function ForgotView() {
  const theme = useTheme();

  const router = useRouter();
  const { handleSubmit, control, formState: { errors } } = useForm();
  const { showToast } = useToast();

  const onSubmit = async (data) => {
    try {
      await authServices.ForgotPassword(data);
      showToast('kiểm tra email của bạn', 'success');
      // Redirect or show success message
    } catch (error) {
      console.error('Gửi mail thất bại', error.message);
    }
  };

  const renderForm = (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <Controller
          name="email"
          control={control}
          defaultValue=""
          rules={{ required: 'Email là bắt buộc', pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, message: 'email address không đúng' } }}
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
      </Stack>
      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
        <Link onClick={() => router.push('/confirm-otp')} variant="subtitle2" underline="hover" sx={{ cursor: 'pointer' }}>
          Xác Nhận OTP
        </Link>
      </Stack>

      <LoadingButton
        sx={{ marginTop: 3 }}
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="primary"
      >
        Gửi Email
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
          <Typography variant="h4">Quên Mật Khẩu</Typography>

          <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            Đã Nhờ tài khoản?
            <Link onClick={() => router.push('/login')} variant="subtitle2" sx={{ ml: 0.5, cursor: 'pointer' }}>
              Đăng nhập
            </Link>
          </Typography>
          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
