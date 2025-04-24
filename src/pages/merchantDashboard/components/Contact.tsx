const ContactCard: React.FC = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 ml-16 md:ml-64">
            {/* <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Send Us a Message</h2>
                <form>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Enter your name"
                            required
                            className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            required
                            className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700">Your Message</label>
                        <textarea
                            id="message"
                            name="message"
                            placeholder="How can we help you?"
                            required
                            className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-600"
                    >
                        <i className="fas fa-paper-plane"></i> Send Message
                    </button>
                </form>
            </div> */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
                <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                        <i className="fas fa-envelope text-blue-500 text-xl"></i>
                        <div>
                            <strong>Email:</strong><br />
                            <a href="mailto:YatriWheels@gmail.com" className="text-blue-500 hover:underline">YatriWheels@gmail.com</a>
                        </div>
                    </li>
                    <li className="flex items-start gap-3">
                        <i className="fas fa-phone-alt text-blue-500 text-xl"></i>
                        <div>
                            <strong>Phone:</strong><br />
                            <a href="tel:02556908" className="text-blue-500 hover:underline">0255-6908</a><br />
                            <a href="tel:9187937429" className="text-blue-500 hover:underline">9187937429</a>
                        </div>
                    </li>
                    <li className="flex items-start gap-3">
                        <i className="fas fa-map-marker-alt text-blue-500 text-xl"></i>
                        <div>
                            <strong>Address:</strong><br />
                            Itahari 06, Sunsari, Nepal
                        </div>
                    </li>
                    <li className="flex items-start gap-3">
                        <i className="fas fa-clock text-blue-500 text-xl"></i>
                        <div>
                            <strong>Working Hours:</strong><br />
                            Mon-Fri: 9AM - 6PM<br />
                            Sat: 10AM - 4PM
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default ContactCard