
import dbIface, { tableUser } from '$lib/db';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
    login: async (event) => {

    },
    register: async ({ cookies, request }) => {
        const data = await request.formData();
        const username = data.get("username");
        const password = data.get('password');
        const confirmPassword = data.get("confirmpassword");

        if (password !== confirmPassword) {
            return {
                code: 400,
                message: "passwords don't match",
            };
        }

        const query = `INSERT INTO ${tableUser} ( user_name, avatar, created_at, is_active, password) VALUES (?, ?, ?, ?, ?)`;
        const args = [username, null, new Date().toISOString(), 1, password];
        try {
            await dbIface.insert(query, args);

            return {
                code: 201,
                message: 'user created successfully'
            };
        } catch (err: any) {
            let message = 'failed insert user';

            if (err.message.includes('UNIQUE')) {
                message = 'username already exists';
                return fail(400, { code: 400, message });
            }
            return fail(500, { message, code: 500 });
        }
    }
};
