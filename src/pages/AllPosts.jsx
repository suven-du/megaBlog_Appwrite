import React, {useState, useEffect} from 'react'
import {Container,PostCard} from '../components'
import appwriteService from '../appwrite/config'

function AllPosts() {
    const [posts,setPosts]=useState([])
    useEffect(()=>{
        // appwriteService.getPosts([]).then((posts)=>{
        //     if(posts){
        //         setPosts(posts.documents)
        //     }
        // })
        const fetchPosts = async () => {
            try {
                const response = await appwriteService.getPosts([]);
                if (response) {
                    setPosts(response.documents);
                }
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        }
        fetchPosts()
    },[])
    
    
   
  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {posts.map((post)=>(
                    
                    <div key={post.$id} className='p-2 w-1/4'>
                        <PostCard 
                        {...post}
                        // $id={post.$id} 
                        // titel={post.titel} 
                        // featuredImage={post.featuredImage} 
                        />
                        
                    </div>
                ))}
            </div>
        </Container>
      
    </div> 
  )
}

export default AllPosts
