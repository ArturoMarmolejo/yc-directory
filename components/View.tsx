import React from 'react'
import Ping from "@/components/Ping";
import {client} from "@/sanity/lib/client";
import {STARTUP_VIEWS_QUERY} from "@/sanity/lib/queries";
import {writeClient} from "@/sanity/lib/write-client";
import { after } from 'next/server'

export const View = async ({ id } : { id: string}) => {
    const data = await client.withConfig( { useCdn: false } ).fetch(STARTUP_VIEWS_QUERY, { id })
    const totalViews = data?.views ?? 0

    const displayViews = (views: number): string => views == 1 ? `${views} view` : `${views} views`;

   after(async () => await writeClient.patch(id).set({ views: totalViews + 1 }).commit())

    return (
        <div className="view-container">
            <div className="absolute -top-2 -right-2">
                <Ping />
            </div>
            <p className="view-text">
                <span className="font-black">{displayViews(totalViews)}</span>
            </p>
        </div>
    )
}
