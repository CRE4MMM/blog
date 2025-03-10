'use client'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { apiCall } from '@/utils/apiHelpers'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'

interface IBlog {
  title: string
  objectId: string
  blog: string
  thumbnail?: string
}

const DashboardUser = () => {
  const [blogs, setBlogs] = useState<IBlog[]>([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [thumbnail, setThumbnail] = useState('')
  const [editingIndex, setEditingIndex] = useState<number | null>(null)

  useEffect(() => {
    getBlog()
  }, [])

  const getBlog = () => {
    apiCall
      .get('/post')
      .then((response) => {
        setBlogs(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const onBtPost = async () => {
    try {
      if (title.trim() && content.trim()) {
        const response = await apiCall.post('/post', {
          blog: content,
          title,
          thumbnail: thumbnail || 'https://via.placeholder.com/150',
        })
        const accountId = localStorage.getItem('auth')
        const blogId = response.data.objectId

        await apiCall.put(`/accounts/${accountId}/blogList`, {
          objectIds: blogId,
        })
        await apiCall.put(`/post/${blogId}/accountData`, {
          objectIds: accountId,
        })

        setTitle('')
        setContent('')
        setThumbnail('')
        getBlog()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const onBtUpdate = async () => {
    try {
      if (editingIndex !== null && title.trim() && content.trim()) {
        const blogId = blogs[editingIndex].objectId
        await apiCall.put(`/post/${blogId}`, {
          blog: content,
          title,
          thumbnail: thumbnail || 'https://via.placeholder.com/150',
        })

        toast('Update success')
        setTitle('')
        setContent('')
        setThumbnail('')
        setEditingIndex(null)
        getBlog()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const onEdit = (index: number) => {
    setTitle(blogs[index].title || '')
    setContent(blogs[index].blog)
    setThumbnail(blogs[index].thumbnail || '')
    setEditingIndex(index)
  }

  const onDelete = async (blogId: string) => {
    try {
      await apiCall.delete(`/post/${blogId}`)
      toast('Delete success')
      getBlog()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="p-4 flex flex-col items-center mt-15">
      <h1 className="text-2xl font-bold mb-4 text-center">Dashboard User</h1>
      <div className="w-full max-w-2xl">
        {/* Inline input for title and thumbnail */}
        <div className="flex space-x-2 mb-2">
          <input
            type="text"
            className="w-2/3 p-2 border-1 border-black rounded text-left"
            placeholder="Input title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            className="w-1/3 p-2 border-1 border-black rounded text-left"
            placeholder="Thumbnail URL (optional)"
            value={thumbnail}
            onChange={(e) => setThumbnail(e.target.value)}
          />
        </div>
        <textarea
          className="w-full p-2 border-1 border-black rounded text-left"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your blog here..."
          rows={5}
        />
        <Button
          className="mt-2 w-full"
          onClick={editingIndex !== null ? onBtUpdate : onBtPost}
        >
          {editingIndex !== null ? 'Update Blog' : 'Post Blog'}
        </Button>
      </div>

      <div className="mt-6 w-full max-w-2xl">
        <h2 className="text-xl font-semibold text-center">Your Blogs</h2>
        {blogs.length > 0 ? (
          blogs.map((blog, index) => (
            <Card key={blog.objectId} className="mt-4 border-1 border-black">
              <CardContent className="flex items-center">
                {blog.thumbnail && (
                  <div className="relative w-24 h-24 mr-4 flex-shrink-0">
                    <Image
                      src={blog.thumbnail}
                      alt="Blog Thumbnail"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                )}
                <div>
                  <h3 className="font-bold text-center">{blog.title}</h3>
                  <p className="mt-2 text-left">{blog.blog}</p>
                  <div className="flex gap-2 mt-2 justify-center">
                    <Button onClick={() => onEdit(index)}>Edit</Button>
                    <Button
                      variant="destructive"
                      onClick={() => onDelete(blog.objectId)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="mt-2 text-gray-500 text-center">No blogs available.</p>
        )}
      </div>
    </div>
  )
}

export default DashboardUser
