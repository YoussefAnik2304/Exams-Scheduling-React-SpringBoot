import React, {createContext} from "react";
import {ErrorHandler} from "@/helpers/ErrorHandler.tsx";
import {Course} from "@/types/Course.ts";
import useToastHelper from "@/helpers/useToastHelper.tsx";
import { handleFetch } from "@/api/axios";
import { useNavigate } from "react-router-dom";


type CoursesContextType = {
    createCourse: (course: Course) => Promise<void>;
    updateCourse: (course: Course, courseId: number) => Promise<void>;
    deleteCourse: (courseId: number) => Promise<void>;
    getCourse: (courseId: number) => Promise<Course>;
    getCourses: () => Promise<Course[]>;
};

type Props = { children: React.ReactNode };

const CoursesContext = createContext<CoursesContextType>({} as CoursesContextType);
export const CoursesProvider  = ({ children } : Props) => {
    const {showToast} = useToastHelper();
    const navigate = useNavigate();
    const createCourse = async (Course: Course) => {
        const formData = new FormData();
        formData.append("courseTitle", Course.titre);
        formData.append("nbrStudents", Course.nbrStudents);
        formData.append("typeElement", JSON.stringify(Course.typeElement));

        await handleFetch("Courses/add","post",formData)
            .then((res) => {
                const resultMessage = res.data.resultDescription.loggingMessage;
                showToast("Success", resultMessage);

                navigate(`/Courses/${res.data.id}`);

            }).catch((e) => {
                const ErrorMessage = ErrorHandler(e);
                showToast("Something went wrong!", ErrorMessage);
            });
    }

    const updateCourse = async (Course: Course) => {
        const formData = new FormData();
        formData.append("courseTitle", Course.titre);
        formData.append("nbrStudents", Course.nbrStudents);
        formData.append("typeElement", Course.typeElement.titre);

        await handleFetch(`Courses/update/${Course.courseId}`,"put",formData)
            .then((res) => {
                const resultMessage = res.data.resultDescription.loggingMessage;
                showToast("Success", resultMessage);

                navigate(`/Courses/${res.data.id}`);

            }).catch((e) => {
                const ErrorMessage = ErrorHandler(e);
                showToast("Something went wrong!", ErrorMessage);
            });
    }

    const deleteCourse = async (courseId : number) => {

        await handleFetch(`Courses/delete/${courseId}`,"DELETE")
            .then((res) => {
                const resultMessage = res.data.resultDescription.loggingMessage;
                showToast("Success", resultMessage);

                navigate("Courses");

            }).catch((e) => {
                const ErrorMessage = ErrorHandler(e);
                showToast("Something went wrong!", ErrorMessage);
            });
    };

    const getCourse = async (courseId: number): Promise<Course> => {
        try {
            const response = await handleFetch(`Courses/${courseId}`, "GET");
            const resultMessage = response.data.resultDescription.loggingMessage;
            showToast("Success", resultMessage);
            return response.data; // Ensure this returns the course data
        } catch (error) {
            const ErrorMessage = ErrorHandler(error);
            showToast("Something went wrong!", ErrorMessage);
            throw error; // Rethrow the error to be handled by the caller
        }
    };

    const getCourses = async (): Promise<Course[]> => {
        try {
            const response = await handleFetch(`Courses/List`, "GET");
            const resultMessage = response.data.resultDescription.loggingMessage;
            showToast("Success", resultMessage);
            return response.data; // Ensure this returns the list of courses
        } catch (error) {
            const ErrorMessage = ErrorHandler(error);
            showToast("Something went wrong!", ErrorMessage);
            throw error; // Rethrow the error to be handled by the caller
        }
    };




    return (
        <CoursesContext.Provider value={{
            createCourse,
            updateCourse,
            deleteCourse,
            getCourse,
            getCourses,
            }}>
            {children}
        </CoursesContext.Provider>
    );
};
export const useCourse = () : CoursesContextType => React.useContext(CoursesContext);