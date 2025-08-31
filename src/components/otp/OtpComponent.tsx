// import { useState, type CSSProperties, type ReactNode } from "react";
// import { type } from "../../stores/AuthContext/index";

// interface OtpComponentProps
//     extends Omit<HTMLInputElement, "placeholder" | "value"> {
//     value?: string;
//     key?: string;
//     // onChange?: (value: string) => void;
//     // onClick?: (value: string) => void;
//     // onKeyDown?: (value: string) => void;
//     className?: string;
//     placeholder?: string;
// }

// export default function OtpComponent({
//     value = "",
//     placeholder,
// }: OtpComponentProps): ReactNode {
//     return (
//         <input
//             placeholder={placeholder}
//             type="text"
//             maxLength={1}
//             value={value}
//             className={`text-center m-3`}
//             onChange={(e) => {
//                 handleChange(e.target, index);
//             }}
//             onKeyDown={(e) => {
//                 if (e.key === "Backspace") {
//                     handleChange(e.target, index);
//                 }
//             }}
//         />
//     );
// }
