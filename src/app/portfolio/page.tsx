"use client";
import Link from "next/link";

export default function Page() {


    // useEffect(() => {
    //     redirect('/');
    // }, []);

    return <>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Link href={"/"}>Hi Ive made some changes, please click here to go home</Link>
        </div>
    </>
}