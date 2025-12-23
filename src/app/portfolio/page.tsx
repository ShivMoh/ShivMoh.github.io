"use client";
import { redirect } from "next/navigation";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import PageLoader from "next/dist/client/page-loader";
import { CircularProgress } from "@mui/material";

export default function Page() {


    useEffect(() => {
        redirect('/');
    }, []);

    return <>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Link href={"/"}>Hi I've made some changes, please click here to go home</Link>
        </div>
    </>
}