import React, {createContext} from "react";
import {ErrorHandler} from "@/helpers/ErrorHandler.tsx";
import {Course} from "@/types/profCourse.ts";
import useToastHelper from "@/helpers/useToastHelper.tsx";
import { handleFetch } from "@/api/axios";
import { useNavigate } from "react-router-dom";


type CoursesContextType = {
    createCourse: (Course : Course, profId: number) => void;
    updateCourse: (Course: Course, courseId : number, profId : number) => void;
    deleteCourse: (courseId : number, profId : number) => void;
}

type Props = { children: React.ReactNode };

const CoursesContext = createContext<CoursesContextType>({} as CoursesContextType);
export const CoursesProvider  = ({ children } : Props) => {
    const {showToast} = useToastHelper();
    const navigate = useNavigate();
    const createCourse = async (Course: Course) => {
        const formData = new FormData();
        formData.append("courseTitle", Course.courseTitle);
        formData.append("nbrStudents", Course.nbrStudents);
        formData.append("typeElement", Course.typeElement.titre);

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
//ttttttttttttttttttttttttttttttttttttttttt
    const updateCourse = async (Course: Course) => {
        const formData = new FormData();
        formData.append("courseTitle", Course.courseTitle);
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

    return (
        <CoursesContext.Provider value={{
            createCourse,
            updateCourse,
            deleteCourse,
            }}>
            {children}
        </CoursesContext.Provider>
    );
};
export const useCourse = () : CoursesContextType => React.useContext(CoursesContext);