import React from 'react'
import Ping from "@/components/Ping";
import {client} from "@/sanity/lib/client";
import {STARTUP_VIEWS_QUERY} from "@/sanity/lib/queries";

export const View = async ({ id } : { id: string}) => {
    const { views: totalViews } = await client.withConfig( { useCdn: false } ).fetch(STARTUP_VIEWS_QUERY, { id })

    const displayViews = (views: number): string => views == 1 ? `${views} view` : `${views} views`;

    // TODO: Update the number of views

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
