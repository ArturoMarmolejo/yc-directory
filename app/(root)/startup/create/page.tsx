import React from 'react'
import StartUpForm from "@/components/StartUpForm";
import {auth} from "@/auth";
import {redirect} from "next/navigation";

const Page = async () => {
    const session = await auth()
    if (!session) redirect("/")
    return (
        <>
            <section className="pink_container min-h-57.5!">
                <h1 className="heading">Submit Your Startup</h1>
            </section>
            <StartUpForm />
        </>
    )
}
export default Page
