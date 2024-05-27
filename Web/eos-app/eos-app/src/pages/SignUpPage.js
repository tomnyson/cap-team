import useToggleValue from "hooks/useToggleValue";
import React from "react";
import LayoutAuthentication from "layout/LayoutAuthentication";
import FormGroup from "components/common/FormGroup";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Label } from "components/label";
import { Input } from "components/input";
import { IconEyeToggle } from "components/icons";
import { Checkbox } from "components/checkbox";
import { Button } from "components/button";
import { useDispatch } from "react-redux";
import { authRegister } from "store/auth/auth-slice";
import InputRadio from "components/radio/InputRadio";
import { toast } from "react-toastify";

const schema = yup.object({
  fullname: yup.string().required("This field is required"),
  username: yup.string().required("This field is required"),
  password: yup
    .string()
    .required("This field is required")
    .min(8, "Password must be 8 character "),
  retype_password: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
  role_id: yup.number(),
});

const SignUpPage = () => {
  const {
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
    defaultValues: {
      role_id: 2,
    },
  });
  const watchGender = watch("role_id");
  const dispatch = useDispatch();
  const handleSignUp = async (values) => {
    try {
      dispatch(authRegister({ ...values, permissions: [] }));

      reset({});
    } catch (error) {
      console.log(error);
    }
  };
  const { value: acceptTerm, handleToggleValue: handleToggleTerm } =
    useToggleValue();
  const { value: showPassword, handleToggleValue: handleTogglePassword } =
    useToggleValue();
  const {
    value: showRetyePassword,
    handleToggleValue: handleToggleRetypePassword,
  } = useToggleValue();
  return (
    <LayoutAuthentication heading="SignUp">
      <p className="mb-6 text-xs font-normal text-center lg:text-sm text-text3 lg:mb-8">
        Already have an account?{" "}
        <Link to="/login" className="font-medium underline text-primary">
          Login
        </Link>
      </p>
      <button className="flex items-center justify-center w-full py-4 mb-5 text-base font-semibold border gap-x-3 border-strock rounded-xl text-text2 dark:text-white dark:border-darkStroke">
        <img srcSet="/icon-google.png 2x" alt="icon-google" />
        <span>Sign up with google</span>
      </button>
      <p className="mb-4 text-xs font-normal text-center lg:text-sm lg:mb-8 text-text2 dark:text-white">
        Or sign up with account
      </p>
      <form onSubmit={handleSubmit(handleSignUp)}>
        <FormGroup>
          <Label htmlFor="fullname">Full Name *</Label>
          <Input
            control={control}
            name="fullname"
            placeholder="Kieroro"
            error={errors.fullname?.message}
          ></Input>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="username">Username *</Label>
          <Input
            control={control}
            name="username"
            type="text"
            placeholder="kienroro2003"
            error={errors.username?.message}
          ></Input>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="password">Password *</Label>
          <Input
            control={control}
            name="password"
            type={`${showPassword ? "text" : "password"}`}
            placeholder="Create a password"
            error={errors.password?.message}
          >
            <IconEyeToggle
              open={showPassword}
              onClick={handleTogglePassword}
            ></IconEyeToggle>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="password">Retype Password *</Label>
          <Input
            control={control}
            name="retype_password"
            type={`${showRetyePassword ? "text" : "password"}`}
            placeholder="Retype a password"
            error={errors.retype_password?.message}
          >
            <IconEyeToggle
              open={showRetyePassword}
              onClick={handleToggleRetypePassword}
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
                value={2}
                checked={watchGender == 2}
              ></InputRadio>
              <Label htmlFor="">Payroll</Label>
            </div>
            <div className="flex gap-6">
              <InputRadio
                control={control}
                name="role_id"
                value={3}
                checked={watchGender == 3}
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
        <div className="flex items-start mb-5 gap-x-5">
          <Checkbox name="term" checked={acceptTerm} onClick={handleToggleTerm}>
            <p className="flex-1 text-xs lg:text-sm text-text2 dark:text-text3">
              I agree to the
              <span className="underline text-secondary">
                {" "}
                Terms of Use
              </span>{" "}
              and have read and understand the
              <span className="underline text-secondary"> Privacy policy.</span>
            </p>
          </Checkbox>
        </div>
        <Button className="w-full" kind="primary" type="submit">
          Create my account
        </Button>
      </form>
    </LayoutAuthentication>
  );
};

export default SignUpPage;
