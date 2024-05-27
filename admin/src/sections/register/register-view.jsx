import { useState } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { useRouter } from 'src/routes/hooks';
import { useForm, Controller } from 'react-hook-form';
import { bgGradient } from 'src/theme/css';
import Stack from '@mui/material/Stack';
import Iconify from 'src/components/iconify';
import { Grid } from '@mui/material';
import authServices from '../../services/auth.services';
import { useToast } from '../../context/ToastContext';

export default function RegisterView() {
  const theme = useTheme();
  const { showToast } = useToast();

  const router = useRouter();
  const { handleSubmit, control, watch, formState: { errors } } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const email = watch('email', '');

  const onSubmit = async (data) => {
    try {
      await authServices.register(data);
      showToast('Đăng ký tài khoản thành công kiểm tra email của bạn', 'success');
      router.push(`/verify-account?email=${email}`);
      // Redirect or show success message
    } catch (error) {
      showToast(error.message, 'error');
    }
  };

  const renderForm = (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={5}>
        <Grid item xs={12} md={6}>
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
          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{ required: 'Mật khẩu is required', minLength: { value: 6, message: 'Mật khẩu ít nhất 6 số' } }}
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
          <Controller
            name="phone_number"
            control={control}
            defaultValue=""
            rules={{
              required: 'Số ĐT bắt buộc',
              pattern: {
                value: /^(09|03|07|08|05)\d{8}$/,
                message: 'Số ĐT không hợp lệ'
              }
            }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Số ĐT"
                error={!!errors.phone_number}
                helperText={errors.phone_number ? errors.phone_number.message : ''}
              />
            )}
          />

        </Grid>
        <Grid item xs={12} md={6}>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            rules={{ required: 'Tên là bắt buộc' }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Tên"
                error={!!errors.name}
                helperText={errors.name ? errors.name.message : ''}
                sx={{ marginBottom: 3 }}
              />
            )}
          />
          <Controller
            name="address"
            control={control}
            defaultValue=""
            rules={{ required: 'Address is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Địa chỉ"
                error={!!errors.address}
                helperText={errors.address ? errors.address.message : ''}
              />
            )}
          />
          <FormControl sx={{ marginTop: 3 }}>
            <FormLabel id="gender-label">Giới Tính</FormLabel>
            <Controller
              name="gender"
              control={control}
              defaultValue="nam"
              render={({ field }) => (
                <RadioGroup {...field} row aria-labelledby="gender-label" name="gender">
                  <FormControlLabel value="nam" control={<Radio />} label="Nam" />
                  <FormControlLabel value="nữ" control={<Radio />} label="Nữ" />
                </RadioGroup>
              )}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
            <Link onClick={() => router.push(`/verify-email?email=${email}`)} variant="subtitle2" underline="hover">
              Xác Nhận tài khoản với OTP
            </Link>
          </Stack>
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            color="primary"
          >
            Đăng Ký
          </LoadingButton>

        </Grid>
      </Grid>
    </form>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Card
        sx={{
          p: 5,
          width: 1,
          maxWidth: 600,
          height: 'auto',
        }}
      >
        <Typography variant="h4">Đăng ký Tài Khoản</Typography>

        <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
          Đã có tài khoản?   <Link onClick={() => router.push('/login')} to="/login" sx={{ ml: 0.5 }}>
            Đăng nhập
          </Link>
        </Typography>

        {renderForm}
      </Card>
    </Box>
  );
}
