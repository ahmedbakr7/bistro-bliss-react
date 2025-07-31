import { useState, type ChangeEvent, type Ref } from "react";
import Input from "./Form/Input";
import type { FieldHookConfig } from "formik";

type UploadStatus = "idle" | "uploading" | "success" | "error";

export interface FileUploaderProps extends FieldHookConfig<string>  {
    name: string;
    accept?: string;
    className?: string;
    errorClassName?: string;
    ref?: Ref<HTMLInputElement|undefined>;
}

export default function FileUploader({ ...props }: FileUploaderProps) {
    const [file, setFile] = useState<File | null>(null);
    const [status, setStatus] = useState<UploadStatus>("idle");
    const [uploadProgress, setUploadProgress] = useState(0);

    async function handleFileUpload() {
        if (!file) return;

        setStatus("uploading");
        setUploadProgress(0);

        const formData = new FormData();
        formData.append("file", file);
    }

    return (
        <>
            <Input type="file" {...props} />
        </>
    );
}
