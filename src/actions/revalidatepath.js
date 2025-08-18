'use server';
import {revalidatePath} from 'next/cache';

export async function revalidMyPath(path) {
    revalidatePath(path);
}