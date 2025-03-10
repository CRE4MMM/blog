import React from 'react'
import Image from 'next/image'

const About = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
            {/* Navbar */}
            <div className="fixed top-0 left-0 w-full bg-purple-600 text-white p-4 flex justify-between shadow-md z-10">
            <div className="text-xl font-bold">Home</div>
            <div className="space-x-2">
                <button className="bg-white text-purple-600 px-4 py-1 rounded-full font-medium">
                Sign in
                </button>
                <button className="bg-blue-600 text-white px-4 py-1 rounded-full font-medium">
                Sign Up
                </button>
            </div>
            </div>

            {/* Main Content */}
            <div className="max-w-4xl bg-white shadow-lg rounded-2xl overflow-hidden mt-16">
            {/* Header Section */}
            <div className="p-10 text-center border-b border-gray-200">
                <h1 className="text-5xl font-extrabold text-gray-800 mb-2">
                About Us
                </h1>
                <div className="w-20 h-1 bg-purple-500 mx-auto mb-6"></div>
                <p className="text-gray-600 text-lg italic">
                Exploring the digital frontier, one byte at a time
                </p>
            </div>

            {/* Main Content */}
            <div className="p-10">
                {/* Introduction */}
                <div className="mb-10">
                <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                    Welcome to our tech blog! We are dedicated to providing insights
                    into the latest technology trends, expert analyses, and
                    innovative ideas that shape the future of the digital world.
                </p>
                <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                    Our mission is to empower developers, enthusiasts, and
                    businesses with valuable information about programming, web
                    development, artificial intelligence, cybersecurity, and more.
                </p>
                </div>

                {/* Vision Card */}
                <div className="bg-gray-50 rounded-xl p-8 mb-10 shadow-md">
                <h2 className="text-3xl font-semibold text-gray-800 mb-4 flex items-center">
                    <span className="w-2 h-8 bg-blue-500 mr-3 rounded"></span>
                    Vision
                </h2>
                <p className="text-gray-700 text-lg leading-relaxed">
                    To be a leading platform that fosters innovation and
                    technological advancement by sharing knowledge and insights that
                    drive progress.
                </p>
                </div>

                {/* Mission Card */}
                <div className="bg-gray-50 rounded-xl p-8 mb-10 shadow-md">
                <h2 className="text-3xl font-semibold text-gray-800 mb-4 flex items-center">
                    <span className="w-2 h-8 bg-green-500 mr-3 rounded"></span>
                    Mission
                </h2>
                <ul className="space-y-2 text-gray-700 text-lg leading-relaxed">
                    <li className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center mr-2 mt-1">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    </div>
                    <span>Provide high-quality and up-to-date tech content.</span>
                    </li>
                    <li className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center mr-2 mt-1">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    </div>
                    <span>
                        Foster a community of developers and tech enthusiasts.
                    </span>
                    </li>
                    <li className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center mr-2 mt-1">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    </div>
                    <span>
                        Encourage learning and growth in technology fields.
                    </span>
                    </li>
                </ul>
                </div>

                {/* Contact Card */}
                <div className="bg-purple-600 text-white rounded-xl p-8 shadow-lg max-w-lg mx-auto">
                <h2 className="text-3xl font-semibold mb-6 text-center">
                    Contact Us
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Gmail */}
                    <div className="flex flex-col items-center">
                    <div className="w-14 h-14 rounded-full bg-white bg-opacity-20 flex items-center justify-center mb-3">
                        <Image
                        src="/Gmail.png"
                        width={28}
                        height={28}
                        alt="Gmail logo"
                        />
                    </div>
                    <p className="text-lg">techblog@gmail.com</p>
                    </div>

                    {/* WhatsApp */}
                    <div className="flex flex-col items-center">
                    <div className="w-14 h-14 rounded-full bg-white bg-opacity-20 flex items-center justify-center mb-3">
                        <Image
                        src="/whatsapp.png"
                        width={28}
                        height={28}
                        alt="WhatsApp logo"
                        />
                    </div>
                    <p className="text-lg">+62 875 9856 1224</p>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
    )
}

export default About
