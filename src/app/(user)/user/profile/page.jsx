import Profile from "@/components/user/profile";
import {userVerify} from "@/utilitis/userVerify";


export default async function UserProfilePage() {

    const user = await userVerify();


    if (!user) return <div>Loading...</div>;

    return (
        <Profile user={user}/>


    );
}