import axios from 'axios'


const uploadImage =async (imageFile) => {
    const formData=new FormData()

    formData.append('image',imageFile)

    try {
        const response=await axios.post("https://interview-prep-r1rf.onrender.com/api/auth/user/upload-image",formData,{
          withCredentials:true,
        })
        return response.data
    } catch (error) {
        console.error("Error uploading the image:",error)
        throw error
    }
}

export default uploadImage
