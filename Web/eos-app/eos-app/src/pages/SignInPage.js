import useToggleValue from "hooks/useToggleValue";
import React from "react";
import LayoutAuthentication from "../layout/LayoutAuthentication";
import FormGroup from "components/common/FormGroup";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Label } from "components/label";
import { Input } from "components/input";
import { IconEyeToggle } from "components/icons";
import { Button, ButtonGoogle } from "components/button";
import { useDispatch } from "react-redux";
import { authLogin } from "store/auth/auth-slice";
import InputRadio from "components/radio/InputRadio";

const schema = yup.object({
  username: yup.string().required("This field is required"),
  password: yup
    .string()
    .required("This field is required")
    .min(8, "Password must be 8 character "),
  role_id: yup.number(),
});
const SignInPage = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
    defaultValues: {
      role_id: 1,
    },
  });
  const { value: showPassword, handleToggleValue: handleTogglePassword } =
    useToggleValue();
  const dispatch = useDispatch();
  const handleSignIn = (values) => {
    dispatch(authLogin(values));
  };
  const watchGender = watch("role_id");
  return (
    <LayoutAuthentication heading="Welcome Back!">
      <p className="mb-6 text-xs font-normal text-center lg:text-sm text-text3 lg:mb-8">
        Don't have an account?{" "}
        <Link to="/register" className="font-medium underline text-primary">
          Sign up
        </Link>
      </p>
      <ButtonGoogle text="Sign in with google"></ButtonGoogle>
      <form onSubmit={handleSubmit(handleSignIn)}>
        <FormGroup>
          <Label htmlFor="username">Email *</Label>
          <Input
            control={control}
            name="username"
            placeholder="example@gmail.com"
            error={errors.username?.message}
          ></Input>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="password">Password *</Label>
          <Input
            control={control}
            name="password"
            type={`${showPassword ? "text" : "password"}`}
            placeholder="Enter Password"
            error={errors.password?.message}
          >
            <IconEyeToggle
              open={showPassword}
              onClick={handleTogglePassword}
            ></IconEyeToggle>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="email">Role *</Label>
          <div className="flex items-center gap-5">
            <div className="flex gap-6">
              <InputRadio
                control={control}
                name="role_id"
                value={1}
                checked={watchGender == 1}
                // labelName="HR"
              ></InputRadio>
              <Label htmlFor="">Admin</Label>
            </div>
            <div className="flex gap-6">
              <InputRadio
                control={control}
                name="role_id"
                value={2}
                checked={watchGender == 2}
                // labelName="HR"
              ></InputRadio>
              <Label htmlFor="">Payroll</Label>
            </div>
            <div className="flex gap-6">
              <InputRadio
                control={control}
                name="role_id"
                value={3}
                checked={watchGender == 3}
                // labelName="HR"
              ></InputRadio>
              <Label htmlFor="">HR</Label>
            </div>
          </div>
          {/* <RadioHook
            control={control}
            name="gender"
            value="male"
            checked={watchGender === "male"}
          ></RadioHook> */}
        </FormGroup>
        <FormGroup>
          <div className="text-right">
            <span className="inline-block text-sm font-medium text-primary">
              Forgot password
            </span>
          </div>
        </FormGroup>
        <Button className="w-full" kind="primary" type="submit">
          Sign in
        </Button>
      </form>
    </LayoutAuthentication>
  );
};

export default SignInPage;
