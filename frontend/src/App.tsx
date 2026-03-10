 
import { Outlet, useNavigate } from 'react-router-dom'
import Header from './components/HeaderNew'
import MainLayout from './layout/MainLayoutNew'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setUser, UserSlicePath } from './provider/slice/user.slice'
import { Skeleton } from './components/ui'
function App() { 
  const [loading, SetLoading] = useState(false)
  const navigate= useNavigate() 
      const dispatch = useDispatch()
      const selector = useSelector(UserSlicePath)


  
  const fetchUser = async(token:string) => {
      try {
        const {data} = await axios.get(import.meta.env.VITE_BACKEND_URL+"/auth/profile",{
          headers:{
            'Authorization': 'Bearer ' + token
          }
        })

        console.log(data.user);
        dispatch(setUser(data.user));


        SetLoading(false)
        return
      } catch (error) {
        console.log(error);

        navigate("/login")
        return
      }

  }

  useEffect(() => {
        const token = localStorage.getItem("token") || ''

        if(!token){
          navigate("/login")
          return
        }else{

          if (selector?.email){

            SetLoading(false)
            return 
          }else{ 
            (async()=>{
              await fetchUser(token);
            })()
          }
        }

  }, [])


  if (loading){
      return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <Skeleton variant="circular" width={40} height={40} />
            </div>
            <Skeleton width={120} height={20} className="mx-auto" />
            <Skeleton width={200} height={14} className="mx-auto" />
          </div>
        </div>
      )
  }

  return (
    <>

        <Header />
        <MainLayout>

        <Outlet />
        </MainLayout>
     
    </>
  )
}

export default App
