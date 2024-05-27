import * as yup from "yup";
import useOnChange from "hooks/useOnChange";
import ReactQuill, { Quill } from "react-quill";
import React, { useMemo, useState } from "react";
import ImageUploader from "quill-image-uploader";
import FormRow from "components/common/FormRow";
import FormGroup from "components/common/FormGroup";
import DatePicker from "react-date-picker";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { Label } from "components/label";
import { Input, Textarea } from "components/input";
import { Dropdown } from "components/dropdown";
import { Button } from "components/button";
import "react-quill/dist/quill.snow.css";
import { axiosPrivate } from "api/axios";
import { useSelector } from "react-redux";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import { yupResolver } from "@hookform/resolvers/yup";
import InputRadio from "components/radio/InputRadio";
Quill.register("modules/imageUploader", ImageUploader);

const schema = yup.object({
  first_name: yup.string().required("This field is required"),
  middle_initial: yup.string().required("This field is required"),
  last_name: yup.string().required("This field is required"),
  birthday: yup.date(),
  ssn: yup
    .string()
    .required("This field is required")
    .matches(/^\d{9}$/, "Invalid ssn"),
  gender: yup.bool(),
});

const AdminAddNew = () => {
  const axiosPrivate = useAxiosPrivate();
  const {
    handleSubmit,
    control,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      gender: true,
    },
  });
  const [listBenefitPlan, setListBenefitPlan] = useState([]);
  const [listPayRate, setListPayRate] = useState([]);
  const [labelSelect, setLabelSelect] = useState({});
  const watchGender = watch("gender");
  const [content, setContent] = React.useState("");
  const resetValues = () => {
    reset({});
  };
  const handleAddNewCampaign = async (values) => {
    values = { ...values, birthday: new Date(values.birthday) };
    console.log("🚀 ~ handleAddNewCampaign ~ values:", values);

    try {
      await axiosPrivate.post(`/personal_integration`, {
        ...values,
      });
      toast.success("Create campaign successfully");
      resetValues();
    } catch (error) {
      toast.error("Can not create new campaign");
    }
    // values, startDate, endDate, content
  };
  const handleSelectDropdownOption = (name, value) => {
    setValue(name, value);
  };

  const getDropdownLabel = (label, defaultValue = "") => {
    const value = label || defaultValue;
    return value;
  };
  const [countries, setCountries] = useState([]);
  const [filterCountry, setFilterCountry] = useOnChange(500);
  useEffect(() => {
    async function fetchBenefitPlans() {
      try {
        const response = await axiosPrivate.get(`/benefit_plans`);
        setListBenefitPlan(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    async function fetchPayRates() {
      try {
        const response = await axiosPrivate.get(`/pay_rate`);
        setListPayRate(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchBenefitPlans();
    fetchPayRates();
  }, []);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  return (
    <div className="bg-white rounded-xl py-10 px-[66px]">
      <div className="text-center">
        <h1 className="py-4 px-14 bg-text4 bg-opacity-5 rounded-xl font-bold text-[25px] inline-block mb-10">
          Start a Personal 🚀
        </h1>
        <form onSubmit={handleSubmit(handleAddNewCampaign)}>
          {/* First, last, middle */}
          <FormRow numberCols={3}>
            <FormGroup>
              <Label>First Name *</Label>
              <Input
                control={control}
                name="first_name"
                placeholder="Write a title"
                error={errors.first_name?.message}
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label>Middle Name *</Label>
              <Input
                control={control}
                name="middle_initial"
                placeholder="Write a title"
                error={errors.middle_initial?.message}
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label>Last Name *</Label>
              <Input
                control={control}
                name="last_name"
                placeholder="Write a title"
                error={errors.last_name?.message}
              ></Input>
            </FormGroup>
          </FormRow>
          {/* Birthday, ssn */}
          <FormRow>
            <FormGroup>
              <Label>Birthday *</Label>
              <Controller
                control={control}
                name="birthday"
                type="date"
                render={({ field }) => (
                  <DatePicker
                    placeholderText="Select date"
                    onChange={(date) => field.onChange(date)}
                    selected={field.value}
                    value={field.value}
                    maxDate={new Date()}
                    format="dd-MM-yyyy"
                  />
                )}
              />
              {/* <DatePicker
                control={control}
                name="birthday"
                onChange={setStartDate}
                value={startDate}
                format="dd-MM-yyyy"
              /> */}
            </FormGroup>
            <FormGroup>
              <Label>Social Security Number *</Label>
              <Input
                control={control}
                name="ssn"
                placeholder="Write a ssn"
                error={errors.ssn?.message}
              ></Input>
            </FormGroup>
          </FormRow>
          {/* Benefit, pay rate */}
          <FormRow numberCols={2}>
            <FormGroup>
              <Label>Benefit Plan *</Label>
              <Dropdown>
                <Dropdown.Select
                  placeholder={getDropdownLabel(
                    labelSelect.planName,
                    "Select benefit"
                  )}
                ></Dropdown.Select>
                <Dropdown.List>
                  {listBenefitPlan &&
                    listBenefitPlan.length > 0 &&
                    listBenefitPlan.map((value) => (
                      <Dropdown.Option
                        key={value.benefitPlanId}
                        onClick={() => {
                          handleSelectDropdownOption(
                            "benefit_plans_id",
                            value.benefitPlanId
                          );
                          setLabelSelect((item) => {
                            return {
                              ...item,
                              planName: value.planName.trim(),
                            };
                          });
                        }}
                      >
                        <span>{value.planName.trim()}</span>
                      </Dropdown.Option>
                    ))}
                </Dropdown.List>
              </Dropdown>
            </FormGroup>
            <FormGroup>
              <Label>Pay Rate *</Label>
              <Dropdown>
                <Dropdown.Select
                  placeholder={getDropdownLabel(
                    labelSelect.payRateName,
                    "Select pay rate"
                  )}
                ></Dropdown.Select>
                <Dropdown.List>
                  {listPayRate &&
                    listPayRate.length > 0 &&
                    listPayRate.map((value, index) => (
                      <Dropdown.Option
                        key={value.idPayRate}
                        onClick={() => {
                          handleSelectDropdownOption(
                            "pay_pates_id",
                            value.idPayRate
                          );
                          setLabelSelect((item) => {
                            return {
                              ...item,
                              payRateName: value.payRateName,
                            };
                          });
                        }}
                      >
                        {value.payRateName}
                      </Dropdown.Option>
                    ))}
                </Dropdown.List>
              </Dropdown>
            </FormGroup>
          </FormRow>
          <FormRow>
            <FormGroup>
              <Label>Gender *</Label>
              <div className="flex items-center gap-5">
                <div className="flex gap-6">
                  <InputRadio
                    control={control}
                    name="gender"
                    value={true}
                    checked={watchGender}
                  ></InputRadio>
                  <Label htmlFor="">Male</Label>
                </div>
                <div className="flex gap-6">
                  <InputRadio
                    control={control}
                    name="gender"
                    value={false}
                    // checked={!watchGender}
                  ></InputRadio>
                  <Label htmlFor="">Female</Label>
                </div>
              </div>
              {errors?.gender?.message && (
                <span className="text-sm font-medium pointer-events-none text-error">
                  {errors.gender.message}
                </span>
              )}
            </FormGroup>
          </FormRow>
          <div className="mt-10 text-center">
            <Button
              type="submit"
              className="px-10 mx-auto text-white bg-primary"
            >
              Submit new personal{" "}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminAddNew;
