import { type ReactElement, useRef, useState } from "react";
import api from "../../services/api";
import type { Product } from "./Products";
import { useMutation } from "@tanstack/react-query";
import Form from "../Form/Form";
import Input from "../Form/Input";
import { productSchema } from "../../schemas/product/productSchema";
import FileUploader from "../FileUploader";

interface ProductFormProps {
    product?: Product | null;
    onSuccess: (saved: Product) => void;
    onCancel: () => void;
}

interface ProductFormValues {
    name: string;
    description: string;
    price: string; // keep as string in form, convert on submit
    imageUrl: string; // server-returned or existing URL
    imageFile?: File | null; // new file to upload
}

export default function ProductForm({
    product,
    onSuccess,
    onCancel,
}: ProductFormProps): ReactElement {
    // Initial values derived from product (editing) or defaults
    const initialValues: ProductFormValues = {
        name: product?.name ?? "",
        description: product?.description ?? "",
        price: product?.price != null ? String(product.price) : "",
        imageUrl: (product as Product & { imageUrl?: string })?.imageUrl ?? "",
        imageFile: null,
    };

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string | null>(
        initialValues.imageUrl || null
    );

    const mutation = useMutation({
        mutationFn: async (values: ProductFormValues) => {
            // Build multipart if file included; else send JSON
            const basePayload = {
                name: values.name.trim(),
                description: values.description.trim() || null,
                price: Number(values.price),
            };

            let saved: Product;

            if (values.imageFile) {
                const formData = new FormData();
                Object.entries(basePayload).forEach(([k, v]) =>
                    formData.append(k, String(v))
                );
                formData.append("image", values.imageFile);

                if (product) {
                    const { data } = await api.patch<Product>(
                        `/products/${product.id}`,
                        formData,
                        {
                            headers: { "Content-Type": "multipart/form-data" },
                        }
                    );
                    saved = data;
                } else {
                    const { data } = await api.post<Product>(
                        "/products",
                        formData,
                        {
                            headers: { "Content-Type": "multipart/form-data" },
                        }
                    );
                    saved = data;
                }
            } else {
                const jsonPayload = {
                    ...basePayload,
                    imageUrl: values.imageUrl.trim() || null,
                };
                if (product) {
                    const { data } = await api.patch<Product>(
                        `/products/${product.id}`,
                        jsonPayload
                    );
                    saved = data;
                } else {
                    const { data } = await api.post<Product>(
                        "/products",
                        jsonPayload
                    );
                    saved = data;
                }
            }
            return saved;
        },
        onSuccess: (saved) => {
            onSuccess(saved);
        },
    });

    return (
        <div className="p-3 border rounded-3 bg-light">
            <h5 className="mb-3">{product ? "Edit Product" : "New Product"}</h5>
            <Form<ProductFormValues>
                initialValues={initialValues}
                validationSchema={productSchema}
                onSubmit={(vals) => mutation.mutate(vals)}
                onReset={() => {
                    /* Formik will revert to initialValues automatically */
                }}
                enableReinitialize
            >
                {(form) => (
                    <>
                        <div className="mb-2">
                            <label className="form-label" htmlFor="name">
                                Name
                            </label>
                            <Input
                                name="name"
                                id="name"
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="mb-2">
                            <label className="form-label" htmlFor="description">
                                Description
                            </label>
                            <Input
                                as="textarea"
                                rows={3}
                                name="description"
                                id="description"
                                className="form-control"
                            />
                        </div>
                        <div className="mb-2">
                            <label className="form-label" htmlFor="price">
                                Price
                            </label>
                            <Input
                                name="price"
                                id="price"
                                type="number"
                                step="0.01"
                                className="form-control"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="imageUrl">
                                Image URL (optional if uploading)
                            </label>
                            <Input
                                name="imageUrl"
                                id="imageUrl"
                                className="form-control"
                                placeholder="https://..."
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="imageFile">
                                Upload Image
                            </label>
                            <FileUploader
                                name="imageFile"
                                accept="image/*"
                                ref={fileInputRef}
                                onChangeCallback={(e) => {
                                    const file =
                                        (e.target as HTMLInputElement)
                                            .files?.[0] || null;
                                    form.setFieldValue("imageFile", file);
                                    if (file) {
                                        const url = URL.createObjectURL(file);
                                        setPreview(url);
                                    } else {
                                        setPreview(
                                            initialValues.imageUrl || null
                                        );
                                    }
                                    return (e.target as HTMLInputElement).value; // satisfy Input internal set
                                }}
                            />
                            {preview && (
                                <div className="mt-2">
                                    <img
                                        src={preview}
                                        alt="Preview"
                                        style={{
                                            maxWidth: 160,
                                            maxHeight: 120,
                                            objectFit: "cover",
                                        }}
                                        className="border rounded"
                                    />
                                </div>
                            )}
                        </div>
                        {mutation.isError && (
                            <div
                                className="alert alert-danger py-2"
                                role="alert"
                            >
                                Failed to save product.
                                <br />
                                <b>Error:</b>{" "}
                                {(mutation.error as Error).message}
                            </div>
                        )}
                        {mutation.isSuccess && (
                            <div
                                className="alert alert-success py-2"
                                role="alert"
                            >
                                Product saved successfully.
                            </div>
                        )}
                        <div className="d-flex gap-2">
                            <button
                                type="submit"
                                disabled={mutation.isPending || !form.isValid}
                                className="theme-btn-primary btn-sm"
                            >
                                {mutation.isPending ? "Saving..." : "Save"}
                            </button>
                            <button
                                type="reset"
                                disabled={
                                    mutation.isPending || form.isSubmitting
                                }
                                className="theme-btn-secondary btn-sm"
                                onClick={() => {
                                    form.handleReset();
                                    setPreview(initialValues.imageUrl || null);
                                    if (fileInputRef.current)
                                        fileInputRef.current.value = "";
                                }}
                            >
                                Reset
                            </button>
                            <button
                                type="button"
                                className="theme-btn-secondary btn-sm"
                                onClick={onCancel}
                                disabled={mutation.isPending}
                            >
                                Cancel
                            </button>
                        </div>
                    </>
                )}
            </Form>
        </div>
    );
}
