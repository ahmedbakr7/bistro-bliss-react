import { useState, type ChangeEvent } from "react";
import Input from "./Form/Input";
import type { FieldHookConfig } from "formik";

type UploadStatus = "idle" | "uploading" | "success" | "error";

export interface FileUploaderProps extends FieldHookConfig<string> {
    name: string;
    accept?: string;
    className?: string;
    errorClassName?: string;
}

export default function FileUploader({ ...props }: FileUploaderProps) {
    const [file, setFile] = useState<File | null>(null);
    const [status, setStatus] = useState<UploadStatus>("idle");
    const [uploadProgress, setUploadProgress] = useState(0);

    function handleFileChange(
        e: ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) {
        const target = e.target as HTMLInputElement;
        if (target.files) {
            setFile(target.files[0]);
        }
    }

    async function handleFileUpload() {
        if (!file) return;

        setStatus("uploading");
        setUploadProgress(0);

        const formData = new FormData();
        formData.append("file", file);
    }

    return (
        <>
            <Input type="file" {...props} onChange={handleFileChange} />
        </>
    );
}
