
import dbIface, { tableUser } from '$lib/db';
import type { Actions } from './$types';

export const actions: Actions = {
    login: async (event) => {

    },
    register: async ({ cookies, request }) => {
        console.log("--------------------------------")
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
        const insertError = await dbIface.insert(query, args);

        if (insertError) {
            return {
                code: 500,
                message: `failed insert user: ${insertError.message}`
            };
        }

        return {
            code: 201,
            message: 'user created successfully'
        };
    }
};
