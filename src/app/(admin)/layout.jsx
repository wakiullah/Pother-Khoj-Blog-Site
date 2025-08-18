import AdminHeader from "@/components/common/AdminHeader";

export default function layout(
    {children}
) {
    return (
        <div>
            <AdminHeader/>
            <div className="container max-w-4xl mx-auto p-4">

                {children}
            </div>
        </div>
    );
}