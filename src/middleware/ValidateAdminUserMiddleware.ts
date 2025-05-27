import dotenv from "dotenv";

dotenv.config();

interface UserResponse {
    id: number;
    username: string;
    email: string;
    role: "client" | "admin";
}

interface UserServiceResponse {
    message: string;
    user: UserResponse;
}

export default async function ValidateAdminUserMiddleware(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    fetch(process.env.USER_SERVICE + '/user', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    }).then((response) => {
        if (!response.ok) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        return response.json();
    }).then((data: UserServiceResponse) => {
        console.log(data)
        if (data.user.role !== 'admin') {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        next();
    }).catch((error) => {
        console.error('Failed to validate user:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    });
}