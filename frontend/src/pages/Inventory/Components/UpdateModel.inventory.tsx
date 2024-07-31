import * as yup from "yup";
import { ErrorMessage, Field, Formik } from "formik";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";

import { toast } from "sonner";

import Loader from "../../../components/Loader";
import {
  useGetItemsQuery,
  useUpdateItemMutation,
} from "../../../provider/queries/Items.query";
const UpdateModel = ({ visible, setVisible, _id }: any) => {
  const { isLoading, data } = useGetItemsQuery(_id);

  const [updateItem, updateItemResponse] = useUpdateItemMutation();
  if (isLoading) {
    return <Loader />;
  }

  const validationSchema = yup.object({
    item_name: yup.string().required("Name is required"),

    price: yup.number().required("Mobile is required"),
  });

  const initialValues = {
    item_name: data.item.item_name,
    price: data.item.price,
  };

  const onSubmitHandler = async (e: any, { setValues }: any) => {
    try {
      console.log(e);
      const { data, error }: any = await updateItem({ data: e, _id: _id });

      if (error) {
        toast.error(error.data.message);
        return;
      }

      setValues({
        item_name: e.item_name,
        price: e.price,
      });
      toast.success(data.msg);
      
      setVisible(false);
    } catch (error: any) {
      console.log(error);

      toast.error(error.message);
    }
  };

  return (
    <>
      <Dialog
        draggable={false}
        visible={visible}
        className=" w-[90%] mx-auto lg:mx-0 lg:w-1/2"
        onHide={() => setVisible(false)}
      >
        <Formik
          onSubmit={onSubmitHandler}
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          {({ handleSubmit }) => (
            <>
              <form onSubmit={handleSubmit} className="w-full">
                <div className="mb-3">
                  <label htmlFor="item_name">
                    Name <span className="text-red-500 text-sm">*</span>{" "}
                  </label>

                  <Field
                    name="item_name"
                    id="item_name"
                    type="text"
                    placeholder="Enter Item Name"
                    className="w-full my-2 border outline-none py-3 px-4"
                  />
                  <ErrorMessage
                    name="item_name"
                    className="text-red-500 capitalize"
                    component={"p"}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email">
                    Price <span className="text-red-500 text-sm">*</span>{" "}
                  </label>

                  <Field
                    name="price"
                    id="price"
                    type="text"
                    placeholder="Enter items price"
                    className="w-full my-2 border outline-none py-3 px-4"
                  />
                  <ErrorMessage
                    name="price"
                    className="text-red-500 capitalize"
                    component={"p"}
                  />
                </div>

                <div className="flex justify-end">
                  <Button
                    loading={updateItemResponse.isLoading}
                    className="text-white px-5 rounded-sm bg-indigo-500 py-3 text-center "
                  >
                    Update Item
                  </Button>
                </div>
              </form>
            </>
          )}
        </Formik>
      </Dialog>
    </>
  );
};

export default UpdateModel;
