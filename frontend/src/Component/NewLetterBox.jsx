import React from 'react'

const NewLetterBox = () => {

    const onSubmitHandler = (event) => {
        event.preventDefault(); 
    }

  return (
    // Theme: Black base with Gold Accents
    <div className='text-center py-24 bg-[#050505] text-white border-t border-[#111]'>
        
        <p className='text-xs font-bold text-[#d4af37] uppercase tracking-[0.3em] mb-4'>
            The Insider Club
        </p>
        
        <p className='text-3xl sm:text-5xl font-serif font-medium tracking-wide text-white'>
            Unlock the <span className='italic text-gray-500'>Exceptional</span>
        </p>
        
        <p className='text-gray-400 mt-6 max-w-lg mx-auto text-sm font-light tracking-wide leading-relaxed'>
            Join our elite list to receive private invitations, early access to new drops, and complimentary styling advice.
        </p>
        
        <form onSubmit={onSubmitHandler} className='w-full sm:w-[400px] flex items-end gap-0 mx-auto mt-12 border-b border-gray-800 focus-within:border-[#d4af37] transition-colors duration-500 pb-2'>
            <input 
                className='w-full outline-none bg-transparent text-white px-2 py-2 placeholder:text-gray-600 font-serif text-lg tracking-wide' 
                type="email" 
                placeholder='Enter your email address' 
                required
            />
            <button 
                type='submit' 
                className='text-[#d4af37] text-xs font-bold px-6 py-2 hover:text-white transition-all duration-300 uppercase tracking-[0.2em] mb-1'
            >
                Join
            </button>
        </form>
        
        <p className='text-gray-600 text-[10px] mt-6 uppercase tracking-widest'>
            No spam. Only Luxury.
        </p>
    </div>
  )
}

export default NewLetterBox