export default async function getCurrentUser() {

    const response = await fetch(`/api/users/loggeduser`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        return null; // Return null if the user is not authenticated or an error occurs
    }
    const user = await response.json();
    return user; // Return the user data if the request is successful

}