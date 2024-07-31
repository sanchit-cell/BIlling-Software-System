import { Dialog } from "primereact/dialog";
import { ErrorMessage, Field, Formik } from "formik";

import * as yup from "yup";
import { toast } from "sonner";

import { Button } from "primereact/button";
import { useCreateItemMutation } from "../../../provider/queries/Items.query";
const Model = ({ visible, setVisible }: any) => {
  const [CreateItem] = useCreateItemMutation();

  const validationSchema = yup.object({
    item_name: yup.string().required("Name is required"),
  });

  const initialValues = {
    item_name: "",
    Quantity: null,
    About: "",
    price: null,
    inStock: true,
  };

  const onSubmitHandler = async (e: any, { resetForm }: any) => {
    try {
      const { data, error }: any = await CreateItem(e);

      if (error) {
        toast.error(error.data.message);
        return;
      }

      toast.success(data.msg);
      resetForm();
      setVisible(false);
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  return (
    <>
      <Dialog
        draggable={false}
        header="Add Item"
        position="top"
        visible={visible}
        className=" w-full md:w-[70%] lg:w-1/2"
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
                    placeholder="Enter Items Name"
                    className="w-full my-2 border outline-none py-3 px-4"
                  />
                  <ErrorMessage
                    name="name"
                    className="text-red-500 capitalize"
                    component={"p"}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="About">
                    About <span className="text-red-500 text-sm">*</span>{" "}
                  </label>

                  <Field
                    as="textarea"
                    rows={3}
                    name="About"
                    id="About"
                    type="text"
                    placeholder="About Item"
                    className="w-full my-2 border outline-none py-3 px-4"
                  />
                  <ErrorMessage
                    name="About"
                    className="text-red-500 capitalize"
                    component={"p"}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="Quantity">
                    Quantity <span className="text-red-500 text-sm">*</span>{" "}
                  </label>

                  <Field
                    name="Quantity"
                    id="Quantity"
                    type="number"
                    placeholder="Enter items Quantity"
                    className="w-full my-2 border outline-none py-3 px-4"
                  />
                  <ErrorMessage
                    name="Quantity"
                    className="text-red-500 capitalize"
                    component={"p"}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="price">
                    Price <span className="text-red-500 text-sm">*</span>{" "}
                  </label>
                  <Field
                    name="price"
                    id="price"
                    type="number"
                    placeholder="Enter items price"
                    className="w-full my-2 border outline-none py-3 px-4"
                  />
                  <ErrorMessage
                    name="price"
                    className="text-red-500 capitalize"
                    component={"p"}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="instock">
                    Instock <span className="text-red-500 text-sm">*</span>{" "}
                  </label>

                  <Field
                    name="instock"
                    id="instock"
                    type="checkbox"
                    className="my-2 border h-5 py-3 px-4"
                  />
                  <ErrorMessage
                    name="instock"
                    className="text-red-500 capitalize"
                    component={"p"}
                  />
                </div>
                <div className="flex justify-end">
                  <Button className="text-white px-5 rounded-sm bg-indigo-500 py-3 text-center ">
                    Add items
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

export default Model;
