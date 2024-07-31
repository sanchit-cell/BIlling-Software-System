import BasicChart from "./components/Basic"
import PieChartDemo from "./components/Pie"
import BasicChart2 from "./components/Basic2"

const HomePage = ()=>{

    return <div className="w-full flex flex-wrap ">
        <BasicChart/>
        <BasicChart2/>
<div className="flex items-center justify-center w-full h-full">
<PieChartDemo/>
</div>
        

    </div>

}

export default HomePage