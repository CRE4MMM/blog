import { apiCall } from '@/utils/apiHelpers'
import Image from 'next/image'

export default async function BlogDetail({
    params,
}: {
    params: { slug: string }
}) {
    try {
    console.log('Fetching post with slug:', params.slug) // Log slug yang digunakan

    const response = await apiCall.get(`/post/${params.slug}`)
    console.log('API Response:', response) // Log response dari API

    const post = response.data
    console.log('Post Data:', post) // Log data yang diterima

    return (
        <div className="max-w-2xl mx-auto p-6 mt-15">
            <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
            <Image
            src={post.thumbnail}
            alt={post.title}
            width={300}
            height={200}
            className="w-full h-64 object-cover mb-4"
            />
            <p className="text-gray-700">{post.blog}</p>
        </div>
    )
    } catch (error) {
        console.log('Error fetching post:', error) // Log error jika terjadi masalah

        return <h1 className="text-center text-red-500">Blog not found</h1>
    }
}
