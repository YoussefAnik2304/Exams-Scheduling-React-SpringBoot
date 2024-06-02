import React, { createContext } from "react";
import { ErrorHandler } from "@/helpers/ErrorHandler";
import { Exam, ExamForm1Dto, ExamForm2Dto, ExamResponseDto, ExamForm3Dto } from "@/types/exam";
import { FetchResponse, handleFetch } from "@/api/axios";
import { useNavigate } from "react-router-dom";
import useToastHelper from "@/helpers/useToastHelper";

type ExamContextType = {
    createExam: (form1: ExamForm1Dto, form2: ExamForm2Dto, form3: ExamForm3Dto) => Promise<void>;
    updateExam: (examId: number, updatedExam: Exam) => Promise<void>;
    deleteExam: (examId: number) => Promise<void>;
    getExam: (examId: number) => Promise<Exam>;
    getAllExams: () => Promise<Exam[]>;
};

type Props = { children: React.ReactNode };

const ExamContext = createContext<ExamContextType>({} as ExamContextType);

export const ExamProvider: React.FC<Props> = ({ children }: Props) => {
    const { showToast } = useToastHelper();
    const navigate = useNavigate();

    const createExam = async (form1: ExamForm1Dto, form2: ExamForm2Dto, form3: ExamForm3Dto) => {
        try {
            await handleFetch("Exams/form1", "POST", form1);

            const examResponse: ExamResponseDto = {
                examForm1Dto: form1,
                plannedDuration: form2.plannedDuration,
                nbrStudents: form2.nbrOfSurv,
            };

             await handleFetch("Exams/form2", "POST", { ...form2, responseDto: examResponse });

            // Send the third form data
            await handleFetch("Exams/form3", "POST", { ...form3, responseDto: examResponse });

            showToast("Success", "Successfully Created");
            navigate("/Exams");
        } catch (error) {
            const ErrorMessage = ErrorHandler(error);
            showToast("Something went wrong!", ErrorMessage);
            throw error;
        }
    };

    const updateExam = async (examId: number, updatedExam: Exam) => {
        try {
            await handleFetch(`Exams/${examId}`, "PUT", updatedExam);
            showToast("Success", "Successfully Updated");
            navigate("/Exams");
        } catch (error) {
            const ErrorMessage = ErrorHandler(error);
            showToast("Something went wrong!", ErrorMessage);
            throw error;
        }
    };

    const deleteExam = async (examId: number) => {
        try {
            await handleFetch(`Exams/${examId}`, "DELETE");
            showToast("Success", "Successfully Deleted");
            navigate("/Exams");
        } catch (error) {
            const ErrorMessage = ErrorHandler(error);
            showToast("Something went wrong!", ErrorMessage);
            throw error;
        }
    };

    const getExam = async (examId: number): Promise<Exam> => {
        try {
            const response: FetchResponse = await handleFetch(`Exams/${examId}`, "GET");
            showToast("Success", "Successfully Fetched Exam");
            return response.data;
        } catch (error) {
            const ErrorMessage = ErrorHandler(error);
            showToast("Something went wrong!", ErrorMessage);
            throw error;
        }
    };

    const getAllExams = async (): Promise<Exam[]> => {
        try {
            const response: FetchResponse = await handleFetch("Exams", "GET");
            showToast("Success", "Successfully Fetched All Exams");
            return response.data;
        } catch (error) {
            const ErrorMessage = ErrorHandler(error);
            showToast("Something went wrong!", ErrorMessage);
            throw error;
        }
    };

    return (
        <ExamContext.Provider
            value={{
                createExam,
                updateExam,
                deleteExam,
                getExam,
                getAllExams,
            }}
        >
            {children}
        </ExamContext.Provider>
    );
};

export const useExam = (): ExamContextType => React.useContext(ExamContext);
