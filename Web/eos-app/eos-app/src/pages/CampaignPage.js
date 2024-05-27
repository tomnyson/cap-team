import Gap from "components/common/Gap";
import Heading from "components/common/Heading";
import { Dropdown } from "components/dropdown";
import Pagination from "components/pagination/Pagination";
import TableAutoGenerate from "components/tables/TableAutoGenerate";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import DashboardSearch from "modules/dashboard/DashboardSearch";
import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import { formatValue } from "react-currency-input-field";
import { v4 } from "uuid";

const listItemsPerPage = [5, 10, 15, 20];

const CampaignPage = () => {
  const axiosPrivate = useAxiosPrivate();
  const [month, setMonth] = useState(5);
  const [listAlertBirthday, setListAlertBirthday] = useState([]);
  const [listBenefitPlan, setListBenefitPlan] = useState([]);
  const [pagination, setPagination] = useState({
    totalPages: 0,
    currentPage: 0,
    itemsPerPage: 10,
    query: "",
  });

  const [search, setSearch] = useState({
    benefitPlan: "",
    labelBenefit: "",
  });

  const handleSelectDropdownOption = (value) => {
    setPagination((item) => {
      return { ...item, itemsPerPage: value, currentPage: 0 };
    });
  };

  const handleSelectDropdownBenefit = (value) => {
    setMonth(value);
    setPagination((item) => {
      return { ...item, currentPage: 0 };
    });
  };
  useEffect(() => {
    async function fetchBirthdays() {
      console.log(
        `/personal_integration/birthday?fullName=${pagination.query}&month=${month}&page=${pagination.currentPage}&limit=${pagination.itemsPerPage}`
      );
      try {
        const response = await axiosPrivate.get(
          `/personal_integration/birthday?fullName=${pagination.query}&month=${month}&page=${pagination.currentPage}&limit=${pagination.itemsPerPage}`
        );
        console.log("🚀 ~ fetchBirthdays ~ response:", response);

        setPagination((item) => {
          return {
            totalPages: response.data.totalPages,
            currentPage: response.data.currentPage,
            itemsPerPage: item.itemsPerPage,
            query: item.query,
          };
        });
        setListAlertBirthday(
          response.data.personals.map((item) => {
            return {
              personalId: item.personalId,
              fullName: [
                item.firstName,
                item.middleInitial,
                item.lastName,
              ].join(" "),
              countDayToBirthday: `${item.countDayToBirthday} ngày sẽ đến sinh nhật`,
              birthday: `${new Date(item.birthday).getDate()}-${
                new Date(item.birthday).getMonth() + 1
              }-${new Date(item.birthday).getFullYear()}`,
            };
          })
        );
      } catch (error) {
        console.log(error);
      }
    }
    // async function fetchPersonals() {
    //   try {
    //     const response = await axiosPrivate.get(
    //       `/personal_integration?fullName=${pagination.query}&benefitPlanId=${search.benefitPlan}&page=${pagination.currentPage}&limit=${pagination.itemsPerPage}`
    //     );
    //     setPagination((item) => {
    //       return {
    //         totalPages: response.data.totalPages,
    //         currentPage: response.data.currentPage,
    //         itemsPerPage: item.itemsPerPage,
    //         query: item.query,
    //       };
    //     });
    //     setListPersonalOverview(
    //       response.data.personals.map((item) => {
    //         return {
    //           personalId: item.personalId,
    //           fullName: [
    //             item.firstName,
    //             item.middleInitial,
    //             item.lastName,
    //           ].join(" "),
    //           gender: item.gender ? "Male" : "Female",
    //           payAmount: formatCurrency(item.payAmount),
    //           planName: item.planName,
    //         };
    //       })
    //     );
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
    async function fetchBenefitPlans() {
      try {
        const response = await axiosPrivate.get(`/benefit_plans`);
        setListBenefitPlan(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchBirthdays();
    // fetchPersonals();
    fetchBenefitPlans();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    pagination.currentPage,
    pagination.query,
    pagination.itemsPerPage,
    month,
  ]);
  return (
    <Fragment>
      <div className="flex items-center justify-between mb-2">
        <Heading number={4} className="mb-0">
          Your personals
        </Heading>
        <div className=" max-w-[458px] w-full">
          <DashboardSearch
            // displayButton={false}
            setPagination={setPagination}
          ></DashboardSearch>
        </div>
      </div>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3 ">
          <span>Show</span>
          <Dropdown>
            <Dropdown.Select
              placeholder={pagination.itemsPerPage}
              className="gap-2"
            ></Dropdown.Select>
            <Dropdown.List>
              {listItemsPerPage.map((value) => (
                <Dropdown.Option
                  key={value}
                  onClick={() => handleSelectDropdownOption(value)}
                >
                  <span>{value}</span>
                </Dropdown.Option>
              ))}
            </Dropdown.List>
          </Dropdown>
          <span>entries</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-full">Month</div>
          <Dropdown className="w-[200px]">
            <Dropdown.Select
              placeholder={`Tháng ${month}` || "Month"}
              className="gap-2 w-[200px]"
            ></Dropdown.Select>
            <Dropdown.List>
              {new Array(12).fill(0).map((value, index) => (
                <Dropdown.Option
                  key={value.benefitPlanId}
                  onClick={() => handleSelectDropdownBenefit(index + 1)}
                >
                  <span>Tháng {index + 1}</span>
                </Dropdown.Option>
              ))}
            </Dropdown.List>
          </Dropdown>
        </div>
      </div>
      {listAlertBirthday && listAlertBirthday.length > 0 ? (
        <TableAutoGenerate
          listData={listAlertBirthday}
          pagination={pagination}
          setPagination={setPagination}
        ></TableAutoGenerate>
      ) : (
        <>Not found</>
      )}
    </Fragment>
  );
};

export default CampaignPage;
