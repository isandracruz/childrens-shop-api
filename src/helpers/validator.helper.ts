const passwordSchema = {
    notEmpty: {
        errorMessage: 'Password is required',
    },
    isLength: {
        options: { min: 8 },
        errorMessage: 'Password should be at least 8 chars',
    },
};

const emailSchema = {
    notEmpty: {
        errorMessage: 'Email is required',
    },
    isEmail: {
        errorMessage: 'Must be a valid e-mail address',
    },
};

export {
    passwordSchema,
    emailSchema
}
