<script>
    export let data;
</script>

<h1>웰컴~ (data.user.name)</h1>

<ul>
    {#each data.posts as post}
        <li>
            <a href={post.id}>{post.title}</a>
        </li>
    {/each}
</ul>