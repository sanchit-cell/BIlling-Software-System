/* eslint-disable react-hooks/rules-of-hooks */

import { FormEvent, useState } from "react";
import BredCrums from "../../components/BredCrums";
import Loader from "../../components/Loader";
import { BsArrowRightCircle, BsArrowLeftCircle } from "react-icons/bs";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetAllitemsQuery } from "../../provider/queries/Items.query";
import TableCard from "./Components/Card.inventory";
import Model from "./Components/Model.inventory";

const inventory = () => {
  const [visible, setVisible] = useState(false);

  const navigate = useNavigate();
  

  const [SearchParams] = useSearchParams();
  const [Search, setSearch] = useState(SearchParams.get("query") || "");

  const { isLoading, data, isFetching } = useGetAllitemsQuery({
    query: SearchParams.get("query") || "",
    page: SearchParams.get("page") || 1,
  });

  const OnNextPageHandler = () => {
    const page = Number(SearchParams.get("page")) || 1;
    const query = SearchParams.get("query") || "";

    let string = ``;
    if (query) {
      string = `?query=${query}&page=${page + 1}`;
    } else {
      string = `?page=${page + 1}`;
    }

    console.log(page);

    navigate(`/inventory` + string);
  };

  const onPrevPageHandler = () => {
    const page = Number(SearchParams.get("page")) || 1;
    const query = SearchParams.get("query") || "";

    let string = ``;
    if (query) {
      string = `?query=${query}&page=${page - 1}`;
    } else {
      string = `?page=${page - 1}`;
    }

    navigate(`/inventory` + string);
  };

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let string = `?query=${Search}&page=${1}`;
    navigate(`/inventory` + string);
  };

  return (
    <>
      <BredCrums PageLink="/inventory" PageName="Inventory" />

      <div className="mb-3 flex justify-end w-[90%] mx-auto">
        <button
          onClick={() => setVisible(!visible)}
          className="px-5 py-2 bg-purple-500 text-white rounded-sm"
        >
          Add Item
        </button>
      </div>
      <form
        onSubmit={onSubmitHandler}
        className="mb-3 flex justify-end w-[90%] mx-auto"
      >
        <input
          value={Search}
          onChange={(e: any) => setSearch(e.target.value)}
          className=" w-[90%] mx-auto lg:mx-0 lg:w-1/2 rounded-sm border py-3 px-5 outline-none "
          placeholder="Search User"
        />
      </form>

      <div
        className={`mb-3 flex  ${
          (Number(SearchParams.get("page")) || 1) > 1
            ? "justify-between"
            : "justify-end"
        }  w-[90%]  mx-auto`}
      >
        {(Number(SearchParams.get("page")) || 1) > 1 && (
          <button
            onClick={onPrevPageHandler}
            title="Prev Page"
            className="text-black  text-xl lg:text-3xl p-2"
          >
            <BsArrowLeftCircle />
          </button>
        )}

        {data && data.more && (
          <button
            onClick={OnNextPageHandler}
            title="Next Page"
            className="text-black  text-xl lg:text-3xl p-2"
          >
            <BsArrowRightCircle />
          </button>
        )}
      </div>

      <div className="w-full ">
        {isLoading || isFetching ? (
          <>
            <Loader />
          </>
        ) : (
          <div className="relative overflow-x-auto shadow">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    ID
                  </th>

                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    About
                  </th>
                  <th scope="col" className="px-6 py-3">
                    price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Quantity
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Instock
                  </th>

                  <th scope="col" className="px-6 py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.items &&
                  data.items.length > 0 &&
                  data.items.map((c: any, i: number) => {
                    return <TableCard key={i} id={i + 1} data={c} />;
                  })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Model visible={visible} setVisible={setVisible} />
    </>
  );
};

export default inventory;
