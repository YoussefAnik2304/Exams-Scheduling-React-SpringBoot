import React from 'react';
import { useForm } from 'react-hook-form';
import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Label} from "@/components/ui/label.tsx";
import { ExamForm2Dto, ExamForm1Dto, ExamResponseDto } from '@/types/exam';


type ExamPlanningFormProps = {
    form1Data: ExamForm1Dto;
    onNext: (data: ExamForm2Dto) => void;
};

const ExamPlanningForm: React.FC<ExamPlanningFormProps> = ({ form1Data, onNext }) => {
    const { register, handleSubmit } = useForm<ExamForm2Dto>();

    const onSubmit = (data: ExamForm2Dto) => {
        const responseDto: ExamResponseDto = {
            examForm1Dto: form1Data,
            plannedDuration: data.plannedDuration,
            nbrStudents: data.nbrOfSurv,
        };
        onNext({ ...data, responseDto });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
            <div>
                <Label>Planned Duration</Label>
                <Input type="number" className="mt-1 block w-full" {...register('plannedDuration')} />
            </div>
            <div>
                <Label>Number of Surveillance</Label>
                <Input type="number" className="mt-1 block w-full" {...register('nbrOfSurv')} />
            </div>
            <div className="flex items-center space-x-2">
                <Label>Random</Label>
                <Input type="checkbox" {...register('random')} />
            </div>
            <Button type="submit" className="mt-4">Next</Button>
        </form>
    );
};

export default ExamPlanningForm;
