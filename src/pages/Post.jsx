import React,{useEffect,useState} from 'react'
import{Link,useNavigate,useParams} from "react-router-dom"
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser"
import { useSelector } from 'react-redux';
function Post() {
    const [post,setPost]=useState(null);
    const {slug}=useParams()
    console.log("slug",slug)
    const navigate=useNavigate()
    const userData=useSelector((state)=>state.auth.userData)
    if (!userData) {
        return <div>Loading user data...</div>;
    }


    const isAuther=post && userData? post.userId === userData.$id : false; 
         
    useEffect(()=>{
        if(slug){
            appwriteService.getpost(slug).then((post)=>{
                console.log(post)
                if(post)setPost(post);
                else navigate("/");
            });
        }else navigate("/");
    },[slug,navigate]);

    const deletePost=()=>{
        appwriteService.deletePost(post.$id).then((status)=>{
            if(status){
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };


//     Best Practice



// Using async/await is the most readable and modern approach:

// javascript
// Copy code
// const deletePost = async () => {
//     try {
//         const status = await appwriteService.deletePost(post.$id);
//         if (status) {
//             await appwriteService.deleteFile(post.featuredImage);
//             navigate("/");
//         } else {
//             console.error("Failed to delete post");
//         }
//     } catch (error) {
//         console.error("Error occurred:", error);
//     }
// };

// It’s more intuitive and avoids deeply nested code.
  return post? (
    <div className='py-8'>
        <Container>
            <div className='w-full flex justify-center mb-4 reletive border rounded-xl p-2'>
                <img src={appwriteService.getFilePreview(post.featuredImage)}
                 alt={post.title}
                 className='rounded-xl'
                  />

                  {isAuther && (
                    <div className='absolute right-6 top-6'>
                        <Link to={`/edit-post/${post.$id}`}>
                        <Button className='mr-3 bg-green-500'>
                               Edit
                        </Button>
                        </Link>
                        <Button className='bg-red-500' onClick={deletePost}>
                            Delete
                        </Button>
                    </div>
                  )}
            </div>
            <div className='w-full mb-6'>
                <h1 className='text-2xl font-bold'>{post.title}</h1>
            </div>
            <div className='browser-css'>
                {parse(post.content)}
            </div>
        </Container>
      
    </div>
  ):null
}

export default Post
