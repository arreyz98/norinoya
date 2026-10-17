import type { ValidationErrors } from './panduan-form-utils';

export function FieldError({ field, errors }: { field: string; errors: ValidationErrors }) {
    const message = errors[field];

    if (!message) {
        return null;
    }

    return (
        <p id={`${field}-error`} className="text-destructive text-sm">
            {message}
        </p>
    );
}
