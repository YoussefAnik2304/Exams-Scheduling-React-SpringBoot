import React, {createContext} from "react";
import {ErrorHandler} from "@/helpers/ErrorHandler.tsx";
import {Course} from "@/types/Course.ts";
import useToastHelper from "@/helpers/useToastHelper.tsx";
import { handleFetch} from "@/api/axios";
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

    // const createCourse = async (Course: Course) => {
    //     const formData = new FormData();
    //     formData.append("courseTitle", Course.titre);
    //     formData.append("nbrStudents", Course.nbrStudents.toString());
    //     formData.append("typeElement", JSON.stringify(Course.typeElement));
    //
    //     await handleFetch("Courses/add","post",formData)
    //         .then((res) => {
    //             const resultMessage = res.data.resultDescription.loggingMessage;
    //             showToast("Success", resultMessage);
    //
    //             navigate(`/Courses/${res.data.id}`);
    //
    //         }).catch((e) => {
    //             const ErrorMessage = ErrorHandler(e);
    //             showToast("Something went wrong!", ErrorMessage);
    //         });
    // }

    const createCourse = async (course: Course) => {
        const formData = new FormData();
        formData.append("titre", course.titre);
        formData.append("nbrStudents", course.nbrStudents.toString());
        formData.append("typeElement", course.typeElement);
        formData.append("grade", course.grade);
        formData.append("professor", course.professor);
        try {
            await handleFetch("Courses/add", "POST", formData);
            // navigate(`/Courses/${res.data.id}`);
            navigate(`/admin/courses/`);
        } catch (e) {
            const errorMessage = ErrorHandler(e);
            showToast("Something went wrong!", errorMessage);
        }
    };

    const updateCourse = async (Course: Course) => {
       const formData = new FormData();
        formData.append("courseTitle", Course.titre);
        formData.append("nbrStudents", Course.nbrStudents);
        formData.append("typeElement", Course.typeElement);
        formData.append("grade", Course.grade);
        formData.append("professor", Course.professor);

        await handleFetch(`Courses/update/${Course.courseId}`,"put",Course)
            .then((res) => {

                navigate(`/Courses/${res.data.id}`);

            }).catch((e) => {
                const ErrorMessage = ErrorHandler(e);
                showToast("Something went wrong!", ErrorMessage);
            });
    }


    const deleteCourse = async (courseId : number) => {

        await handleFetch(`Courses/delete/${courseId}`,"DELETE")
            .then((res) => {
                showToast("Success", "Deleted Successfully");

                navigate(`/admin/courses`);

            }).catch((e) => {
                const ErrorMessage = ErrorHandler(e);
                showToast("Something went wrong!", ErrorMessage);
            });
    };

    const getCourse = async (courseId: number): Promise<Course> => {
        try {
            const response = await handleFetch(`Courses/${courseId}`, "GET");
  
            return response.data; // Ensure this returns the course data
        } catch (error) {
            const ErrorMessage = ErrorHandler(error);
            showToast("Something went wrong!", ErrorMessage);
            throw error; // Rethrow the error to be handled by the caller
        }
    };

    const getCourses = async (): Promise<Course[]> => {
        try {
            const response = await handleFetch(`Courses`, "GET");

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