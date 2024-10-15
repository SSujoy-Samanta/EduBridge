
import { cloudinary } from "./cloudinary";

export const uploadImage = async (file: File, folder: string) => {
    const buffer = await file.arrayBuffer();
    const bytes = Buffer.from(buffer);
    console.log("uploading to Cloudinary:");
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                resource_type: "auto",
                folder: folder,
            },
            (err, result) => {
                if (err) {
                    //console.error("Error uploading to Cloudinary:", err);
                    return reject(err.message);
                }
                console.log("result uploading to Cloudinary:");
                resolve(result);
            }
        );

        uploadStream.end(bytes);
    });
};
export const deleteImage = async (public_id:string) => {

    return new Promise(async(resolve, reject) => {
        try {
            const result=await  cloudinary.uploader.destroy(public_id);
            return resolve(result);      
        } catch (e:any) {
            reject(new Error(e.message));
        }
    });
};