import { Button } from "components/button";
import Heading from "components/common/Heading";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import { Dropdown } from "components/dropdown";
import React, { Fragment, useEffect, useState } from "react";
import DashboardSearch from "modules/dashboard/DashboardSearch";
import TableAutoGenerate from "components/tables/TableAutoGenerate";

const listItemsPerPage = [5, 10, 15, 20];

const WithdrawPage = () => {
  const axiosPrivate = useAxiosPrivate();
  const [listEmployee, setListEmployee] = useState([]);
  const [pagination, setPagination] = useState({
    totalPages: 0,
    currentPage: 0,
    itemsPerPage: 10,
    query: "",
  });

  const handleSelectDropdownOption = (value) => {
    setPagination((item) => {
      return { ...item, itemsPerPage: value, currentPage: 0 };
    });
  };
  useEffect(() => {
    async function fetchEmployees() {
      try {
        const response = await axiosPrivate.get(
          `/employees?fullName=${pagination.query}&page=${pagination.currentPage}&limit=${pagination.itemsPerPage}`
        );

        setPagination((item) => {
          return {
            totalPages: response.data.totalPages,
            currentPage: response.data.currentPage,
            itemsPerPage: item.itemsPerPage,
            query: item.query,
          };
        });
        setListEmployee(
          response.data.employees.map((item) => {
            return {
              employeeNumber: item.employeeNumber,
              fullName: [item.firstName, item.lastName].join(" "),
              paidLastYear: item.paidLastYear,
              paidToDate: item.paidToDate,
              payRate: item.payRate,
              payRateName: item.payRateName,
            };
          })
        );
      } catch (error) {
        console.log(error);
      }
    }

    fetchEmployees();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.currentPage, pagination.query, pagination.itemsPerPage]);
  return (
    <Fragment>
      <div className="flex items-center justify-between px-10 py-8 mb-10 bg-white rounded-3xl">
        <div className="flex items-start items-center  gap-x-6">
          <div className="flex items-center justify-center text-white rounded-full w-14 h-14 bg-secondary bg-opacity-60">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </div>
          <div className="flex-1">
            <h1 className="text-[22px] font-semibold mb-2">
              Create Your Employee
            </h1>
          </div>
        </div>
        <Button
          type="button"
          kind="ghost"
          className="px-8"
          href="/add-employee"
        >
          Create employee
        </Button>
      </div>
      <Fragment>
        <div className="flex items-center justify-between mb-2">
          <Heading className="mb-0">Your Employee</Heading>
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
        </div>
        {listEmployee && listEmployee.length > 0 ? (
          <TableAutoGenerate
            listData={listEmployee}
            pagination={pagination}
            setPagination={setPagination}
          ></TableAutoGenerate>
        ) : (
          <>Not found</>
        )}
      </Fragment>
    </Fragment>
  );
};

export default WithdrawPage;
