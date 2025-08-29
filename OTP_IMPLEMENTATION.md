# OTP Implementation Guide

This implementation provides a complete OTP (One-Time Password) verification system for the Bistro Bliss application using React, TypeScript, and the `react-otp-input` package.

## 🚀 Features

-   **User-friendly OTP Input**: Clean, accessible 6-digit input fields
-   **Real-time Validation**: Instant feedback with error states
-   **Auto-complete Detection**: Automatically detects when OTP is entered
-   **Resend Functionality**: Smart resend with countdown timer
-   **Responsive Design**: Works on all device sizes
-   **Accessibility**: ARIA labels and keyboard navigation
-   **TypeScript Support**: Full type safety throughout

## 📁 File Structure

```
src/
├── components/Auth/
│   ├── OtpInput.tsx          # Main OTP input component
│   └── useOtpInput.tsx       # Custom hook for OTP logic
├── pages/
│   └── OtpPage.tsx           # Complete OTP verification page
├── schemas/auth/
│   ├── otpSchema.ts          # Yup validation schema
│   └── index.ts              # Schema exports
├── services/
│   └── otpApi.ts             # API service for OTP operations
└── routes.tsx                # Route configuration
```

## 🔧 Components

### 1. OtpInput Component (`components/Auth/OtpInput.tsx`)

A reusable OTP input component with the following features:

**Props:**

-   `value: string` - Current OTP value
-   `onChange: (otp: string) => void` - OTP change handler
-   `length?: number` - Number of digits (default: 6)
-   `disabled?: boolean` - Disable input
-   `hasError?: boolean` - Show error state
-   `errorMessage?: string` - Error message to display
-   `onComplete?: (otp: string) => void` - Called when OTP is complete
-   `placeholder?: string` - Placeholder character (default: "○")
-   `autoFocus?: boolean` - Auto-focus first input (default: true)
-   `className?: string` - Additional CSS classes

**Usage:**

```tsx
<OtpInputComponent
    value={otp}
    onChange={setOtp}
    length={6}
    hasError={!!errors.otp}
    errorMessage={errors.otp}
    onComplete={handleOtpComplete}
/>
```

### 2. useOtpInput Hook (`components/Auth/useOtpInput.tsx`)

Custom hook that manages OTP state and logic:

**Parameters:**

-   `length?: number` - OTP length
-   `onComplete?: (otp: string) => void` - Completion callback
-   `onOtpChange?: (otp: string) => void` - Change callback
-   `autoFocus?: boolean` - Auto-focus behavior

**Returns:**

-   `otp: string` - Current OTP value
-   `setOtp: (otp: string) => void` - OTP setter
-   `isComplete: boolean` - Whether OTP is complete
-   `clear: () => void` - Clear OTP
-   `focus: () => void` - Focus first input
-   `inputRef: RefObject` - Reference to first input

### 3. OTP Page (`pages/OtpPage.tsx`)

Complete verification page with:

-   Contact info masking for privacy
-   Countdown timer for resend functionality
-   Error handling and loading states
-   Navigation back to login
-   Responsive design

## 🔐 Validation Schema (`schemas/auth/otpSchema.ts`)

```typescript
export const otpSchema = yup.object().shape({
    otp: yup
        .string()
        .required("OTP is required")
        .length(6, "OTP must be exactly 6 digits")
        .matches(/^\d{6}$/, "OTP must contain only numbers"),
});
```

## 🌐 API Service (`services/otpApi.ts`)

Centralized API service for OTP operations:

**Methods:**

-   `verify(request)` - Verify OTP code
-   `resend(request)` - Resend OTP code

**Mock Implementation:**
Currently uses mock functions that simulate API calls. Replace with actual API endpoints:

```typescript
// Example implementation with real API
export const otpApi = {
    verify: async (request: OtpVerificationRequest) => {
        const response = await api.post("/auth/verify-otp", request);
        return response.data;
    },
    resend: async (request: OtpResendRequest) => {
        const response = await api.post("/auth/resend-otp", request);
        return response.data;
    },
};
```

## 🎨 Styling

The implementation uses:

-   **CSS Custom Properties**: Theme-aware colors and spacing
-   **Bootstrap Classes**: For consistent styling
-   **CSS-in-JS**: For dynamic styling based on state
-   **Responsive Design**: Mobile-first approach

### Key Style Features:

-   Hover and focus states
-   Error states with red borders
-   Disabled states with muted colors
-   Smooth transitions
-   Consistent spacing and typography

## 🚦 Usage Flow

1. **Navigation**: User is redirected to `/auth/otp` with state containing email/phone
2. **Display**: Page shows masked contact info and OTP input
3. **Input**: User enters 6-digit OTP
4. **Validation**: Client-side validation with real-time feedback
5. **Submission**: OTP sent to API for verification
6. **Success**: Redirect to home page
7. **Error**: Display error message
8. **Resend**: Option to resend with countdown timer

## 🔧 Integration Steps

### 1. Install Dependencies

```bash
npm install react-otp-input formik yup
```

### 2. Navigation to OTP Page

From login/register components:

```tsx
// After successful login/register request
navigate(paths.otp, {
    state: {
        email: "user@example.com",
        type: "email",
    },
});
```

### 3. API Integration

Replace mock functions in `otpApi.ts` with your actual endpoints:

```typescript
import { apiClient } from "./api";

export const otpApi = {
    verify: async (request: OtpVerificationRequest) => {
        const response = await apiClient.post("/auth/verify-otp", request);
        return response.data;
    },
    // ... other methods
};
```

## 📱 Accessibility Features

-   **ARIA Labels**: Each input has descriptive labels
-   **Keyboard Navigation**: Tab and arrow key support
-   **Screen Reader Support**: Proper announcements
-   **Focus Management**: Auto-focus and focus trapping
-   **Error Announcements**: Clear error messages

## 🔒 Security Best Practices

-   **Client-side Validation**: Immediate feedback
-   **Server-side Validation**: Final verification
-   **Rate Limiting**: Prevent spam (implement on server)
-   **Time Limits**: OTP expiration
-   **Secure Transmission**: HTTPS only
-   **No Logging**: Don't log OTP values

## 📝 Customization

### Styling

Modify CSS custom properties in your theme:

```css
:root {
    --color-primary-500: #your-brand-color;
    --color-danger-500: #your-error-color;
}
```

### Behavior

Adjust component props:

```tsx
<OtpInputComponent
    length={4} // 4-digit OTP
    placeholder="*" // Different placeholder
    autoFocus={false} // No auto-focus
/>
```

## 🧪 Testing

The implementation is ready for testing with:

-   **Unit Tests**: Test individual components
-   **Integration Tests**: Test user flows
-   **Accessibility Tests**: Verify a11y compliance
-   **E2E Tests**: Complete user journeys

## 📈 Performance

-   **Lazy Loading**: Components can be code-split
-   **Memoization**: useCallback for event handlers
-   **Debouncing**: API calls are properly managed
-   **Minimal Re-renders**: Optimized state updates

## 🐛 Troubleshooting

**Common Issues:**

1. **Focus Issues**: Check autoFocus prop and inputRef
2. **Styling Problems**: Verify CSS custom properties
3. **API Errors**: Check network tab and error handling
4. **Navigation Issues**: Verify route state passing

## 🔄 Future Enhancements

-   **Biometric Verification**: Add fingerprint/face recognition
-   **Multiple Channels**: SMS, Email, Voice options
-   **Backup Codes**: Alternative verification methods
-   **Enhanced Security**: Additional fraud detection
-   **Improved UX**: Better animations and transitions

---

This implementation follows React best practices and provides a solid foundation for OTP verification in modern web applications.
