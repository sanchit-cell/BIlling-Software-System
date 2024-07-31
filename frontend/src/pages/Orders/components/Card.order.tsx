import {   ConfirmDialog } from 'primereact/confirmdialog'
import  { useState } from 'react'
import {  FaRegTrashAlt } from 'react-icons/fa' 
import { toast } from 'sonner'
import { Button } from 'primereact/button'
import { BsPrinter } from 'react-icons/bs'
import { useDeleteOrderMutation } from '../../../provider/queries/Orders.query'
import ShowAndPrintModel from './ShowAndPrint.model'


const TableCard = ({ data, id }: any) => {
    console.log(data)



    const [DeleteConsumer, DeleteConsumerResponse] = useDeleteOrderMutation()
    

    const [visible, setVisible] = useState(false);


    const deleteHandler =async (_id: string) => {


        try {
            // console.log(e)
            const { data, error }: any = await DeleteConsumer(_id)

            if (error) {
                toast.error(error.data.message);
                return

            }
            toast.success(data.msg)
        } catch (e: any) {
            toast.error(e.message)
        }

        
    };
    return (
        <>
            <tr className="bg-white border-b  ">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                    {id} 
                </th>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                    {data?.consumer?.name}
                </th>
                <td className="px-6 py-4">
                    {data.paymentStatus }    
                </td>

                <td className="px-6 py-4">
                    {data?.consumer?.email}    
                </td>
                <td className="px-6 py-4">
                    <ul>
                            {
                                data.Items.length>0 && data.Items.map((cur:any,i:number)=>{
                                    return <li key={i}>{cur?.item_name} - &#8377;{cur?.price}/-</li>
                                })
                            }
                    </ul>
                    {/* {data.mobile} */}
                </td>
                <td className="px-6 py-4">
                    <button onClick={() => setVisible(!visible)} title="View " className="p-4 bg-teal-500 text-white rounded-sm mx-2">{data.paymentStatus!=="Completed"?"Proceed to Checkout ":<BsPrinter className="text-xl"/>}  </button>
                    
                    <Button 
                    loading={DeleteConsumerResponse.isLoading}
                     onClick={() => deleteHandler(data._id)} title="delete " className="p-4 bg-red-500 text-white rounded-sm mx-2"><FaRegTrashAlt className="text-xl" /> </Button>
                </td>
            </tr>
            {/* <UpdateModel visible={visible} setVisible={setVisible} _id={data._id} /> */}
            <ShowAndPrintModel id={data._id} visible={visible} setVisible={setVisible} paymentStatus={data.paymentStatus} items={data.Items}  />
            <ConfirmDialog id='order.queruies' acceptClassName='' className=' ' contentClassName='py-2 ' closable />

        </>
    )
}

export default TableCard