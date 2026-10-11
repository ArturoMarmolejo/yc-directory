import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import {client} from "@/sanity/lib/client";
import {writeClient} from "@/sanity/lib/write-client";
import {AUTHOR_BY_GITHUB_ID_QUERY} from "@/sanity/lib/queries";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [GitHub],
    callbacks: {
        // On login: create the author in Sanity if they don't exist yet
        async signIn({ user: { name, email, image }, profile }) {
            if(!profile?.id) return false

            const githubId = Number(profile.id)
            const existingUser = client.withConfig({useCdn: false})

            if(!existingUser) {
                await writeClient.create({
                    _type: "author",
                    id: githubId,
                    name,
                    email,
                    image,
                    bio: (profile.bio as string) || "",
                })
            }
            return true
        },

        // On login: store the author's Sanity _id in the JWT
        async jwt ({ token, account, profile}) {
            if (account && profile?.id) {
                const user = await client.withConfig({ useCdn: false }).fetch(
                    AUTHOR_BY_GITHUB_ID_QUERY, { id: Number(profile.id) }
                )
                token.id = user?._id
            }
            return token
        },

        //On every auth(): copy it from the JWT into the session
        async session({ session, token }) {
            Object.assign(session, { id: token.id })
            return session
        }
    }
})