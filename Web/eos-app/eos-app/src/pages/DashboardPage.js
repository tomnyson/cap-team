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

const formatCurrency = (money) => {
  return formatValue({
    value: "" + money,
    groupSeparator: ",",
    decimalSeparator: ".",
    suffix: "₫",
  });
};

const DashboardPage = () => {
  const axiosPrivate = useAxiosPrivate();
  const [listPersonalOverview, setListPersonalOverview] = useState([]);
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
    if (!value) {
      setSearch((item) => {
        return {
          ...item,
          benefitPlan: "",
        };
      });
    } else {
      setSearch((item) => {
        return {
          ...item,
          labelBenefit: value.planName,
          benefitPlan: value.benefitPlanId,
        };
      });
    }
    setPagination((item) => {
      return { ...item, currentPage: 0 };
    });
  };
  useEffect(() => {
    async function fetchPersonals() {
      try {
        const response = await axiosPrivate.get(
          `/personal_integration?fullName=${pagination.query}&benefitPlanId=${search.benefitPlan}&page=${pagination.currentPage}&limit=${pagination.itemsPerPage}`
        );
        setPagination((item) => {
          return {
            totalPages: response.data.totalPages,
            currentPage: response.data.currentPage,
            itemsPerPage: item.itemsPerPage,
            query: item.query,
          };
        });
        setListPersonalOverview(
          response.data.personals.map((item) => {
            return {
              personalId: item.personalId,
              fullName: [
                item.firstName,
                item.middleInitial,
                item.lastName,
              ].join(" "),
              gender: item.gender ? "Male" : "Female",
              payAmount: formatCurrency(item.payAmount),
              planName: item.planName,
              payRateName: item.payRateName,
            };
          })
        );
      } catch (error) {
        console.log(error);
      }
    }
    async function fetchBenefitPlans() {
      try {
        const response = await axiosPrivate.get(`/benefit_plans`);
        setListBenefitPlan(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchPersonals();
    fetchBenefitPlans();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    pagination.currentPage,
    pagination.query,
    pagination.itemsPerPage,
    search.benefitPlan,
  ]);
  return (
    <Fragment>
      <div className="flex items-center justify-between mb-2">
        <Heading className="mb-0">Your personals</Heading>
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
          <div className="w-full">Benefit plan</div>
          <Dropdown className="w-[200px]">
            <Dropdown.Select
              placeholder={search.labelBenefit || "Benefit"}
              className="gap-2 w-[200px]"
            ></Dropdown.Select>
            <Dropdown.List>
              <Dropdown.Option
                key={0}
                onClick={() => handleSelectDropdownBenefit(false)}
              >
                <span>{"Unselect"}</span>
              </Dropdown.Option>
              {listBenefitPlan &&
                listBenefitPlan.length > 0 &&
                listBenefitPlan.map((value) => (
                  <Dropdown.Option
                    key={value.benefitPlanId}
                    onClick={() => handleSelectDropdownBenefit(value)}
                  >
                    <span>{value.planName.trim()}</span>
                  </Dropdown.Option>
                ))}
            </Dropdown.List>
          </Dropdown>
        </div>
      </div>
      {listPersonalOverview && listPersonalOverview.length > 0 ? (
        <TableAutoGenerate
          listData={listPersonalOverview}
          pagination={pagination}
          setPagination={setPagination}
        ></TableAutoGenerate>
      ) : (
        <>Not found</>
      )}
    </Fragment>
  );
};

export default DashboardPage;
