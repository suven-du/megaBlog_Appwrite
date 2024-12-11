import React, {useState, useEffect} from 'react'
import {Container, Postform} from '../components'
import appwriteService from "../appwrite/config";
import { useNavigate,  useParams } from 'react-router-dom';
function EditPost() {
    const [post, setPost] = useState(null)
    const {slug}=useParams()
    const navigate = useNavigate()
    useEffect(()=>{
        if(slug){
            appwriteService.getpost(slug).then((post)=>{
                if(post){
                    setPost(post)
                    console.log("post fron edit page",  post)
                }
            })
        }else{
            navigate('/')
        }
    },[slug,navigate])
  return post?(
    <div className='py-8'>
    <Container>
        <Postform post={post} />
    </Container>
</div>
  ):null
}

export default EditPost
