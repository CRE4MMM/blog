import { apiCall } from '@/utils/apiHelpers'
import Image from 'next/image'

interface IBlog {
  thumbnail: string
  title: string
  blog: string
  objectId: string
  created: string
  accountData: {
    firstname: string
    lastname: string
    email: string
  }
}

const getBlogDetail = async (slug: string) => {
  try {
    const query = encodeURIComponent(`objectId='${slug}'`)
    const response = await apiCall.get(
      `/post?where=${query}&loadRelations=accountData`
    )
    return response.data[0]
  } catch (error) {
    console.log(error);
  }
}

const BlogDetail = async ({
  params,
}: {
  params: Promise<{ slug: string}>
}) => {
  const slug = (await params).slug
  const blog: IBlog = await getBlogDetail(slug)
  return (
    <div className='max-w-2xl mx-auto p-6 mt-15'>
      <h1 className='text-2xl font-bold mb-4'>
        {blog.title}
      </h1>
      <Image
        src={blog.thumbnail}
        alt={blog.title}
        width={300}
        height={200}
        className='w-full h-64 object-cover mb-4'
      />
      <p className='text-black'>
        {blog.blog}
      </p>
    </div>
  )
}


export default BlogDetail