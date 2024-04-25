import type { Todo, User } from "./interface";
import TodoDatabase, { tableTodos, tableUser } from "./interface";

const db = new TodoDatabase('./test.sqlite3');

// Dữ liệu người dùng mẫu
const sampleUser: User = {
    id: 1,
    user_name: 'john_doe',
    avatar: 'path_to_avatar',
    created_at: new Date().toISOString(),
    is_active: 1,
    password: 'hashed_password'
};

// Thêm người dùng vào bảng users
db.update(`INSERT INTO ${tableUser} (id, user_name, avatar, created_at, is_active, password) VALUES (?, ?, ?, ?, ?, ?)`, [sampleUser.id, sampleUser.user_name, sampleUser.avatar, sampleUser.created_at, sampleUser.is_active, sampleUser.password])
    .then((result) => {
        if (result) {
            console.log('User added successfully');
        } else {
            console.error('Failed to add user');
        }
    })
    .catch((error) => {
        console.error('Error adding user:', error);
    });

// Dữ liệu công việc mẫu
const sampleTodo: Todo = {
    id: 1,
    title: 'Sample Todo',
    content: 'This is a sample todo',
    created_at: new Date().toISOString(),
    user_id: 1 // ID của người dùng liên quan
};

// Thêm công việc vào bảng todos
db.update(`INSERT INTO ${tableTodos} (id, title, content, created_at, user_id) VALUES (?, ?, ?, ?, ?)`, [sampleTodo.id, sampleTodo.title, sampleTodo.content, sampleTodo.created_at, sampleTodo.user_id])
    .then((result) => {
        if (result) {
            console.log('Todo added successfully');
        } else {
            console.error('Failed to add todo');
        }
    })
    .catch((error) => {
        console.error('Error adding todo:', error);
    });

// Đóng kết nối cơ sở dữ liệu sau khi thêm dữ liệu
db.close();
