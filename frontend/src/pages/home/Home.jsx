import Topbar from "../../components/topbar/Topbar" ;
import SideBar from "../../components/sideBar/SideBar";
import Feed from "../../components/Feed/Feed";
import RightBar from "../../components/rightBar/RightBar";


export default function Home(){
    return(
        <div>
            <Topbar/>
            <div className="homeContainer d-flex justify-content-between">
               <SideBar/>
               <Feed />
               <RightBar/>
            </div>
        </div>
    )
}