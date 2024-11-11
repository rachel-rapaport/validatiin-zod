'use client'
import React, { useState } from "react";
import FormSchema from "../types/formSchema";
import { z } from "zod";

type FormData = z.infer<typeof FormSchema>;

export default function Form() {
  const [formData, setFormData] = useState<FormData>({
    tz: "",
    firstName: "",
    lastName: "",
    birthDate: new Date(),
    email: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // For birthDate, directly set the value as a Date object
    const updatedValue = name === "birthDate" ? new Date(value) : value;
    setFormData((prev) => ({
        ...prev,
        [name]: updatedValue
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try{
        FormSchema.parse(formData);
        setErrors({});
        alert('Form submitted successfully!');
    }catch(error){
        if(error instanceof z.ZodError){
            const fieldError:{[key: string]: string}={};
            error.errors.forEach((error)=>{
                if(error.path[0]){
                    fieldError[error.path[0].toString()]=error.message;
                }
            })
            setErrors(fieldError);
        }
    }
};

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">tz</label>
        <input
          type="text"
          name="tz"
          value={formData.tz}
          onChange={handleChange}
          placeholder="enter tz"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.tz && <p className="text-red-500 text-sm mt-1">{errors.tz}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">first name</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="enter first name"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">last name:</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="enter last name"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">birthDate:</label>
        <input
          type="date"
          name="birthDate"
          value={formData.birthDate.toISOString().split("T")[0]}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.birthDate && <p className="text-red-500 text-sm mt-1">{errors.birthDate}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="enter email"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
      </div>

      <button
        type="submit"
        className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        שלח
      </button>
    </form>
  );
}
