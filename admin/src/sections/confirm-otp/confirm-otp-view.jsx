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
import { useForm, Controller } from 'react-hook-form';
import { useToast } from '../../context/ToastContext';
import authServices from '../../services/auth.services';
// ----------------------------------------------------------------------

export default function ConfirmOTPVIEW() {
  const theme = useTheme();

  const router = useRouter();
  const { handleSubmit, control, watch, formState: { errors } } = useForm();
  const { showToast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const password = watch('password', '');
  const onSubmit = async (data) => {
    try {
      const payload = {
        otp: `${data.one}${data.two}${data.three}${data.four}${data.five}${data.six}`,
        password: data.password,
      }
      console.log(payload);
      await authServices.confirmOTP(payload);
      showToast('Đã thay đổi mật khẩu thành công!', 'success');
      router.push('/login');
      // Redirect or show success message
    } catch (error) {
      console.error('Lỗi xác nhận OTP:', error.message);
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

        <Controller
          name="password"
          control={control}
          defaultValue=""
          rules={{ required: 'Mật khẩu là bắt buộc', minLength: { value: 6, message: 'Mật khẩu ít nhất 6 số' } }}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Mật khẩu"
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
        <Controller
          name="passwordConfirm"
          control={control}
          defaultValue=""
          rules={{
            required: 'Mật khẩu là bắt buộc', minLength: { value: 6, message: 'Mật khẩu ít nhất 6 số' },
            validate: value =>
              value === password || 'Mật khẩu xác nhận không khớp',
          }}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Xác nhận mật khẩu"
              type={showPassword ? 'text' : 'password'}
              error={!!errors.passwordConfirm}
              helperText={errors.passwordConfirm ? errors.passwordConfirm.message : ''}
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
        <Link onClick={() => router.push('/confirm-otp')} variant="subtitle2" underline="hover">
          Xác nhận OTP
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
