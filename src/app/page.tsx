import { auth } from "@/auth";
import EditRoleMobile from "@/components/EditRoleMobile";
import UserDashboard from "@/components/userDashboard";
import connectDb from "@/lib/db";
import User from "@/models/user.model";
import { redirect } from "next/navigation";
import Image from "next/image";
import Nav from "@/components/Nav";
import { json } from "stream/consumers";
import AdminDashboard from "@/components/AdminDashboard";
import DeliveryBoy from "@/components/DeliveryBoy";

async function Home() {
  await connectDb()
  const session = await auth()
  const user = await User.findById(session?.user?.id)
  if (!user) {
    redirect("/login")
  }

  const inComplete = !user.mobile || !user.role || (!user.mobile && user.role == "user")
  if (inComplete) {
    return <EditRoleMobile />
  }
  const plainUser=JSON.parse(JSON.stringify(user))
  return (
    <>
      <Nav user={plainUser}/>
      {user.role=="user"?(<UserDashboard/>):user.role=="admin"?(<AdminDashboard/>):<DeliveryBoy/>}
    </>
  );
}

export default Home