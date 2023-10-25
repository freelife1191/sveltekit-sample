# 스벨트킷 핵심기능만 속성 스터디

https://youtu.be/uQdkYDW5yJo?si=rKTJ285WisiN5wpi

## Creating a project
```bash
$ npm create svelte@latest my-app
$ cd my-app
$ npm install
$ npm run dev
```

상호작용
- `Ok to proceed? (y)`: y
- `Where should we create your project?`: Enter
- `Which Svelte app template?`: Skeleton project
- `Add type checking with TypeScript?`: No
- `Select additional options (use arrow keys/space bar)`
	- `Add ESLint for code linting`
	- `Add Prettier for code formatting`


picocss 프레임워크 활용
https://picocss.com/docs/

### Install from CDN
`src > app.html` 에 붙여 넣기

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@1/css/pico.min.css">
```

## 🚦 +page.svelte
`src > routes > +page.svelte` 는 **SvelteKit** 프레임워크에서 정한 메인페이지

**File-based Routing**

| PATH           | Svelte                          | HTML         |
| -------------- | ------------------------------- | ------------ |
| `도메인/`      | `src/routes/+page.svelte`       | `index.html` |
| `도메인/login` | `src/routes/login/+page.svelte` | `login.html` |
| `도메인/about` | `src/routes/about/+page.svelte` | `about.html` | 

## 🚦 +page.js
- 하는 일: Load data -> page에 data 전달
- 특징
	- 서버와 브라우저에서 모두 작동
	- **SSR** & **CSR** 모두 지원 (data를 어디에서 꽂아 넣냐의 개념)
		- **SSR (Server Side Rendering)**
		- **CSR (Client Side Rendering)**

`+page.js`
```js
export const load = async ({ params }) {
  // fetch post from api
  return { post }
}
```

`+page.svelte`
```html
<script>
  export let data
</script>

<h1>{data.post.title}</h1>
<p>{data.post.body}</p>
```

`src/routes/+page.js` 구현
```js
export const load = async () => {
    const posts = await fetch('https://jsonplaceholder.typicode.com/posts');
    return { posts: await posts.json() };
}
```


## 🚦 +page.server.js
- 하는일 (1): Load data -> page에 data 전달
- 서버에서만 작동
- DB에서 데이터 가져올 때 주로 사용
- only SSR (data를 서버에서 꽂아 넣는다)

`+page.server.js`
```js
export const load = async ({params}) {
  // fetch post form database
  return { post }
}
```

`+page.svelte`
```html
<script>
  export let data;
</script>

<h1>{data.post.title}</h1>
<p>{data.post.body}</p>
```

- 하는일 (2): Form 태그 처리 (사용자 입력 처리) -> action 함수가 담당

`+page.svelte`
```html
<form action="?/createPost" method="POST">
  <input name="title" />
  <textarea name="body" />
  <button type="submit">Create Post</button>
</form>
```

`+page.server.js`
```js
export const actions = {
  createPost: async ({ request }) => {
    const body = await request.formData()
    const title = body.get("title")
    const content = body.get("body")
    // handle post creation
  }
  // updatePost, deletePost, etc
}
```


## 🚦 +server.js
- 하는일: 특정 rotue에 대한 API endpoint(API 서버)
- HTTP method(GET, POST, PATCH, PUT, DELETE) 처리

`/logout/+server.js`
```js
export const POST = ({ request }) => {
  // Logout logic
}
```


## 🚦 +layout.svelte
- 하는 일: page wrapper (page 템플릿)
- 화면에 공통으로 적용되는 UI를 이곳에 두면 됨!
- 특징: Inherit (화면이 상속됨)

`/+logout.svelte`
```html
<nav>
  <a href="/">홈</a>
  <a href="/about">어바웃</a>
  <a href="/profile">프로필</a>
</nav>

<slot />

<footer>
  <p>Contact info</p>
</footer>
```

### +layout.svelte
`/+page.svelte`
```html
<h1>코딩셀러 홈페이지입니다</h1>
```

`/about/+page.svelte`
```html
<h1>알아서 뭐하게?</h1>
```

`/profile/+page.svelte`
```html
<h1>등산과 독서를 좋아함</h1>
```


## 🚦 +layout.js & +layout.server.js
- 하는일: Load data -> layout에 data 전달
- +page.js & +page.server.js와 비슷함
- 특징: Inherit (데이터가 상속됨)

`+layout.server.js`
```js
export const load = () => {
  // Get current user
  return { user }
}
```

`+layout.svelte`
```html
<script>
  export let data;
</script>

<nav>Logged-in as {data.user.email}</nav>
```

`+page.svelte`
```html
<script>
  export let data;
</script>

<nav>Welcome {data.user.name}</nav>
```


## 🚦 lib 폴더
- 하는 일: 컴포넌트, 유틸리티 함수, DB 관련 정보를 이곳에 정리
- 사용법: `$lib` 으로 쉽게 `import` 할 수 있음(`../../../` <- 상대경로 지옥에서 탈피)

### 예시 1) 컴포넌트 가져다 쓸때

버튼 컴포넌트
경로: lib/components/Button.svelte
```html
<button>
  <slot />
</button>
```

프로젝트 폴더 내의 특정 페이지 파일 (`../../../+page.svelte`)
```html
<script>
  import Button from "$lib/components/Button.svelte"
</script>

<Button>커스터마이즈 Button</Button>
```

### 예시 2) 서버정보 가져다 쓸 때, 안정장치기능

경로: lib/server/db.js
```js
// db 클라이언트 인스턴스 생성
export default db
```

`/posts/+page.server.js`
```js
import db from "$lib/server/db"

export const load = () => {
  return { posts: db.posts.findMany() }
}
```