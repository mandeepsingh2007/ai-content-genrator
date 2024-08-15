"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { LoaderIcon } from 'lucide-react';

// Define a type for the form field items
interface FormField {
    label: string;
    name: string;
    field: 'input' | 'textarea';
    required?: boolean;
}

// Define a type for the template
interface TEMPLATE {
    icon?: string;
    name?: string;
    desc?: string;
    form?: FormField[];
}

// Define props interface
interface PROPS {
    selectedTemplate?: TEMPLATE;
    userFormInput: (data: Record<string, any>) => void; // Changed type to a function signature
    loading: boolean;
}

function FormSection({ selectedTemplate, userFormInput, loading }: PROPS) {
    const [formData, setFormData] = useState<Record<string, any>>({}); // Initialized with an empty object

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        userFormInput(formData);
    };

    return (
        <div className='p-5 shadow-md border rounded-lg bg-white'>
            <Image src={selectedTemplate?.icon || '/default-icon.png'} alt='icon' width={70} height={70} />
            <h2 className='font-bold text-2xl mb-2 text-primary'>{selectedTemplate?.name || 'No Template Selected'}</h2>
            <p className='text-gray-500 text-sm'>{selectedTemplate?.desc || 'No description available'}</p>

            <form className='mt-6' onSubmit={onSubmit}>
                {selectedTemplate?.form?.map((item, index) => (
                    <div key={index} className='my-2 flex flex-col gap-2 mb-7'>
                        <label className='font-bold'>{item.label}</label>
                        {item.field === 'input' ? (
                            <Input 
                                name={item.name} 
                                required={item.required} 
                                onChange={handleInputChange} 
                            />
                        ) : item.field === 'textarea' ? (
                            <Textarea 
                                name={item.name} 
                                required={item.required} 
                                onChange={handleInputChange} 
                            />
                        ) : null}
                    </div>
                ))}
                <Button type='submit' className='w-full py-6' disabled={loading}>
                    {loading && <LoaderIcon className='animate-spin' />} Generate Content
                </Button>
            </form>
        </div>
    );
}

export default FormSection;
