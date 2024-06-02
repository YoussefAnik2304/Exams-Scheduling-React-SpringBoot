import React, { useState } from 'react';
import ExamDetailsForm from './ExamDetailsForm';
import ExamPlanningForm from './ExamPlanningForm';
import ExamConfirmationForm from './ExamConfirmationForm';
import { ExamForm1Dto, ExamForm2Dto, ExamForm3Dto } from '@/types/exam';
import { useExam } from '@/context/ExamContext';

const ExamMultiStepForm: React.FC = () => {
    const [form1Data, setForm1Data] = useState<ExamForm1Dto | null>(null);
    const [form2Data, setForm2Data] = useState<ExamForm2Dto | null>(null);
    const { createExam } = useExam();

    const handleNextStep1 = (data: ExamForm1Dto) => {
        setForm1Data(data);
    };

    const handleNextStep2 = (data: ExamForm2Dto) => {
        setForm2Data(data);
    };

    const handleSubmitStep3 = (data: ExamForm3Dto) => {
        if (form1Data && form2Data) {
            createExam(form1Data, form2Data, data);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            {!form1Data ? (
        <ExamDetailsForm onNext={handleNextStep1} />
) : !form2Data ? (
        <ExamPlanningForm form1Data={form1Data} onNext={handleNextStep2} />
) : (
        <ExamConfirmationForm responseDto={form2Data.responseDto} onSubmitForm={handleSubmitStep3} />
)}
    </div>
);
};

export default ExamMultiStepForm;
