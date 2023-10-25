<script>
    import Button from '$lib/components/Button.svelte';
    export let data;
</script>

<div class="container">
    <nav>
        <img src={data.user.avatar} width="64" height="64" />
        <ul>
            <li><a href="/">홈</a></li>
            <li><a href="/create">글쓰기</a></li>
            <li>
                <form action="/logout" method="post">
                    <Button type="submit">Logout</Button>
                </form>
            </li>
        </ul>
    </nav>

    <slot />
</div>