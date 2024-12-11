import React from 'react'
import { useForm } from 'react-hook-form'
import{Button,Input,Select,RTE} from '../index'
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useCallback } from 'react';

function Postform({post}) {
    const {register,handleSubmit,watch,setValue,control,getValues}=useForm({
        defaultValues:{
            title:post?.title ||'',
            slug:post?.$id ||'',
            content:post?.content ||'',
            status:post?.status ||'active'
        }
    })
    const navigate=useNavigate()
    const userData=useSelector(state=>state.auth?.userData)
    console.log("before line 20 of post form")
    if (!userData) {
        return <div>Loading user data...</div>;
    }
    console.log("userdata at post form 20",userData.$id)
    const submit=async(data)=>{
        if(post){
            const file=data.image[0]?await appwriteService.uploadFile(data.image[0]) : null;
            console.log("iffileeeeeeeeeeeeeeeeeeeee",file)
             if(file){
                appwriteService.deleteFile(post.featuredImage)
             }
             const dbPost=await appwriteService.updatePost(post.$id,{...data,
                featuredImage:file?file.$id:undefined,
               
               }
            )
            if(dbPost){
                console.log("dbpostttttttttttttt",dbPost)
                navigate(`/post/${dbPost.$id}`)
            }

        }else{
            const file=await appwriteService.uploadFile(data.image[0]);
            console.log("elsefileeeeeeeeeeeeeeeeeeeee",file)
           console.log("userid data",userData,userData.id)
            if(file){
                console.log("1stdataaaaaaaaaaaaaaaaaaaaaaaaaaaa",data)

                const fileId=file.$id
                data.featuredImage=fileId
                console.log("ttttttttttttttttttttttttttttttt",fileId)
                console.log("dataaaaaaaaaaaaaaaaaaaaaaaaaaaa",data)
                
               const dbPost= await appwriteService.createPost({...data,
                    userId:userData.$id
                })
            
             //   console.log("dbposttttttttttttt",dbPost)
                if(dbPost){
                    navigate(`/post/${dbPost.$id}`)
                }
            }
        }
    }
    const slugTransform=useCallback((value)=>{
        if(value && typeof value ==='string' ){
            //  const slug=value.toLowerCase().replace(/ /g,'_')
//              The regular expression / /g is used to find all spaces (' ') in the string:
// g is the global flag, which means it will replace every space in the string, not just the first one.

// or

    return value.trim().toLowerCase()
      .replace(/[^\w\s-]/g, '')  // Remove invalid characters
      .replace(/\s+/g, '-')      // Replace spaces with dashes
      .replace(/-+/g, '-');      // Remove multiple dashes
  }
  return '';
// return value.trim().toLowerCase().replace(/^[a-z A-z\d\s]+/g,'-')    .replace(/\s/g, "-");
    //   return ''
    },[])

    React.useEffect(()=>{
        const subscription=watch((value,{name})=>{
            if(name==='title'){
                setValue('slug',slugTransform(value.title),{shouldValidate:true})
            }
        });
        return()=>{
            subscription.unsubscribe()
        }
    },[watch,slugTransform,setValue])
      
  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
    <div className="w-2/3 px-2">
        <Input
            label="Title :"
            placeholder="Title"
            className="mb-4"
            {...register("title", { required: true })}
        />
        <Input
            label="Slug :"
            placeholder="Slug"
            className="mb-4"
            {...register("slug", { required: true })}
            onInput={(e) => {
                setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
            }}
        />
        <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
    </div>
    <div className="w-1/3 px-2">
        <Input
            label="Featured Image :"
            type="file"
            className="mb-4"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image", { required: !post })}
        />
        {post && (
            <div className="w-full mb-4">
                <img
                    src={appwriteService.getFilePreview(post.featuredImage)}
                    alt={post.title}
                    className="rounded-lg"
                />
            </div>
        )}
        <Select
            label="Status"  
            options={["active", "inactive"]}
           
            className="mb-4"
            {...register("status", { required: true })}
        />
        <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
            {post ? "Update" : "Submit"}
        </Button>
    </div>
</form>
  )
}

export default Postform
