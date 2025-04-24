
const Footer = () => {
  return (
    <footer id="contact" className="bg-primary text-white py-5 mt-10">
    <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
                <h3 className="text-xl font-bold mb-4">YatriWheels</h3>
                <p className="mb-4">
                    Your trusted partner for premium vehicle rentals. Experience the road with confidence and style.
                </p>
                <div className="flex space-x-4">
                    <a href="#" className="text-white hover:text-primary transition-colors">
                        <svg
                            className="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path>
                        </svg>
                    </a>
                    <a href="#" className="text-white hover:text-primary transition-colors">
                        <svg
                            className="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10zm4.957 7.571h-1.65c-.614 0-.857.42-.857.823v1.607h2.082l-.309 2.25h-1.773v5.429h-2.18v-5.429H10.02v-2.25h2.25v-1.607c0-1.856 1.143-2.857 2.714-2.857.771 0 1.429.086 1.714.129v1.905z"></path>
                        </svg>
                    </a>
                    <a href="#" className="text-white hover:text-primary transition-colors">
                        <svg
                            className="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10zm5.636 13.636c-.172.172-.454.172-.626 0L12 11.636l-5.01 5c-.172.172-.454.172-.626 0-.172-.172-.172-.454 0-.626L11.374 11 6.364 5.99c-.172-.172-.172-.454 0-.626.172-.172.454-.172.626 0L12 10.364l5.01-5c.172-.172.454-.172.626 0 .172.172.172.454 0 .626L12.626 11l5.01 5.01c.172.172.172.454 0 .626z"></path>
                        </svg>
                    </a>
                    <a href="#" className="text-white hover:text-primary transition-colors">
                        <svg
                            className="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10zm-1.25 14.375V7.625l5 4.375-5 4.375z"></path>
                        </svg>
                    </a>
                </div>
            </div>
            {/* Add more footer columns if needed */}
        </div>
    </div>
</footer>
  )
}

export default Footer
