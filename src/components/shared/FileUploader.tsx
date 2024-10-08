import { useCallback, useState } from 'react'
import { FileWithPath, useDropzone } from 'react-dropzone'
import { Button } from '../ui/button';

type FieldUploaderProps = {
  fieldChange: (FILES: File[]) => void;
  mediaUrl: string;
}

const FileUploader = ({ fieldChange, mediaUrl }: FieldUploaderProps) => {
  const [file, setFile] = useState<File[]>([])
  const [fileUrl, setFileUrl] = useState(mediaUrl);

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      setFile(acceptedFiles);
      fieldChange(acceptedFiles);
      setFileUrl(URL.createObjectURL(acceptedFiles[0]));
    }, [file])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpeg', '.jpg', '.svg']
    }
  })

  return (
    <div {...getRootProps()} className="flex flex-center flex-col bg-dark-3 rounded-xl cursor-pointer">
      <input {...getInputProps()} className="cursor-pointer" />
      {
        fileUrl ? (
          <>
            <div className='flex flex-1  justify-center w-full p-5 lg:p-10'>
              <img
                src={fileUrl}
                alt="image"
                className='file-uploader-img'
              />
            </div>
            <p className='file_uploader-label'>Clic o Arrasta una foto para remplazarla</p>
          </>
        ) : (
          <div className="file_uploader-box">
            <img
              src="/assets/icons/file-upload.svg"
              alt="file-upload"
              height={77}
              width={96}
            />
            <h3 className="base-medium text-light-2 mb-2 mt-6">Arrastra la foto aquí</h3>
            <p className="text-light-4 small-regular mb-6"></p>

            <Button className="shad-button_dark_4">
              Selecciona una imagen guardada
            </Button>
          </div>
        )
      }
    </div>
  )
}

export default FileUploader