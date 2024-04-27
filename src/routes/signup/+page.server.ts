


// export async function _signup(userData: User) {
//     try {
//         await dbIface.insertUser(userData);
//         console.log("User registered successfully");
//         return { success: true, message: "User registered successfully" };
//     } catch (error) {
//         console.error("Error registering user:", error);
//         return { success: false, message: "Failed to register user" };
//     }
// }

import dbIface from '$lib/db';
import type { Actions } from './$types';

export const actions: Actions = {
    login: async (event) => {
        
    },
    register: async ({ cookies, request }) => {
        const data = await request.formData();
        const username = data.get("username");
        const password = data.get('password');

        if (typeof username === 'string' && typeof password === 'string') {
            const userData = {
                id: 0,
                user_name: username,
                avatar: "",
                created_at: new Date().toISOString(),
                is_active: 1,
                password: password
            };
            dbIface.insertUser(userData);
            console.log("hihihihi" + username + password);
        } else {
            console.error("Username or password is not a string");
        }
    }
};

