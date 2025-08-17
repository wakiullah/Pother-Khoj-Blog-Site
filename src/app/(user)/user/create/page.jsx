 import React, { useState } from 'react';

 const categories = [
   { value: '', label: 'Select category' },
   { value: 'news', label: 'News' },
   { value: 'tech', label: 'Tech' },
   { value: 'lifestyle', label: 'Lifestyle' },
 ];

 export default function CreatePostPage() {
   const [title, setTitle] = useState('');
   const [details, setDetails] = useState('');
   const [category, setCategory] = useState('');

   const handleSubmit = (e) => {
     e.preventDefault();
     alert(`Title: ${title}\nDetails: ${details}\nCategory: ${category}`);
   };

   return (
     <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
       <form
         onSubmit={handleSubmit}
         className="w-full max-w-md bg-white p-8 rounded shadow-md space-y-6"
       >
         <h2 className="text-2xl font-bold mb-4 text-center">Create Post</h2>
         <div>
           <label className="block mb-1 font-medium">Title</label>
           <input
             type="text"
             className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
             value={title}
             onChange={(e) => setTitle(e.target.value)}
             required
             placeholder="Enter post title"
           />
         </div>
         <div>
           <label className="block mb-1 font-medium">Details</label>
           <textarea
             className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
             value={details}
             onChange={(e  ) => setDetails(e.target.value)}
             required
             rows={4}
             placeholder="Enter post details"
           />
         </div>
         <div>
           <label className="block mb-1 font-medium">Category</label>
           <select
             className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
             value={category}
             onChange={(e) => setCategory(e.target.value)}
             required
           >
             {categories.map((cat) => (
               <option key={cat.value} value={cat.value} disabled={cat.value === ''}>
                 {cat.label}
               </option>
             ))}
           </select>
         </div>
         <button
           type="submit"
           className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
         >
           Create Post
         </button>
       </form>
     </div>
   );
 }