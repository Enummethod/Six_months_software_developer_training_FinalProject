import * as yup from 'yup';

export  const validationsRegistered=yup.object().shape({
    name:yup
    .string().min(5,"The name must consist of at least 5 characters.")
    ,
    lastName:yup
    .string().min(5,"The surname must consist of at least 5 characters.")
    ,
    userName: yup
    .string()
    .min(4, 'Username must consist of at least 3 characters.')
    .required('Username required.'),
    password:yup.string().min(5,"The password must consist of at least 5 characters."),
    passwordConfirm:yup.string().oneOf([yup.ref('password')],'Passwords do not match.')
    .required("Password is required.")
})


export  const changePasswordValidation=yup.object().shape({
   
    
    oldPassword:yup.string().min(5,"The password must consist of at least 5 characters.").required("This is a field requirement."),
    password:yup.string().min(5,"The password must consist of at least 5 characters."),
    passwordConfirm:yup.string().oneOf([yup.ref('password')],'Passwords do not match.')
    .required("Password is required.")
})



export  const validationsLogin=yup.object().shape({
    userName: yup
    .string()
    .min(4, 'Username must consist of at least 3 characters.')
    .required('Username required.'),
    password:yup.string().min(5,"The password must consist of at least 5 characters.").required("password is required."),

})


export const validationsAddNewCar=yup.object().shape({
    carName:yup
    .string().min(6,"The car name must be at least 6 characters.").required("This is a field requirement."),
    brand:yup
    .string().required("This is a field requirement."),
    model:yup
    .string()
    ,
    year:yup
    .string().min(4,"The year must consist of a minimum of 4 characters.").max(4,"The year must consist of a maximum of 4 characters.").required("This is a field requirement."),
    plaka:yup
    .string().min(8,"The plate must consist of at least 8 characters.").required("This is a field requirement.")

})