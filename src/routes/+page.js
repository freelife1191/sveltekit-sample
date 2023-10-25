export const load = async () => {
    const posts = await fetch('https://jsonplaceholder.typicode.com/posts');
    return { posts: await posts.json() };
}