import Pagination from "components/pagination/Pagination";
import React from "react";
import { formatValue } from "react-currency-input-field";

const formatCurrency = (money) => {
  return formatValue({
    value: "" + money,
    groupSeparator: ",",
    decimalSeparator: ".",
    suffix: "₫",
  });
};

const TableAutoGenerate = ({ listData, pagination, setPagination }) => {
  return (
    <>
      <table className=" w-full table-auto border-separate border-spacing-y-5 rounded-tl-xl rounded-tr-xl">
        <thead className=" w-full bg-[#ECEFF1]">
          <tr>
            {listData &&
              listData.length > 0 &&
              Object.keys(listData[0]).map((label, index) => {
                if (index === 0)
                  return (
                    <th
                      key={index}
                      className="rounded-l-xl py-3 px-2 text-left text-base font-medium text-[#1B2432]"
                    >
                      STT
                    </th>
                  );
                if (index === Object.keys(listData[0]).length - 1)
                  return (
                    <th className="rounded-r-xl text-left text-base font-medium text-[#1B2432]">
                      {label
                        .split(/(?=[A-Z])/)
                        .map(
                          (word) => word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(" ")}
                    </th>
                  );
                return (
                  <th
                    key={index}
                    className=" py-3 px-2 text-left text-base font-medium text-[#1B2432]"
                  >
                    {label
                      .split(/(?=[A-Z])/)
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ")}
                  </th>
                );
              })}
          </tr>
        </thead>
        <tbody className="w-full">
          {listData.map((user, index) => {
            const values = Object.values(user);

            return (
              <tr key={index} className=" bg-[#FFF]">
                {values.map((value, indexSub) => {
                  if (indexSub === 0)
                    return (
                      <td className="py-3 pl-3 rounded-l-xl">
                        <span>
                          {pagination.currentPage * pagination.itemsPerPage +
                            index +
                            1}
                        </span>
                      </td>
                    );
                  if (indexSub === values.length - 1) {
                    return (
                      <td className="py-3 pl-3 ml-auto rounded-r-xl">
                        {value}
                      </td>
                    );
                  }
                  return (
                    <td className="py-3 pl-3 rounded-l-xl">
                      <span>{value}</span>
                    </td>
                  );
                })}

                {/* {1} */}
              </tr>
            );
          })}
        </tbody>
      </table>
      {pagination ? (
        <Pagination
          itemsPerPage={pagination.itemPerPage}
          setCurrentPage={setPagination}
          totalPages={pagination.totalPages}
          currentPage={pagination.currentPage}
        ></Pagination>
      ) : (
        <></>
      )}
    </>
  );
};

export default TableAutoGenerate;

{
  /* <td className="py-3 pl-3 rounded-l-xl">
                  <span>{pagination.currentPage * 10 + index + 1}</span>
                </td>
                <td className="py-3 pl-3 rounded-l-xl">
                  <span>{user.fullName}</span>
                </td>

                <td className="py-3 pl-3 rounded-l-xl">
                  <span>{user.gender ? "Male" : "Female"}</span>
                </td>
                <td className="py-3 pl-3 rounded-l-xl">
                  <span>{formatCurrency(user.payAmount)}</span>
                </td>

                <td className="py-3 pl-3 rounded-l-xl">
                  <span>{user.planName}</span> 
                </td>*/
}
{
  /* <td className="py-3 pl-3 rounded-l-xl">
          <span>{user.name}</span>
        </td>
        <td className="py-3 pl-3">
          <span>{user.id}</span>
        </td>
        <td className="py-3 pl-3">
          <span> {user.email}</span>
        </td>
        <td className="py-3 pl-3">
          <span>{user.phone}</span>
        </td>
        <td className="py-3 pl-3">
          <span>{user.address}</span>
        </td>
        <td className="py-3 pl-3">
          <span>{user.roles[0].roleValue}</span>
        </td>
        <td className="py-3 pl-3 ml-auto rounded-r-xl">
          <div className="flex gap-2">
            <button
              onClick={() => {
                // setUser(() => user);
                // handleEdit();
              }}
              className="rounded-xl bg-[#23A9F9] px-3 py-2 text-white font-semibold"
            >
              Sửa
            </button>
            <button
              onClick={() => {
                // setUser(() => user);
                // setModalRemove(true);
              }}
              className="rounded-xl bg-[#FFA900] px-3 py-2 text-white font-semibold"
            >
              Xóa
            </button>
          </div>
        </td> */
}
