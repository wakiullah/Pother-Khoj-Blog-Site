'use client';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Button} from '@/components/ui/button';
import Link from "next/link";
import {useRouter} from 'next/navigation';
import {toast} from 'react-toastify';
import {useAuth} from "@/context/authContext";


export default function LoginPage() {
    const router = useRouter();
    const {login} = useAuth()

    const notify = (msg) => toast.error(msg);

    const formSubmitHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = {
            email: formData.get('email'),
            password: formData.get('password'),
        };

        try {
            const response = await fetch('/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            if (result.error) {
                notify(result.error);
            } else {
                router.push('/');
                login(result.user,);  // Assuming login function sets user and token in context


            }

        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
            <form onSubmit={formSubmitHandler} className="w-full max-w-sm bg-white p-8 rounded shadow">
                <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
                <div className="mb-4">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        className="mt-1"
                        required
                    />
                </div>
                <div className="mb-6">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="••••••••"
                        className="mt-1"
                        required
                    />
                </div>
                <Button type="submit" className="w-full">Login</Button>
                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">
                        Don't have an account? <Link href="/signup" className="text-blue-500 hover:underline">Sign
                        Up</Link>
                    </p>
                </div>
            </form>
        </div>
    );
}