export default function TextViewerContainer({ children }) {
  return (
    <div className='w-full h-full flex flex-row justify-center'>
      <div className="h-full text-base px-2 w-full sm:text-lg sm:w-2/3 lg:w-1/2 pb-10 px-8">
        {children}
      </div>
    </div>
  )
}
