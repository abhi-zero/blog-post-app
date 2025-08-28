
import { useEffect, useRef } from 'react';
import { useInfinitePosts } from './hooks/useInfinitePosts'
import { useSelector } from 'react-redux';

function App() {
 const {loadMore, isLoading, isError, error, isFetching, totalPages, page} = useInfinitePosts();
 const allPosts = useSelector((state) =>  state.posts.allIds.map((id) => state.posts.byId[id]))

 if(isLoading) return <h1>Loading.....</h1>
 if(isError) return <h1>{error}</h1>

  return (
    <div
    className='flex flex-col items-center-safe'
    >
      
      <ul
      className='w-[400px] flex flex-col gap-5'
      >
        {allPosts.map((post)=> (
          <li key={post.title}>
            <h1 
            className='font-bold text-white'
            >{post.id} {post.title}</h1>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>

      <button   
      className='py-[10px] px-[20px] bg-purple-600 text-white rounded-2xl'
      onClick={loadMore} 
      disabled={!totalPages > page}
      >{totalPages > page ? (isFetching ? 'Loading..' :'Load More'): 'No more posts'}
        
        </button>
      
    </div>
  )
}

export default App
