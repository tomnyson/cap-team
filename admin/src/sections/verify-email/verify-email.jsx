import { useState } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import { useRouter } from 'src/routes/hooks';
import { bgGradient } from 'src/theme/css';
import { useForm, Controller } from 'react-hook-form';
import { useToast } from '../../context/ToastContext';
import authServices from '../../services/auth.services';
import { useSearchParams } from 'react-router-dom';

// ----------------------------------------------------------------------

export default function VerifyEmailView() {
  const theme = useTheme();

  const router = useRouter();
  const { handleSubmit, control, formState: { errors } } = useForm();
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');

  const { showToast } = useToast();
  const onSubmit = async (data) => {
    try {
      const payload = {
        otp: `${data.one}${data.two}${data.three}${data.four}${data.five}${data.six}`,
        email: email,
      }
      console.log(payload);
      await authServices.verifyEmail(payload);
      showToast('Tài khoản Email đã xác nhận!', 'success');
      router.push('/login');
    } catch (error) {
      showToast(error.message, 'error');
    }
  };

  const renderForm = (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={5}>
        <Stack direction={'row'} spacing={1}>
          {['one', 'two', 'three', 'four', 'five', 'six'].map((name) => (
            <Controller
              key={name}
              name={name}
              control={control}
              defaultValue=""
              rules={{
                required: 'Số là bắt buộc',
                pattern: {
                  value: /^[0-9]$/,
                  message: 'Chỉ được nhập một số từ 0 đến 9',
                }
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  inputProps={{ maxLength: 1 }}
                  error={!!errors[name]}
                  helperText={errors[name] ? errors[name].message : ''}
                  sx={{ marginBottom: 3 }}
                />
              )}
            />
          ))}
        </Stack>
      </Stack>
      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
        <Link onClick={() => router.push('/login')} variant="subtitle2" underline="hover">
          Đăng nhập
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
        Xác Nhận
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
          <Typography variant="h4">Xác Nhận OTP</Typography>
          <Typography variant="body2">Mã xác nhận đã gửi đến email {email}</Typography>

          <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            Chưa có mã?
            <Link onClick={() => router.push('/forgot-password')} variant="subtitle2" sx={{ ml: 0.5, cursor: 'pointer' }}>
              Gửi lại
            </Link>
          </Typography>
          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
