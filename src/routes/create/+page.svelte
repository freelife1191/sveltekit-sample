<script>
    export let form;
</script>

<form method="POST">
    <input type="text" placeholder="제목" name="title" />
    <textarea placeholder="내용" name="body" rows="10" />
    <button type="submit">Submit</button>
</form>

<pre>
    {JSON.stringify(form, null, 2)}
</pre>

<style>
    form {
        padding: 20px;
    }
</style>