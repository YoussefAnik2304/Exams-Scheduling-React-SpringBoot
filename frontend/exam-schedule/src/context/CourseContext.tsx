import React, {createContext} from "react";
import {ErrorHandler} from "@/helpers/ErrorHandler.tsx";
import {Course} from "@/types/profCourse.ts";
import useToastHelper from "@/helpers/useToastHelper.tsx";
import {result} from "@/types/helperTypes.ts";
import { handleFetch } from "@/api/axios";


type CoursesContextType = {
    createCourse: (Course : Course, profId: number) => void;
    updateCourse: (Course: Course, courseId : number, profId : number) => void;
    deleteCourse: (courseId : number, profId : number) => void;
}

type Props = { children: React.ReactNode };

const COURSE_END_POINT = "http://localhost:5014/examschedulemanagement/course";

const CoursesContext = createContext<CoursesContextType>({} as CoursesContextType);
export const CoursesProvider  = ({ children } : Props) => {
    const {showToast} = useToastHelper();
    const createCourse = async (Course: Course, courseId : number) => {
        const formData = new FormData();
        formData.append("courseTitle", Course.courseTitle);

        await handleFetch.post<result<Course>>(COURSE_END_POINT + "/create/" + courseId, formData,
            { headers: {"Content-Type": 'multipart/form-data'}
            })
            .then((res) => {
                const resultMessage = res.data.resultDescription.loggingMessage;
                showToast("Success", resultMessage);

            }).catch((e) => {
                const ErrorMessage = ErrorHandler(e);
                showToast("Something went wrong!", ErrorMessage);
            });
    }

    const updateCourse = async (Course: Course, courseId : number, profId : number) => {
        const formData = new FormData();
        formData.append("courseTitle", Course.courseTitle);

        await handleFetch.put<result<Course>>(COURSE_END_POINT + "/update/" + courseId + "/" + profId, formData,
            { headers: {"Content-Type": 'multipart/form-data'}
            })
            .then((res) => {
                const resultMessage = res.data.resultDescription.loggingMessage;
                showToast("Success", resultMessage);

            }).catch((e) => {
                const ErrorMessage = ErrorHandler(e);
                showToast("Something went wrong!", ErrorMessage);
            });
    }

    const deleteCourse = async (courseId : number, profId : number) => {

        await handleFetch.delete<result<Course>>(COURSE_END_POINT + "/delete/" + courseId + "/" + profId)
            .then((res) => {
                const resultMessage = res.data.resultDescription.loggingMessage;
                showToast("Success", resultMessage);

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