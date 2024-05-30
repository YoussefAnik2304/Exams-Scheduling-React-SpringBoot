import {Prof} from "@/types/prof.ts";
import React, {createContext, useState} from "react";
import {ErrorHandler} from "@/helpers/ErrorHandler.tsx";
import {useNavigate} from "react-router-dom";
import useToastHelper from "@/helpers/useToastHelper.tsx";
import {Query, result, resultArray} from "@/types/helperTypes";
import {AxiosWithAuth, AxiosWithoutToken} from "@/api/axios.ts";
// import {
//     baseObjectInputType,
//     baseObjectOutputType, objectUtil,
//     TypeOf,
//     ZodAny,
//     ZodArray,
//     ZodEffects,
//     ZodObject,
//     ZodOptional,
//     ZodString,
//     ZodTypeAny
// } from "zod";
type ProfsContextType = {
    profs: Prof[];
    prof: Prof | null;
    latestProfs: Prof[];
    fetchProfs: (query: Query, published: boolean) => void;
    fetchLatestProfs: () => void;
    fetchProfById: (id: number) => void;
    totalPages: number;
    fetchProfsTotalPages: (itemsPerPage: number, published: boolean) => void;
    createProf: (prof: Prof) => void;
    updateProf: (prof: Prof, profId: number) => void;
    deleteProf: (profId: number) => void;
    publishProf: (profId: number, publishStatus: boolean) => void;
};
// type ProfsContextType = {
//     profs: Prof[];
//     prof: Prof | null;
//     latestProfs: Prof[];
//     fetchProfs: (query: Query, published : boolean) => void;
//     fetchLatestProfs: () => void;
//     fetchProfById: (id: number) => void;
//     totalPages: number;
//     fetchProfsTotalPages: (itemsPerPage : number, published : boolean) => void;
//     createProf: (Prof: TypeOf<ZodEffects<ZodObject<{
//         passwordConfirmation: ZodString;
//         profImage: ZodOptional<ZodEffects<ZodEffects<ZodAny, any, any>, any, any>>;
//         password: ZodString;
//         profEmail: ZodString;
//         profFirstName: ZodString;
//         profLastName: ZodString;
//         role: ZodString;
//         profGroup: ZodString;
//         profFiliere:ZodString;
//         profDepartement:ZodString;
//         coursesTeaching: ZodOptional<ZodArray<ZodObject<{
//             CourseTitle: ZodString
//         }, "strip", ZodTypeAny, {
//             [k in keyof objectUtil.addQuestionMarks<baseObjectOutputType<{
//                 CourseTitle: ZodString
//             }>, any>]: objectUtil.addQuestionMarks<baseObjectOutputType<{ CourseTitle: ZodString }>, any>[k]
//         }, {
//             [k_1 in keyof baseObjectInputType<{ CourseTitle: ZodString }>]: baseObjectInputType<{
//                 CourseTitle: ZodString
//             }>[k_1]
//         }>, "many">>;
//         profUsername: ZodString
//     }, "strip", ZodTypeAny, {
//         [k in keyof objectUtil.addQuestionMarks<baseObjectOutputType<{
//             passwordConfirmation: ZodString;
//             profImage: ZodOptional<ZodEffects<ZodEffects<ZodAny, any, any>, any, any>>;
//             password: ZodString;
//             profEmail: ZodString;
//             profFirstName: ZodString;
//             profLastName: ZodString;
//             coursesTeaching: ZodOptional<ZodArray<ZodObject<{
//                 CourseTitle: ZodString
//             }, "strip", ZodTypeAny, {
//                 [k in keyof objectUtil.addQuestionMarks<baseObjectOutputType<{
//                     CourseTitle: ZodString
//                 }>, any>]: objectUtil.addQuestionMarks<baseObjectOutputType<{ CourseTitle: ZodString }>, any>[k]
//             }, {
//                 [k_1 in keyof baseObjectInputType<{ CourseTitle: ZodString }>]: baseObjectInputType<{
//                     CourseTitle: ZodString
//                 }>[k_1]
//             }>, "many">>;
//             profUsername: ZodString
//         }>, any>]: objectUtil.addQuestionMarks<baseObjectOutputType<{
//             passwordConfirmation: ZodString;
//             profImage: ZodOptional<ZodEffects<ZodEffects<ZodAny, any, any>, any, any>>;
//             password: ZodString;
//             profEmail: ZodString;
//             profFirstName: ZodString;
//             profLastName: ZodString;
//             coursesTeaching: ZodOptional<ZodArray<ZodObject<{
//                 CourseTitle: ZodString
//             }, "strip", ZodTypeAny, {
//                 [k in keyof objectUtil.addQuestionMarks<baseObjectOutputType<{
//                     CourseTitle: ZodString
//                 }>, any>]: objectUtil.addQuestionMarks<baseObjectOutputType<{ CourseTitle: ZodString }>, any>[k]
//             }, {
//                 [k_1 in keyof baseObjectInputType<{ CourseTitle: ZodString }>]: baseObjectInputType<{
//                     CourseTitle: ZodString
//                 }>[k_1]
//             }>, "many">>;
//             profUsername: ZodString
//         }>, any>[k]
//     }, {
//         [k_1 in keyof baseObjectInputType<{
//             passwordConfirmation: ZodString;
//             profImage: ZodOptional<ZodEffects<ZodEffects<ZodAny, any, any>, any, any>>;
//             password: ZodString;
//             profEmail: ZodString;
//             profFirstName: ZodString;
//             profLastName: ZodString;
//             coursesTeaching: ZodOptional<ZodArray<ZodObject<{
//                 CourseTitle: ZodString
//             }, "strip", ZodTypeAny, {
//                 [k in keyof objectUtil.addQuestionMarks<baseObjectOutputType<{
//                     CourseTitle: ZodString
//                 }>, any>]: objectUtil.addQuestionMarks<baseObjectOutputType<{ CourseTitle: ZodString }>, any>[k]
//             }, {
//                 [k_1 in keyof baseObjectInputType<{ CourseTitle: ZodString }>]: baseObjectInputType<{
//                     CourseTitle: ZodString
//                 }>[k_1]
//             }>, "many">>;
//             profUsername: ZodString
//         }>]: baseObjectInputType<{
//             passwordConfirmation: ZodString;
//             profImage: ZodOptional<ZodEffects<ZodEffects<ZodAny, any, any>, any, any>>;
//             password: ZodString;
//             profEmail: ZodString;
//             profFirstName: ZodString;
//             profLastName: ZodString;
//             coursesTeaching: ZodOptional<ZodArray<ZodObject<{
//                 CourseTitle: ZodString
//             }, "strip", ZodTypeAny, {
//                 [k in keyof objectUtil.addQuestionMarks<baseObjectOutputType<{
//                     CourseTitle: ZodString
//                 }>, any>]: objectUtil.addQuestionMarks<baseObjectOutputType<{ CourseTitle: ZodString }>, any>[k]
//             }, {
//                 [k_1 in keyof baseObjectInputType<{ CourseTitle: ZodString }>]: baseObjectInputType<{
//                     CourseTitle: ZodString
//                 }>[k_1]
//             }>, "many">>;
//             profUsername: ZodString
//         }>[k_1]
//     }>, {
//         [k in keyof objectUtil.addQuestionMarks<baseObjectOutputType<{
//             passwordConfirmation: ZodString;
//             profImage: ZodOptional<ZodEffects<ZodEffects<ZodAny, any, any>, any, any>>;
//             password: ZodString;
//             profEmail: ZodString;
//             profFirstName: ZodString;
//             profLastName: ZodString;
//             coursesTeaching: ZodOptional<ZodArray<ZodObject<{
//                 CourseTitle: ZodString
//             }, "strip", ZodTypeAny, {
//                 [k in keyof objectUtil.addQuestionMarks<baseObjectOutputType<{
//                     CourseTitle: ZodString
//                 }>, any>]: objectUtil.addQuestionMarks<baseObjectOutputType<{ CourseTitle: ZodString }>, any>[k]
//             }, {
//                 [k_1 in keyof baseObjectInputType<{ CourseTitle: ZodString }>]: baseObjectInputType<{
//                     CourseTitle: ZodString
//                 }>[k_1]
//             }>, "many">>;
//             profUsername: ZodString
//         }>, any>]: objectUtil.addQuestionMarks<baseObjectOutputType<{
//             passwordConfirmation: ZodString;
//             profImage: ZodOptional<ZodEffects<ZodEffects<ZodAny, any, any>, any, any>>;
//             password: ZodString;
//             profEmail: ZodString;
//             profFirstName: ZodString;
//             profLastName: ZodString;
//             coursesTeaching: ZodOptional<ZodArray<ZodObject<{
//                 CourseTitle: ZodString
//             }, "strip", ZodTypeAny, {
//                 [k in keyof objectUtil.addQuestionMarks<baseObjectOutputType<{
//                     CourseTitle: ZodString
//                 }>, any>]: objectUtil.addQuestionMarks<baseObjectOutputType<{ CourseTitle: ZodString }>, any>[k]
//             }, {
//                 [k_1 in keyof baseObjectInputType<{ CourseTitle: ZodString }>]: baseObjectInputType<{
//                     CourseTitle: ZodString
//                 }>[k_1]
//             }>, "many">>;
//             profUsername: ZodString
//         }>, any>[k]
//     }, {
//         [k_1 in keyof baseObjectInputType<{
//             passwordConfirmation: ZodString;
//             profImage: ZodOptional<ZodEffects<ZodEffects<ZodAny, any, any>, any, any>>;
//             password: ZodString;
//             profEmail: ZodString;
//             profFirstName: ZodString;
//             profLastName: ZodString;
//             coursesTeaching: ZodOptional<ZodArray<ZodObject<{
//                 CourseTitle: ZodString
//             }, "strip", ZodTypeAny, {
//                 [k in keyof objectUtil.addQuestionMarks<baseObjectOutputType<{
//                     CourseTitle: ZodString
//                 }>, any>]: objectUtil.addQuestionMarks<baseObjectOutputType<{ CourseTitle: ZodString }>, any>[k]
//             }, {
//                 [k_1 in keyof baseObjectInputType<{ CourseTitle: ZodString }>]: baseObjectInputType<{
//                     CourseTitle: ZodString
//                 }>[k_1]
//             }>, "many">>;
//             profUsername: ZodString
//         }>]: baseObjectInputType<{
//             passwordConfirmation: ZodString;
//             profImage: ZodOptional<ZodEffects<ZodEffects<ZodAny, any, any>, any, any>>;
//             password: ZodString;
//             profEmail: ZodString;
//             profFirstName: ZodString;
//             profLastName: ZodString;
//             coursesTeaching: ZodOptional<ZodArray<ZodObject<{
//                 CourseTitle: ZodString
//             }, "strip", ZodTypeAny, {
//                 [k in keyof objectUtil.addQuestionMarks<baseObjectOutputType<{
//                     CourseTitle: ZodString
//                 }>, any>]: objectUtil.addQuestionMarks<baseObjectOutputType<{ CourseTitle: ZodString }>, any>[k]
//             }, {
//                 [k_1 in keyof baseObjectInputType<{ CourseTitle: ZodString }>]: baseObjectInputType<{
//                     CourseTitle: ZodString
//                 }>[k_1]
//             }>, "many">>;
//             profUsername: ZodString
//         }>[k_1]
//     }>>) => void;
//     updateProf: (Prof : Prof, profId : number) => void;
//     deleteProf: (profId : number) => void;
//     publishProf: (profId : number, publishStatus : boolean) => void;
// }
type Props = { children: React.ReactNode };

export const HOST = "http://localhost:8080"
const EVENT_END_POINT = "http://localhost:8080/prof";


const ProfsContext = createContext<ProfsContextType>({} as ProfsContextType);
export const ProfsProvider  = ({ children } : Props) => {
    const {showToast} = useToastHelper();
    const navigate = useNavigate();
    const [profs, setProfs] = useState<Prof[]>([]);
    const [latestProfs, setLatestProfs] = useState<Prof[]>([]);
    const [prof, setProf] = useState<Prof | null>(null);
    const [totalPages, setTotalPages] = useState<number>(0);

    const fetchLatestProfs = async () => {
        const query = {
            Search: "",
            PageNumber: 1,
            PageSizeDefault: 4,
            PageSizeCustom: 8,
        }
        await AxiosWithoutToken.get<resultArray<Prof>>(EVENT_END_POINT + '/published',{
            params: query
        })
            .then((res) => {
                setLatestProfs(res.data.resultObject);
            }).catch((e) => {
                const ErrorMessage = ErrorHandler(e);
                showToast("Something went wrong!", ErrorMessage);
            });

    };
    const fetchProfsTotalPages = async (itemsPerPage: number, published : boolean) => {
        const ApiURl  = published ? "/pages/published?itemsPerPage=" : "/pages?itemsPerPage=";
        await AxiosWithAuth.get<result<number>>(  EVENT_END_POINT + ApiURl + itemsPerPage)
            .then((res) => {
                setTotalPages(res.data.resultObject);
            }).catch((e) => {
                const ErrorMessage = ErrorHandler(e);
                showToast("Something went wrong!", ErrorMessage);
            });

    };
    const fetchProfs = async (query : Query , published : boolean) => {
        const ApiURl  =  published ? "/published" : "/profs";
        await AxiosWithAuth.get<resultArray<Prof>>(EVENT_END_POINT + ApiURl,
            {
                params: query
            })
            .then((res) => {
                setProfs(res.data.resultObject);
            }).catch((e) => {
                const ErrorMessage = ErrorHandler(e);
                showToast("Something went wrong!", ErrorMessage);
            });

    };
    const fetchProfById = async (id: number) => {
        await AxiosWithAuth.get<result<Prof>>(EVENT_END_POINT + "/" + id)
            .then((res) => {
                setProf(res.data.resultObject);
            }).catch((e) => {
                const ErrorMessage = ErrorHandler(e);
                showToast("Something went wrong!", ErrorMessage);
            });
    };

    const createProf = async (Prof : Prof) => {
        const formData = new FormData();
        formData.append("profFirstName", Prof.profFirstName);
        formData.append("profLastName", Prof.profLastName);
        formData.append("profUsername", Prof.profUsername);
        formData.append("profEmail", Prof.profEmail);
        formData.append("profGroup", Prof.profGroup);
        formData.append("profFiliere", Prof.profFiliere);
        formData.append("profDepartement", Prof.profDepartement);
        // formData.append("seatsCapacity", Prof.seatsCapacity.toString());
        formData.append("profImage", Prof.profImage!);
        // formData.append("coursesTeaching",  JSON.stringify(Prof.coursesTeaching));
        // formData.append("coursesSupervising", JSON.stringify(Prof.coursesSupervising));

        await AxiosWithAuth.post<result<Prof>>(EVENT_END_POINT + "/create", formData,
            { headers: {"Content-Type": 'multipart/form-data'}
            })
            .then((res) => {
                const resultMessage = res.data.resultDescription.loggingMessage;
                showToast("Success", resultMessage);
                navigate("/admin/profs");

            }).catch((e) => {
                const ErrorMessage = ErrorHandler(e);
                showToast("Something went wrong!", ErrorMessage);
            });
    };

    const updateProf = async (Prof : Prof, profId : number) => {
        const formData = new FormData();
        formData.append("profFirstName", Prof.profFirstName);
        formData.append("profLastName", Prof.profLastName);
        formData.append("profUsername", Prof.profUsername);
        formData.append("profEmail", Prof.profEmail);
        formData.append("profGroup", Prof.profGroup);
        formData.append("profFiliere", Prof.profFiliere);
        formData.append("profDepartement", Prof.profDepartement);
        // formData.append("seatsCapacity", Prof.seatsCapacity.toString());
        formData.append("profImage", Prof.profImage!);
        // formData.append("coursesTeaching",  JSON.stringify(Prof.coursesTeaching));
        // formData.append("coursesSupervising", JSON.stringify(Prof.coursesSupervising));

        await AxiosWithAuth.put<result<Prof>>(EVENT_END_POINT + "/update/" + profId, formData,
            { headers: {"Content-Type": 'multipart/form-data'}
            })
            .then((res) => {
                const resultMessage = res.data.resultDescription.loggingMessage;
                showToast("Success", resultMessage);
                navigate("/admin/profs");

            }).catch((e) => {
                const ErrorMessage = ErrorHandler(e);
                showToast("Something went wrong!", ErrorMessage);
            });
    };

    const deleteProf = async (profId : number) => {

        await AxiosWithAuth.delete<result<Prof>>(EVENT_END_POINT + "/delete/" + profId)
            .then((res) => {
                const resultMessage = res.data.resultDescription.loggingMessage;
                showToast("Success", resultMessage);
                navigate("/admin/profs");

            }).catch((e) => {
                const ErrorMessage = ErrorHandler(e);
                showToast("Something went wrong!", ErrorMessage);
            });
    };

    const publishProf = async (profId : number, publishStatus : boolean) => {

        await AxiosWithAuth.put<result<Prof>>(EVENT_END_POINT + "/publish/" + profId + "/" + publishStatus)
            .then((res) => {
                const resultMessage = res.data.resultDescription.loggingMessage;
                showToast("Success", resultMessage);
            }).catch((e) => {
                const ErrorMessage = ErrorHandler(e);
                showToast("Something went wrong!", ErrorMessage);
            });
    };

    return (
        <ProfsContext.Provider value={{
            createProf,
            deleteProf,
            fetchLatestProfs,
            fetchProfById,
            fetchProfs,
            fetchProfsTotalPages,
            latestProfs,
            prof,
            profs,
            publishProf,
            totalPages,
            updateProf
        }}>
            {children}
        </ProfsContext.Provider>
    );


};
export const useProfs = () : ProfsContextType => React.useContext(ProfsContext);