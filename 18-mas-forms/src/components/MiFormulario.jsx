/* eslint-disable no-unused-vars */
import React from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';

export const MiFormulario = () => {

    const validationSchema = Yup.object().shape({
        nombre: Yup.string()
            .min(3, "El nombre es muy corto")
            .max(40, "El nombre es muy largo")
            .required("Campo obligatorio"),
        email: Yup.string()
            .email("Email inválido")
            .required("Campo obligatorio")
    });

    const formik = useFormik({
        initialValues: {
            nombre: "",
            email: ""
        },
        validationSchema,
        onSubmit: values => {
            console.log(values);
        }
    });

    return (
        <div>

            <h1>Mi Formulario con Formik</h1>

            <form onSubmit={formik.handleSubmit}>
                <div className='form-group'>

                    <label htmlFor='nombre'>Nombre</label>
                    <input type='text' id='nombre' name='nombre' value={formik.values.nombre} onChange={formik.handleChange} />

                    <div className='error'>
                        {formik.errors.nombre && formik.touched.nombre ? formik.errors.nombre : ""}
                    </div>

                </div>

                <div className='form-group'>

                    <label htmlFor='email'>Email</label>
                    <input type='text' id='email' name='email' value={formik.values.email} onChange={formik.handleChange} />

                    <div className='error'>
                        {formik.errors.email && formik.touched.email ? formik.errors.email : ""}
                    </div>

                </div>

                <input type='submit' value="Enviar" />
            </form>

        </div>
    )
}
