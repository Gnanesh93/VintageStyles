const NewsLetterBox = () => {
    const onSubmitHandler=(event)=>{
        event.preventDefault();
    }
  return (
    <div className="text-center">
        <p className="text-2xl font-medium text-gray-800">Subscibe Now & get 25% off</p>
        <p className="text-gray-600 mt-3">Subscribe to stay in style.Get updates on new arrivals and offers.Unsubscribe anytime — no spam, just fashion!</p>
        <form onSubmit={onSubmitHandler} className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3">
            <input type='email' placeholder='Enter your email' className='w-full sm:flex-1 outline-none' required/>
            <button type="submit"  className="bg-black text-white text-xs px-10 py-4">SUBSCIBE</button>
        </form>
    </div>
  )
}

export default NewsLetterBox;
