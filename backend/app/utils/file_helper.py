import os

UPLOAD_DIR= "app/storage/uploads"

async def save_upload_file(file):
    file_path=os.path.join(
        UPLOAD_DIR, file.filename
    )

    with open(file_path,"wb") as buffer:
        buffer.write(await file.read())

    return file_path