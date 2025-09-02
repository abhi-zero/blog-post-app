import React from 'react'
import { WritePost } from '../components'
import { useParams } from 'react-router-dom'
import { useGetPostByIdQuery } from '../api/postApi'

export default function Write() {
  const {id} = useParams()
  const {data: post, isLoading} = useGetPostByIdQuery(id, {skip: !id})
  return (
    <div className='min-h-[calc(100vh-150px)]'>
      <div>
        <h1 className='font-bold text-black dark:text-white text-3xl text-center transition-all duration-300 ease-in-out'>{id? 'Edit a ' : 'Write a New '}post</h1>
      </div>
      <div>
        {/* <WritePost /> */}
       {isLoading ? <>Loading...</> :  <WritePost post={post}/>}
      </div>
    </div>
  )
}
