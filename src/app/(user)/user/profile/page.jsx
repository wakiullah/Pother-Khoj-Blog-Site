import {userVerify} from "@/utilitis/userVerify";
import Profile from "@/components/user/profile";


export default async function UserProfilePage() {

    const user = await userVerify();


    if (!user) return <div>Loading...</div>;

    return (
        <>
            <Profile userDetail={user}/>
        </>

    );
}