import { ConfirmDialog } from "primereact/confirmdialog";
import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { LuView } from "react-icons/lu";

import UpdateModel from "./UpdateModel.inventory";

const TableCard = ({ data, id }: any) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <tr className="bg-white border-b  ">
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
        >
          {id}
        </th>

        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
        >
          {data.item_name}
        </th>
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
        >
          {data.About}
        </th>
        <td className="px-6 py-4">{data.price}</td>
        <td className="px-6 py-4">{data.Quantity}</td>
        <td className="px-6 py-4">
          {data.inStock ? "in-Stock" : "out-of-Stock"}
        </td>
        <td className="px-6 py-4">
          <button
            onClick={() => setVisible(!visible)}
            title="View "
            className="p-4 bg-teal-500 text-white rounded-sm mx-2"
          >
            <LuView className="text-xl" />{" "}
          </button>
          <button
            onClick={() => setVisible(!visible)}
            title="Edit "
            className="p-4 bg-orange-400 text-white rounded-sm mx-2"
          >
            <FaRegEdit className="text-xl" />{" "}
          </button>
        </td>
      </tr>
      <UpdateModel visible={visible} setVisible={setVisible} _id={data._id} />

      <ConfirmDialog
        acceptClassName=""
        className=" "
        contentClassName="py-2 "
        closable
      />
    </>
  );
};

export default TableCard;
