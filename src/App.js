import { useState } from '@wordpress/element';

export default function App() {
    const [text, setText] = useState('Hello Tailwind');

    return (
        <>        
            <div className="p-6 max-w-xl mx-auto bg-white rounded-xl shadow-md my-5">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Plugin Settings</h1>
                <input 
                    type="text" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    value={text} 
                    onChange={(e) => setText(e.target.value)} 
                />
                <p className="mt-4 text-sm text-gray-600">Status: <span className="font-semibold text-indigo-600">{text}</span></p>
            </div>
            <div className='grid grid-cols-3 gap-4'>
                <div className="p-4 bg-blue-100 rounded-lg text-center">Column 1</div>
                <div className="p-4 bg-green-100 rounded-lg text-center">Column 2</div>
                <div className="p-4 bg-yellow-100 rounded-lg text-center">Column 3</div>
                <div className="col-span-2 p-4 bg-purple-100 rounded-lg text-center">Column 4</div>
                <div className="p-4 bg-pink-100 rounded-lg text-center">Column 5</div>
                <div className="p-4 bg-gray-100 rounded-lg text-center">Column 6</div>
                <div className="col-span-2 p-4 bg-red-100 rounded-lg text-center">Column 7</div>          
            </div>
        </>
    );
}
