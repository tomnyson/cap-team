import useOnChange from "hooks/useOnChange";
import ReactQuill, { Quill } from "react-quill";
import React, { useMemo, useState } from "react";
import ImageUploader from "quill-image-uploader";
import ImageUpload from "components/image/ImageUpload";
import FormRow from "components/common/FormRow";
import FormGroup from "components/common/FormGroup";
import DatePicker from "react-date-picker";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { Label } from "components/label";
import { Input, Textarea } from "components/input";
import { Dropdown } from "components/dropdown";
import { Button } from "components/button";
import { apiURL, imgbbAPI } from "config/config";
import "react-quill/dist/quill.snow.css";
import Address from "components/selectAddress/Address";
Quill.register("modules/imageUploader", ImageUploader);

const categoriesData = ["architecture", "education"];

const CampaignAddNew = () => {
  const [address, setAddress] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [resetAddress, setResetAddress] = useState(false);
  const { handleSubmit, control, setValue, reset, watch } = useForm();
  const getDropdownLabel = (name, defaultValue = "") => {
    const value = watch(name) || defaultValue;
    return value;
  };
  const [content, setContent] = React.useState("");
  const resetValues = () => {
    setStartDate("");
    setEndDate("");
    reset({});
  };
  const handleAddNewCampaign = async (values) => {
    console.log(values);
    try {
      await axios.post(`${apiURL}/campaigns`, {
        ...values,
        content,
        startDate,
        endDate,
      });
      toast.success("Create campaign successfully");
      resetValues();
    } catch (error) {
      toast.error("Can not create new campaign");
    }
    // values, startDate, endDate, content
  };
  const modules = useMemo(
    () => ({
      toolbar: [
        ["bold", "italic", "underline", "strike"],
        ["blockquote"],
        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: "ordered" }, { list: "bullet" }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["link", "image"],
      ],
      imageUploader: {
        upload: async (file) => {
          const bodyFormData = new FormData();
          bodyFormData.append("image", file);
          const response = await axios({
            method: "post",
            url: imgbbAPI,
            data: bodyFormData,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          return response.data.data.url;
        },
      },
    }),
    []
  );
  const handleSelectDropdownOption = (name, value) => {
    setValue(name, value);
  };
  const [countries, setCountries] = useState([]);
  const [filterCountry, setFilterCountry] = useOnChange(500);
  useEffect(() => {
    async function fetchCountries() {
      if (!filterCountry) return;
      try {
        const response = await axios.get(
          `https://restcountries.com/v3.1/name/${filterCountry}`
        );
        setCountries(response.data);
      } catch (error) {
        toast.error(error.message);
      }
    }
    fetchCountries();
  }, [filterCountry]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  return (
    <div className="bg-white rounded-xl py-10 px-[66px]">
      <div className="text-center">
        <h1 className="py-4 px-14 bg-text4 bg-opacity-5 rounded-xl font-bold text-[25px] inline-block mb-10">
          Start a Personal 🚀
        </h1>
        <form onSubmit={handleSubmit(handleAddNewCampaign)}>
          <FormRow numberCols={3}>
            <FormGroup>
              <Label>First Name *</Label>
              <Input
                control={control}
                name="title"
                placeholder="Write a title"
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label>Middle Name *</Label>
              <Input
                control={control}
                name="title"
                placeholder="Write a title"
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label>Last Name *</Label>
              <Input
                control={control}
                name="title"
                placeholder="Write a title"
              ></Input>
            </FormGroup>
          </FormRow>
          <FormRow numberCols={3}>
            <FormGroup>
              <Label>Social Security Number</Label>
              <Input
                control={control}
                name="title"
                placeholder="Write a title"
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label>Drivers License</Label>
              <Input
                control={control}
                name="title"
                placeholder="Write a title"
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label>Zip</Label>
              <Input
                control={control}
                name="title"
                placeholder="Write a title"
              ></Input>
            </FormGroup>
          </FormRow>
          <FormRow numberCols={2}>
            <FormGroup>
              <Label>City</Label>
              <Dropdown>
                <Dropdown.Select placeholder="Select one"></Dropdown.Select>
                <Dropdown.List>Hello</Dropdown.List>
              </Dropdown>
            </FormGroup>
            <FormGroup>
              <Label>Country</Label>
              <Dropdown>
                <Dropdown.Select
                  placeholder={getDropdownLabel("country", "Select country")}
                ></Dropdown.Select>
                <Dropdown.List>
                  <Dropdown.Search
                    placeholder="Search country..."
                    onChange={setFilterCountry}
                  ></Dropdown.Search>
                  {countries.length > 0 &&
                    countries.map((country) => (
                      <Dropdown.Option
                        key={country?.name?.common}
                        onClick={() =>
                          handleSelectDropdownOption(
                            "country",
                            country?.name?.common
                          )
                        }
                      >
                        {country?.name?.common}
                      </Dropdown.Option>
                    ))}
                </Dropdown.List>
              </Dropdown>
            </FormGroup>
          </FormRow>
          <FormRow numberCols={3}>
            <Address
              setAddress={setAddress}
              setResetAddress={setResetAddress}
              setProvince={setProvince}
              setDistrict={setDistrict}
              setWard={setWard}
            />
          </FormRow>
          <FormRow numberCols={1}>
            <div className="mb-4 w-full">
              <Label htmlFor="input_address">Địa Chỉ *</Label>
              <textarea
                className="block h-[100px] w-full rounded-xl py-3 pl-4 pr-10 shadow outline-none"
                id="input_address"
                placeholder="địa chỉ"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </FormRow>
          {/* Address2 */}
          <FormRow numberCols={3}>
            <Address
              setAddress={setAddress}
              setResetAddress={setResetAddress}
              setProvince={setProvince}
              setDistrict={setDistrict}
              setWard={setWard}
            />
          </FormRow>
          <FormRow numberCols={1}>
            <div className="mb-4 w-full">
              <Label htmlFor="input_address">Địa Chỉ *</Label>
              <textarea
                className="block h-[100px] w-full rounded-xl py-3 pl-4 pr-10 shadow outline-none"
                id="input_address"
                placeholder="địa chỉ"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </FormRow>
          <FormGroup>
            <Label>Short Description *</Label>
            <Textarea
              name="short_description"
              placeholder="Write a short description...."
              control={control}
            ></Textarea>
          </FormGroup>
          <FormGroup>
            <Label>Story *</Label>
            <ReactQuill
              placeholder="Write your story......"
              modules={modules}
              theme="snow"
              value={content}
              onChange={setContent}
            />
          </FormGroup>
          <FormRow>
            <FormGroup>
              <Label>Featured Image</Label>
              <ImageUpload
                onChange={setValue}
                name="featured_image"
              ></ImageUpload>
            </FormGroup>
            <FormGroup></FormGroup>
          </FormRow>
          <FormRow>
            <FormGroup>
              <Label>Goal *</Label>
              <Input
                control={control}
                name="goal"
                placeholder="$0.00 USD"
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label>Raised amount *</Label>
              <Input
                control={control}
                name="amount"
                placeholder="$0.00 USD"
              ></Input>
            </FormGroup>
          </FormRow>
          <FormRow>
            <FormGroup>
              <Label>Amount Prefilled</Label>
              <Input
                control={control}
                name="prefilled"
                placeholder="Amount Prefilled"
              ></Input>
              <p className="text-sm text-left text-text3">
                It will help fill amount box by click, place each amount by
                comma, ex: 10,20,30,40
              </p>
            </FormGroup>
            <FormGroup>
              <Label>Video</Label>
              <Input control={control} name="video" placeholder="Video"></Input>
              <p className="text-sm text-left text-text3">
                Place Youtube or Vimeo Video URL
              </p>
            </FormGroup>
          </FormRow>
          <FormRow numberCols={3}>
            <FormGroup>
              <Label>Start Date</Label>

              <DatePicker
                onChange={setStartDate}
                value={startDate}
                format="dd-MM-yyyy"
              />
            </FormGroup>
            <FormGroup>
              <Label>Campaign End Method</Label>
              <Dropdown>
                <Dropdown.Select placeholder="Select one"></Dropdown.Select>
                <Dropdown.List>Hello</Dropdown.List>
              </Dropdown>
            </FormGroup>
            <FormGroup>
              <Label>Country</Label>
              <Dropdown>
                <Dropdown.Select
                  placeholder={getDropdownLabel("country", "Select country")}
                ></Dropdown.Select>
                <Dropdown.List>
                  <Dropdown.Search
                    placeholder="Search country..."
                    onChange={setFilterCountry}
                  ></Dropdown.Search>
                  {countries.length > 0 &&
                    countries.map((country) => (
                      <Dropdown.Option
                        key={country?.name?.common}
                        onClick={() =>
                          handleSelectDropdownOption(
                            "country",
                            country?.name?.common
                          )
                        }
                      >
                        {country?.name?.common}
                      </Dropdown.Option>
                    ))}
                </Dropdown.List>
              </Dropdown>
            </FormGroup>
          </FormRow>
          <FormRow numberCols={2}>
            <FormGroup>
              <Label>Campaign End Method</Label>
              <Dropdown>
                <Dropdown.Select placeholder="Select one"></Dropdown.Select>
                <Dropdown.List>Hello</Dropdown.List>
              </Dropdown>
            </FormGroup>
            <FormGroup>
              <Label>Country</Label>
              <Dropdown>
                <Dropdown.Select
                  placeholder={getDropdownLabel("country", "Select country")}
                ></Dropdown.Select>
                <Dropdown.List>
                  <Dropdown.Search
                    placeholder="Search country..."
                    onChange={setFilterCountry}
                  ></Dropdown.Search>
                  {countries.length > 0 &&
                    countries.map((country) => (
                      <Dropdown.Option
                        key={country?.name?.common}
                        onClick={() =>
                          handleSelectDropdownOption(
                            "country",
                            country?.name?.common
                          )
                        }
                      >
                        {country?.name?.common}
                      </Dropdown.Option>
                    ))}
                </Dropdown.List>
              </Dropdown>
            </FormGroup>
          </FormRow>
          <FormRow>
            <FormGroup>
              <Label>Start Date</Label>

              <DatePicker
                onChange={setStartDate}
                value={startDate}
                format="dd-MM-yyyy"
              />
            </FormGroup>
            <FormGroup>
              <Label>End Date</Label>
              <DatePicker
                onChange={setEndDate}
                value={endDate}
                format="dd-MM-yyyy"
              />
            </FormGroup>
          </FormRow>
          <div className="mt-10 text-center">
            <Button
              type="submit"
              className="px-10 mx-auto text-white bg-primary"
            >
              Submit new campaign{" "}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CampaignAddNew;
