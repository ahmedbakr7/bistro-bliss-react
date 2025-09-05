import * as yup from "yup";

export const productSchema = yup.object({
    name: yup
        .string()
        .trim()
        .min(2, "Name too short")
        .max(120, "Name too long")
        .required("Required"),
    description: yup
        .string()
        .trim()
        .max(1000, "Max 1000 characters")
        .nullable(),
    price: yup
        .string()
        .required("Required")
        .test(
            "is-number",
            "Must be a number",
            (v) =>
                v !== undefined && v !== null && v !== "" && !isNaN(Number(v))
        )
        .test("positive", "Must be >= 0", (v) =>
            v == null || v === "" ? true : Number(v) >= 0
        ),
    imageUrl: yup
        .string()
        .trim()
        .url("Must be a valid URL")
        .nullable()
        .optional()
        .test("empty-to-null", (value, ctx) => {
            if (value === "") {
                // convert empty string to null for consistency
                (ctx.parent as Record<string, unknown>).imageUrl = null;
            }
            return true;
        }),
});
