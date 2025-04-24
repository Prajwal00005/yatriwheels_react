import React, { useState, ChangeEvent, FormEvent } from 'react';

interface FormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

const Contact: React.FC = () => {
    // State hook with type FormData
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    // Handle input changes with typed events
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle form submission with typed event
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Here you would normally send the form data to the server
        console.log('Form submitted', formData);
    };

    return (
        <section id="contact" className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12 fade-in text-primary">Contact Us</h2>
                <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/3 bg-primary text-white p-6 slide-in-left">
                            <h3 className="text-xl font-semibold mb-4">Get In Touch</h3>
                            <p className="mb-6 ">Have questions or need assistance? Reach out to our friendly team.</p>
                            <div className="mb-4">
                                <h4 className="font-semibold mb-2">Address</h4>
                                <p>Itahari - 09</p>
                            </div>
                            <div className="mb-4">
                                <h4 className="font-semibold mb-2">Phone</h4>
                                <p>(123) 456-7890</p>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-2">Email</h4>
                                <p>info@YatriWheels.com</p>
                            </div>
                        </div>
                        <div className="md:w-2/3 p-6 slide-in-right">
                            <form onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <label htmlFor="name" className="block text-gray-700 mb-2">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border-b focus:outline-none  focus:border-primary"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-gray-700 mb-2">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border-b focus:outline-none  focus:border-primary"
                                        />
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="subject" className="block text-gray-700 mb-2">
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border-b focus:outline-none  focus:border-primary"
                                    />
                                </div>
                                <div className="mb-6">
                                    <label htmlFor="message" className="block text-gray-700 mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows={4}
                                        className="w-full px-4 py-2 border-b focus:outline-none  focus:border-primary"
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full px-5 py-3 bg-secondary text-white font-semibold rounded-lg hover:bg-white hover:text-secondary hover:transform hover:scale-105 hover:shadow-md transition-all duration-200 ease-out border border-secondary"
                                >
                                    Send Message
                                </button>
                              
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
