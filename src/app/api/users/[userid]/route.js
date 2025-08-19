export function GET(req) {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userid');
    console.log("Fetching user with ID:", userId);


}