import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import backendUrl from "./config"
export const AuthApi = createApi({
    reducerPath: 'AuthApi',
    baseQuery: fetchBaseQuery({ baseUrl: backendUrl }),
    endpoints: (builder) => ({
        registerUser: builder.mutation<any,any>({
            query: (obj) => ({
                url:'/auth/register',
                method:'POST',
                body: obj
            })
        }),
        loginUser: builder.mutation<any, any>({
            query: (obj) => ({
                url: '/auth/login',
                method: 'POST',
                body: obj
            })
        }),
    }),
})


export const { useRegisterUserMutation,useLoginUserMutation } = AuthApi