// DB helper function이라고 가정
export const createPost = async ({ title, body, userId }) => {
    // 원래 이 부분이 DB에 저장하는 로직
    const resp = await fetch(`https://jsonplaceholder.typicode.com/posts`, {
        method: 'POST',
        body: JSON.stringify({
            title,
            body,
            userId
        }),
        headers: {
            'Content-type': 'application/json'
        }
    });
    return await resp.json();
}

// db example
export const getPost = async (id) => {
    const post = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    return await post.json();
};