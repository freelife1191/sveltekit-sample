import { getPost } from "$lib/server/db";

export const load = async ({ params }) => {
    const post = await getPost(params.postId);
    return { post };
};