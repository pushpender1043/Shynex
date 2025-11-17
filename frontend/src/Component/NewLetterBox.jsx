import React from 'react'

function NewLetterBox() {
    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div className='w-full h-[40vh] bg-gradient-to-l from-[#0f1c2c] to-[#1f3a40] flex flex-col items-center justify-center gap-4 px-6 py-8'>
            
            {/* Heading */}
            <p className='md:text-[30px] text-[20px] text-[white] font-semibold text-center'>
                Subscribe now & get 20% off
            </p>

            {/* Subheading */}
            <p className='md:text-[18px] text-[14px] text-center text-white font-medium px-4'>
                Subscribe now and enjoy exclusive savings, special deals, and early access to new collections.
            </p>

            {/* Form */}
            <form 
                onSubmit={handleSubmit} 
                className='w-full flex flex-col md:flex-row items-center justify-center gap-4 mt-4'
            >
                <input 
                    type="email"
                    className='placeholder-gray-400 bg-gray-100 w-full md:w-[400px] h-[45px] px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 shadow-sm'
                    placeholder='Enter Your Email' 
                    required 
                />
                <button 
                    type='submit'
                    className='w-full md:w-auto px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg shadow-md transition-colors duration-300'
                >
                    Subscribe
                </button>
            </form>

        </div>
    )
}

export default NewLetterBox;
