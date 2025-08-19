'use client';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Button} from '@/components/ui/button';
import Link from "next/link";
import {toast} from 'react-toastify';
import {useRouter} from "next/navigation";

export default function SignupPage() {
    const notify = (msg) => toast(msg);
    const notifyError = (msg) => toast.error(msg);
    const router = useRouter();

    const formSubmitHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            password: formData.get('password'),
            confarmPassword: formData.get('confirm-password'),
        };

        try {
            const response = await fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            if (result.error) {
                notifyError(result.error);
            }
            if (result.message) {
                notify(result.message);
                router.push('/login');

            }

        } catch (error) {
            console.error('Error:', error);
        }


    }


    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
            <form onSubmit={formSubmitHandler} className="w-full max-w-sm bg-white p-8 rounded shadow">
                <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>
                <div className="mb-4">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" name="name" type="text" placeholder="Your Name" className="mt-1" required/>
                </div>
                <div className="mb-4">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" placeholder="place your email" className="mt-1"
                           required/>
                </div>
                <div className="mb-4">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" name="password" type="password" placeholder="••••••••" className="mt-1"
                           required/>
                </div>
                <div className="mb-6">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input id="confirm-password" name="confirm-password" type="password" placeholder="••••••••"
                           className="mt-1" required/>
                </div>
                <Button type="submit" className="w-full">Sign Up</Button>
                <div>
                    <p className="mt-4 text-center text-sm text-gray-600">
                        Already have an account? <Link href="/login"
                                                       className="text-blue-500 hover:underline">Login</Link>
                    </p>
                </div>
            </form>
        </div>
    );
}

