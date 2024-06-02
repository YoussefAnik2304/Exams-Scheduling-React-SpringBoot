import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { ExamForm1Dto } from '@/types/exam';

export function handleNext() {
    console.log("Handling next step...");
}


type ExamDetailsFormProps = {
    onNext: () => void; // Adjusted to not require data
};

const ExamDetailsForm: React.FC<ExamDetailsFormProps> = ({ onNext }) => {
    const { register } = useForm<ExamForm1Dto>(); // No need for handleSubmit

   const handleNextButtonClick = () => {
        onNext();
    };

    return (
        <form onSubmit={(e) => e.preventDefault()} className="space-y-6 p-6 bg-white shadow-md rounded-md">
            <div>
                <Label className="block text-sm font-medium text-gray-700">Semester</Label>
                <Input className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" {...register('semestere')} />
            </div>
            <div>
                <Label className="block text-sm font-medium text-gray-700">Session</Label>
                <Input className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" {...register('session')} />
            </div>
            <div>
                <Label className="block text-sm font-medium text-gray-700">Course</Label>
                <Input className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" {...register('course')} />
            </div>
            <div>
                <Label className="block text-sm font-medium text-gray-700">Type of Exam</Label>
                <Input className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" {...register('typeExam')} />
            </div>
            <div>
                <Label className="block text-sm font-medium text-gray-700">Date</Label>
                <Input type="date" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" {...register('date')} />
            </div>
            <div>
                <Label className="block text-sm font-medium text-gray-700">Starting Hour</Label>
                <Input type="time" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" {...register('starting_hour')} />
            </div>
            <Button onClick={handleNextButtonClick} className="mt-6 w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Next</Button>
        </form>
    );
};

export default ExamDetailsForm;
