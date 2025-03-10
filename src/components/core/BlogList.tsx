'use client'
import Image from 'next/image'
import Link from 'next/link'
import { apiCall } from '@/utils/apiHelpers'
import { useEffect, useState } from 'react'
import { ArrowRight, Laptop } from 'lucide-react'

interface Post {
    objectId: string
    title: string
    blog: string
    thumbnail?: string
}

export default function Home() {
    const [posts, setPosts] = useState<Post[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchPosts = async () => {
        try {
            setIsLoading(true)
            const response = await apiCall.get(
            '/post?sortBy=created%20desc&pageSize=3'
            )
            setPosts(response.data || [])
            setError(null)
        } catch (error) {
            console.error('Failed to fetch posts:', error)
            setError('Failed to load posts. Please try again later.')
        } finally {
            setIsLoading(false)
        }
        }

        fetchPosts()
    }, [])

    return (
        <div className="min-h-screen bg-slate-50">
            <header className="relative bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
                <div className="container mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                    <div className="inline-flex items-center bg-white/20 px-4 py-2 rounded-full">
                    <Laptop className="mr-2 w-5 h-5" />
                    <span className="text-sm font-medium">
                        Tech & Innovation Blog
                    </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                    Insights That <br />
                    Transform Technology
                    </h1>
                    <p className="text-lg text-white/80 max-w-xl">
                    Dive into cutting-edge discussions, expert analyses, and
                    innovative perspectives that shape the future of technology.
                    </p>
                    <div className="flex space-x-4">
                    <Link
                        href="/about"
                        className="bg-transparent border border-white/30 hover:bg-white/10 px-6 py-3 rounded-lg font-semibold"
                    >
                        About Us
                    </Link>
                    </div>
                </div>

                <div className="hidden md:block">
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 transform hover:scale-105 transition-transform">
                    <div className="aspect-video relative rounded-xl overflow-hidden shadow-2xl">
                        <Image
                        src="/bloggg.jpg"
                        alt="Blog Header Illustration"
                        fill
                        priority
                        className="object-cover"
                        />
                    </div>
                    <div className="mt-4 bg-white/10 backdrop-blur-md rounded-lg p-4">
                        <h3 className="text-lg font-semibold">Latest Trending Post</h3>
                        <p className="text-sm text-white/70">
                        {posts.length > 0 ? posts[0].title : 'No trending posts'}
                        </p>
                    </div>
                    </div>
                </div>
                </div>
            </header>

            <section className="container mx-auto px-4 py-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Posts</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {isLoading ? (
                    <p className="text-gray-500">Loading posts...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : posts.length > 0 ? (
                    posts.map((post) => (
                    <div
                        key={post.objectId}
                        className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow"
                    >
                        {post.thumbnail ? (
                        <Image
                            src={post.thumbnail}
                            alt={post.title}
                            width={300}
                            height={200}
                            className="w-full h-48 object-cover"
                        />
                        ) : (
                        <div className="w-full h-48 bg-gray-300 flex items-center justify-center">
                            <span className="text-gray-500">No Image</span>
                        </div>
                        )}

                        <div className="p-5">
                        <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                        <p className="text-gray-600 mb-4">
                            {post.blog?.length > 100
                            ? post.blog.substring(0, 100) + '...'
                            : post.blog || 'No content available'}
                        </p>
                        {post.blog && post.blog.length > 100 && (
                            <Link
                            href={`/detail/${post.objectId}`}
                            className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center"
                            >
                            Read More <ArrowRight className="ml-2 w-4 h-4" />
                            </Link>
                        )}
                        </div>
                    </div>
                    ))
                ) : (
                    <p className="text-gray-500">No recent posts available.</p>
                )}
                </div>
            </section>
        </div>
  )
}
