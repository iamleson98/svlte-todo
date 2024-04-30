
import { toastStore } from '$lib/components/index';
import dbIface, { tableUser } from '$lib/db';
import type { Actions } from './$types';

export const actions: Actions = {
    login: async (event) => {
        
    },
    register: async ({ cookies, request }) => {
        const data = await request.formData();
        const username = data.get("username");
        const password = data.get('password');
        const confirmpassword = data.get("confirmpassword")
        if (typeof username === 'string' && typeof password === 'string') {
            if(password === confirmpassword){
                const userData = {
                    id: 0,
                    user_name: username,
                    avatar: "",
                    created_at: new Date().toISOString(),
                    is_active: 1,
                    password: password
                };
    
                const query = `INSERT INTO ${tableUser} ( user_name, avatar, created_at, is_active, password) VALUES (?, ?, ?, ?, ?)`;
                const args = [userData.user_name, userData.avatar, userData.created_at, userData.is_active, userData.password];
                dbIface.insert(query, args);
            }else{
                toastStore.send({ message: 'password and confirmpassword is not matched', variant: 'error', timeout: 3000 })
            }
        } else {
            console.error("Username or password is not a string");
        }
    }
};

