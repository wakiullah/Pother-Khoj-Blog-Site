'use client'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '../ui/dialog'
import {Button} from '../ui/button'
import {Label} from '../ui/label'
import {Input} from '../ui/input'
import {toast} from "react-toastify";
import {useState} from "react";

function EditProfileModal({name, email, id}) {
    const sucessToast = () => toast.success("Profile updated!");
    const errorToast = () => toast.error("Something went wrong!");
    const [isOpen, setIsOpen] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            id
        };
        const response = await fetch('/api/users', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            const result = await response.json();
            sucessToast();
            setIsOpen(false); // Close the dialog after successful update
        } else {
            errorToast();
            const error = await response.json();
        }

    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button onClick={() => setIsOpen(true)} variant={"outline"} className="">Edit Profile</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you&apos;re
                        done.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="name-1">Name</Label>
                            <Input id="name-1" name="name" defaultValue={name}/>
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="username-1">Email</Label>
                            <Input type="email" id="username-1" name="email" defaultValue={email}/>
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default EditProfileModal