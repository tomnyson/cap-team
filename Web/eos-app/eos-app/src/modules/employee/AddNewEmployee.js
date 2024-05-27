import * as yup from "yup";

import { Quill } from "react-quill";
import React, { useState } from "react";
import ImageUploader from "quill-image-uploader";
import FormRow from "components/common/FormRow";
import FormGroup from "components/common/FormGroup";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { Label } from "components/label";
import { Input } from "components/input";
import { Dropdown } from "components/dropdown";
import { Button } from "components/button";
import "react-quill/dist/quill.snow.css";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import { yupResolver } from "@hookform/resolvers/yup";
import InputRadio from "components/radio/InputRadio";
import { useForm } from "react-hook-form";
Quill.register("modules/imageUploader", ImageUploader);

const schema = yup.object({
  first_name: yup.string().required("This field is required"),
  middle_initial: yup.string().required("This field is required"),
  last_name: yup.string().required("This field is required"),
  pay_last_year: yup
    .string()
    .required("This field is required")
    .matches(/^\d{2}$/, "Invalid"),
  paid_to_date: yup
    .string()
    .required("This field is required")
    .matches(/^\d{2}$/, "Invalid"),
  birthday: yup.date(),
  ssn: yup
    .string()
    .required("This field is required")
    .matches(/^\d{9}$/, "Invalid ssn"),
  vacation_days: yup
    .string()
    .required("This field is required")
    .matches(/^\d+$/, "Invalid"),
});
const AddNewEmployee = () => {
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
  const [listPayRate, setListPayRate] = useState([]);
  const [labelSelect, setLabelSelect] = useState({});
  const watchGender = watch("gender");
  const resetValues = () => {
    reset({});
  };
  const handleAddNewCampaign = async (values) => {
    console.log("🚀 ~ handleAddNewCampaign ~ values:", values);

    try {
      await axiosPrivate.post(`/personal_integration/employee`, {
        ...values,
      });
      toast.success("Create employee successfully");
      resetValues();
    } catch (error) {
      toast.error("Can not create new employee");
    }
  };
  const handleSelectDropdownOption = (name, value) => {
    setValue(name, value);
  };

  const getDropdownLabel = (label, defaultValue = "") => {
    const value = label || defaultValue;
    return value;
  };
  useEffect(() => {
    async function fetchPayRates() {
      try {
        const response = await axiosPrivate.get(`/pay_rate`);
        setListPayRate(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchPayRates();
  }, []);
  return (
    <div className="bg-white rounded-xl py-10 px-[66px]">
      <div className="text-center">
        <h1 className="py-4 px-14 bg-text4 bg-opacity-5 rounded-xl font-bold text-[25px] inline-block mb-10">
          Start a Employee 🚀
        </h1>
        <form onSubmit={handleSubmit(handleAddNewCampaign)}>
          {/* First, last, middle */}
          <FormRow numberCols={3}>
            <FormGroup>
              <Label>First Name *</Label>
              <Input
                control={control}
                name="first_name"
                placeholder="Write something"
                error={errors.first_name?.message}
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label>Middle Name *</Label>
              <Input
                control={control}
                name="middle_initial"
                placeholder="Write something"
                error={errors.middle_initial?.message}
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label>Last Name *</Label>
              <Input
                control={control}
                name="last_name"
                placeholder="Write something"
                error={errors.last_name?.message}
              ></Input>
            </FormGroup>
          </FormRow>
          {/* Birthday, ssn */}
          <FormRow numberCols={3}>
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
            <FormGroup>
              <Label>Vacation days</Label>
              <Input
                control={control}
                name="vacation_days"
                placeholder="Write something"
                error={errors.vacation_days?.message}
              ></Input>
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
          <FormRow numberCols={2}>
            <FormGroup>
              <Label>Paid Last Year</Label>
              <Input
                control={control}
                name="pay_last_year"
                placeholder="Write something"
                error={errors.pay_last_year?.message}
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label>Pay To Date</Label>
              <Input
                control={control}
                name="paid_to_date"
                placeholder="Write something"
                error={errors.paid_to_date?.message}
              ></Input>
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
              Submit new employee{" "}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewEmployee;
