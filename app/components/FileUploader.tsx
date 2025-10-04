import { useCallback, useRef, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { formatSize } from '~/lib/utils'

interface FileUploaderProps {
    onFileSelect?: (file: File | null) => void;
}

const FileUploader = ({ onFileSelect }: FileUploaderProps) => {
    const [file, setFile] = useState<File | null>(null)
    const inputRef = useRef<HTMLInputElement | null>(null)

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const newFile = acceptedFiles[0] || null
        setFile(newFile)
        onFileSelect?.(newFile)

        // Reset input value so the same file can be re-uploaded
        if (inputRef.current) {
            inputRef.current.value = ''
        }
    }, [onFileSelect])

    const maxFileSize = 20 * 1024 * 1024 // 20MB

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        multiple: false,
        accept: { 'application/pdf': ['.pdf'] },
        maxSize: maxFileSize,
    })

    const handleRemoveFile = (e: React.MouseEvent) => {
        e.stopPropagation()
        setFile(null)
        onFileSelect?.(null)

        // Ensure input is cleared for re-upload
        if (inputRef.current) {
            inputRef.current.value = ''
        }
    }

    return (
        <div
            {...getRootProps()}
            className="w-full gradient-border cursor-pointer"
        >
            <input ref={inputRef} {...getInputProps()} />

            <div className="space-y-4">
                {file ? (
                    <div
                        className="uploader-selected-file flex items-center gap-3"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img src="/images/pdf.png" alt="pdf" className="size-10" />
                        <div>
                            <p className="text-sm font-medium text-gray-700 truncate max-w-xs">
                                {file.name}
                            </p>
                            <p className="text-sm text-gray-500">
                                {formatSize(file.size)}
                            </p>
                        </div>
                        <button
                            className="p-2 cursor-pointer"
                            onClick={handleRemoveFile}
                        >
                            <img src="/icons/cross.svg" alt="remove" className="w-4 h-4" />
                        </button>
                    </div>
                ) : (
                    <div className="text-center">
                        <div className="mx-auto w-16 h-16 flex items-center justify-center mb-2">
                            <img src="/icons/info.svg" alt="upload" className="size-20" />
                        </div>
                        <p className="text-lg text-gray-500">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-lg text-gray-500">
                            PDF (max {formatSize(maxFileSize)})
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default FileUploader
