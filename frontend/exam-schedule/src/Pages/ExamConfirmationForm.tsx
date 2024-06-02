import React from 'react';
import { useForm } from 'react-hook-form';
import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Label} from "@/components/ui/label.tsx";
import { ExamForm3Dto, ExamResponseDto } from '@/types/exam';

type ExamConfirmationFormProps = {
    responseDto: ExamResponseDto;
    onSubmitForm: (data: ExamForm3Dto) => void;
};

const ExamConfirmationForm: React.FC<ExamConfirmationFormProps> = ({ responseDto, onSubmitForm }) => {
    const { register, handleSubmit } = useForm<ExamForm3Dto>();

    const onSubmit = (data: ExamForm3Dto) => {
        onSubmitForm({ ...data, responseDto });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
        <div>
            <Label>Actual Duration</Label>
    <Input type="number" className="mt-1 block w-full" {...register('actualDuration')} />
    </div>
    <div>
    <Label>Exam Surveillance</Label>
    <Input className="mt-1 block w-full" {...register('exam_surveill')} />
    </div>
    <div>
    <Label>Assignments</Label>
    <Input className="mt-1 block w-full" {...register('assignments')} />
    </div>
    <div>
    <Label>Epreuve</Label>
    <Input className="mt-1 block w-full" {...register('epreuve')} />
    </div>
    <div>
    <Label>Pv</Label>
    <Input className="mt-1 block w-full" {...register('Pv')} />
    </div>
    <div>
    <Label>Rapport</Label>
    <Input className="mt-1 block w-full" {...register('Rapport')} />
    </div>
    <Button type="submit" className="mt-4">Submit</Button>
        </form>
);
};

export default ExamConfirmationForm;
