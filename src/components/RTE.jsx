import react from 'react'
import {Editor} from '@tinymce/tinymce-react'
import {Controller} from 'react-hook-form'

export default function RTE({name,control,label,defaultvalue=""}){
return(
    <div className='w-full'>
    {label && <label>{label}</label>}
    <Controller
    name={name||"content"}
    control={control}
    render={({field:{onChange}})=>( <Editor
        initialValue={defaultvalue}
        apiKey='qyzbo67bzyo29ixd2f2tbj3js5wtrptayuhl914ul4kttvct'
        init={{
            initialValue: defaultvalue,
            height: 500,
            menubar: true,
            plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
            ],
            toolbar:
            "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
        }}
        onEditorChange={onChange}
        />)}
    />

    </div>
        
)
} 