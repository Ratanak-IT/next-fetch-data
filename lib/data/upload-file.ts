import axios from "axios";
const baseAPI = process.env.NEXT_PUBLIC_API_URL;

// upload file to server

// export const uploadImageFile =async(images: FormData) => {
//     const response= await axios(`${baseAPI}api/v1/files/upload`,{
//         method:'POST',
//         headers:{
//             'Content-Type':'multipart/form-data',
//         },
//         data: images
//     });
//     return response
// }



export const uploadImageFile = async (images: FormData) => {
  const response = await axios(`${baseAPI}api/v1/files/upload`,
    {
      method: "POST",
       headers:{
            'Content-Type':'multipart/form-data',
        },
      data: images,
    }
  );

  return response.data;
};
