import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import backendUrl from "./config"

export const ItemsApi = createApi({
    reducerPath: 'ItemsApi',
    baseQuery: fetchBaseQuery({ baseUrl: backendUrl }),
    tagTypes: ['getAllItems','getItem'],
    endpoints: (builder) => ({
        CreateItem: builder.mutation<any, any>({
            query: (obj) => ({
                url: '/items/create-item',
                method: 'POST',
                body: obj,
                 headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                }
            }),
            invalidatesTags:['getAllItems']
        }),getAllitems: builder.query<any, any>({
            query: (obj) => ({
                url: `/items/get-all?query=${obj.query}&page=${obj.page}`,
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                }
            }),
            providesTags: ['getAllItems']
        }),

        getAllItems: builder.query<any, any>({
            query: () => ({
                url: `/items/get-items`,
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                }
            }),
            providesTags: ['getAllItems']
        }),
        getItems: builder.query<any, any>({
            query: (_id) => ({
                url: '/items/get/' + _id,
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                }
            }),
            providesTags: ['getItem']
        }),
        UpdateItem: builder.mutation<any, any>({
            query: ({data,_id}) => ({
                url: '/items/update/' + _id,
                method: 'PATCH',
                body: data,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                }
            }),
            invalidatesTags: ['getAllItems','getItem']
        }),
        registerItem: builder.mutation<any,any>({
            query: (obj) => ({
                url:'/items/register',
                method:'POST',
                body: obj,
                headers:{
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                }
            }),
            invalidatesTags: ['getAllItems']
        }),

        

        
         
    }),
})


// export const { useCreateOrderMutation,useGetAllOrdersQuery , useDeleteOrderMutation ,useGetInvoiceByIdQuery} = OrdersApi
export const {useCreateItemMutation,useGetAllItemsQuery,useGetItemsQuery,useUpdateItemMutation,useGetAllitemsQuery,useRegisterItemMutation}= ItemsApi