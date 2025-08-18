import './globals.css'
import {ToastContainer} from 'react-toastify';

export default async function RootLayout({children}) {
    return (
        <html lang="en">
        <body className="bg-gray-50 text-gray-900 " cz-shortcut-listen="true">
        <ToastContainer position="top-right"
                        autoClose={3000}
                        hideProgressBar={false}/>
        {children}
        </body>
        </html>
    );
}