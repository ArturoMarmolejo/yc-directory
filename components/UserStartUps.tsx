import React from 'react'
import {STARTUPS_BY_AUTHOR_QUERY} from "@/sanity/lib/queries";
import {client} from "@/sanity/lib/client";
import {StartUpCard, StartupTypeCard} from "@/components/StartUpCard";

const UserStartUps = async ( { id }: { id: string}) => {
    const startups  = await client.fetch(STARTUPS_BY_AUTHOR_QUERY, { id })

    return (
        <>
            {startups.length > 0 ? startups.map((startup: StartupTypeCard) => (
                <StartUpCard key={startup._id} post={startup} />
            )) : (
                <p className="no-result">No Posts yet</p>
            )}
        </>
    )
}
export default UserStartUps
