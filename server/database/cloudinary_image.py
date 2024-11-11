"""
Use to handle all of the process that is linked to Cloudinary
"""
import cloudinary
import cloudinary.uploader
import cloudinary.api
import io
import base64

class CloudinaryManager:
    _instance = None

    def __new__(cls, *args, **kwargs):
        if not cls._instance:
            cls._instance = super(CloudinaryManager, cls).__new__(cls)
        return cls._instance

    def __init__(self, cloud_name : str, api_key : str, api_secret : str):
        cloudinary.config(
            cloud_name=cloud_name,
            api_key=api_key,
            api_secret=api_secret
        )

    def upload_image(self, image_path: str, folder: str = '', public_id: str = None):
        """Uploads a single image to a specified folder in Cloudinary and returns the response."""
        response = cloudinary.uploader.upload(image_path, folder = folder, public_id = public_id)
        return response

    def upload_image_from_base64(self, image_base64: object, folder:str = '', public_id: str = None):
        """Uploads an image from base64, convert to binary before upload to directly to Cloudinary."""

        # Remove metadata if present (e.g., data:image/jpeg;base64,)
        if ',' in image_base64:
            image_base64 = image_base64.split(',')[1]

        image_data = base64.b64decode(image_base64)
        
        if isinstance(image_data, bytes):
            image_file = io.BytesIO(image_data)
        else:
            return None

        return self.upload_image(image_file, folder=folder, public_id=public_id)
    
    def generate_url(self, public_id: str, width : int = None, height : str = None, crop: str ='fill'):
        """Generates a URL for a Cloudinary image with optional transformations."""
        return cloudinary.CloudinaryImage(public_id).build_url(
            width=width,
            height=height,
            crop=crop
        )
        
    def generate_db_link(self, version: str, public_id: str, format: str):
        """Generates the final part of the link onto database"""
        link = f"v{version}/{public_id}.{format}"
        return link
    
    def upload_and_get_db_link(self, image_data: object, folder:str = '', public_id: str = None):
        response = self.upload_image_from_base64(image_data, folder, public_id)
        if response is not None:
            version = response["version"]
            public_id = response["public_id"]
            format = response["format"]
            return self.generate_db_link(version, public_id, format)
        else:
            return ''