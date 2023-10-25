import { redirect } from "@sveltejs/kit";

export const POST = () => {
    console.log('Logging out...');
    // logout 로직 ~~~

    throw redirect(303, '/login');
}