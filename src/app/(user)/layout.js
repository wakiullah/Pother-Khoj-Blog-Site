import React from 'react';
import Header from '@/components/common/header';

const Layout = ({children}) => (
    <div>
        <Header/>
        <main className="mx-auto p-4">{children}</main>
    </div>
);

export default Layout;