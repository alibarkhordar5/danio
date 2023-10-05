// general imports
import { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// cutom hooks
import useInnerWidth from 'src/hooks/use-inner-width';
// custom components
import axios, { endpoints } from 'src/utils/axios';
import { useSnackbar } from 'src/components/snackbar';
import { parse, addYears, toDate } from 'date-fns';
import jalaliMoment from 'jalali-moment';
//
import SmallView from './small-view';
import LargeView from './large-view';
import Content from './content';
import moment from 'jalali-moment';
import GetEnglishNumber from 'src/utils/get-english-number';
import { Box } from '@mui/system';

const DateFormatter = (date) => {
    moment.locale('en');
    const res = moment.from(date, 'fa', 'YYYY-MM-DD').format();
    return res;
};

const toggleSectionIsSelectedByName = (setIsSelected) => (name) =>
    setIsSelected((prev) => {
        const currentState = prev[name].isSelected;
        const section = { ...prev[name], children: { ...prev[name].children } };
        section.isSelected = !currentState;
        for (let key in prev[name].children) {
            section.children[key] = !currentState;
        }
        return { ...prev, [name]: section };
    });

const toggleSkillIsSelectedByKey = (setIsSelected) => (key) =>
    setIsSelected((prev) => {
        for (let name in prev) {
            if (key in prev[name].children) {
                const newChildren = { ...prev[name].children, [key]: !prev[name].children[key] };
                let allChildrenTrue = !prev[name].children[key];
                for (let skillKey in prev[name].children) {
                    if (skillKey !== key && !prev[name].children[skillKey]) {
                        allChildrenTrue = false;
                        break;
                    }
                }
                const newSection = {
                    isSelected: allChildrenTrue,
                    children: newChildren,
                };
                return { ...prev, [name]: newSection };
            }
        }
    });

const ModifyHomework = ({
    classId,
    open,
    setOpen,
    isEdit = false,
    homeworkId,
    setHomeWorks,
    grade,
    setBriefHomeworkData,
    setHomeworkSkills,
    setUnExtendEndDate,
    cache,
}) => {
    const { enqueueSnackbar } = useSnackbar();

    const NewHomeworkSchema = Yup.object().shape({
        startPage: Yup.number().required('لطفاً صفحه شروع را وارد کنید'),
        endPage: Yup.number().required('لطفاً صفحه پایان را وارد کنید'),
        startDate: Yup.string().required('لطفاً تاریخ شروع را وارد کنید'),
        endDate: Yup.string().required('لطفاً تاریخ پایان را وارد کنید'),
    });

    const methods = useForm({
        resolver: yupResolver(NewHomeworkSchema),
        defaultValues: {
            startPage: 1,
            endPage: 2,
            startDate: new Date().toLocaleDateString('fa-IR'),
            endDate: new Date().toLocaleDateString('fa-IR'),
        },
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = methods;

    const [pages, setPages] = useState({ startPage: null, endPage: null });
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [groupedSkills, setGroupedSkills] = useState({});
    const [isSelected, setIsSelected] = useState({});

    // console.log('isSelected', isSelected);

    useEffect(() => {
        if (pages.startPage && pages.endPage) {
            axios
                .get(endpoints.teacher.get_skills_by_page(pages.startPage, pages.endPage, grade))
                .then((response) => {
                    const newGroupedSkills = response.data.reduce((acc, obj) => {
                        const key = obj.category_name;
                        if (!acc[key]) {
                            acc[key] = [];
                        }
                        acc[key].push(obj);
                        return acc;
                    }, {});
                    setGroupedSkills(newGroupedSkills);

                    const newIsSelected = {};
                    for (let key in newGroupedSkills) {
                        const children = {};
                        for (let i = 0; i < newGroupedSkills[key].length; i++) {
                            children[newGroupedSkills[key][i].key] = true;
                        }
                        newIsSelected[key] = {
                            isSelected: true,
                            children: children,
                        };
                    }
                    setIsSelected(newIsSelected);
                })
                .catch((error) => {
                    enqueueSnackbar(error.detail || error.message || 'خطا در دریافت اطلاعات', { variant: 'error' });
                });
        }
    }, [pages, isEdit]);

    useEffect(() => {
        if (isEdit) {
            axios
                .get(endpoints.teacher.get_homework_detail(homeworkId))
                .then((response) => {
                    const data = response.data;
                    setStartDate(DateFormatter(data.start_date));
                    setEndDate(DateFormatter(data.end_date));
                    const selected_skills = data.skills;
                    setPages({ startPage: data.first_page, endPage: data.last_page });
                    axios
                        .get(endpoints.teacher.get_skills_by_page(data.first_page, data.last_page, grade))
                        .then((response) => {
                            const newGroupedSkills = selected_skills.reduce((acc, obj) => {
                                const key = obj.category_name;
                                if (!acc[key]) {
                                    acc[key] = [];
                                }
                                acc[key].push(obj);
                                return acc;
                            }, {});

                            setGroupedSkills(newGroupedSkills);

                            const newIsSelected = {};
                            for (let key in newGroupedSkills) {
                                const children = {};
                                for (let i = 0; i < newGroupedSkills[key].length; i++) {
                                    children[newGroupedSkills[key][i].key] = newGroupedSkills[key][i].is_active;
                                }
                                newIsSelected[key] = {
                                    isSelected: true,
                                    children: children,
                                };
                                for (let j = 0; j < Object.keys(newIsSelected[key].children).length; j++) {
                                    for (let value in newIsSelected[key].children) {
                                        if (newIsSelected[key].children[value] === false) {
                                            newIsSelected[key].isSelected = false;
                                        }
                                    }
                                }
                            }
                            setIsSelected(newIsSelected);
                        })
                        .catch((error) => {
                            enqueueSnackbar(error.detail || error.message || 'خطا در دریافت اطلاعات', {
                                variant: 'error',
                            });
                        });
                })
                .catch((error) => {
                    // enqueueSnackbar(error.detail || error.message || 'خطا در دریافت اطلاعات', { variant: 'error' });
                });
        }
    }, [isEdit]);

    const onSubmit = handleSubmit((data) => {
        if (!isEdit) {
            const url = endpoints.teacher.post_new_homework(pages.startPage, pages.endPage, grade);

            const skills = [];
            for (let categoryName in isSelected) {
                for (let key in isSelected[categoryName].children) {
                    if (isSelected[categoryName].children[key]) {
                        skills.push(key);
                    }
                }
            }

            const ConvertToServerFormat = (date) => {
                const split_date = new Date(date).toLocaleDateString('fa-IR').replaceAll('/', '-').split('-');
                return `${split_date[0]}-${split_date[1].length === 1 ? '0' + split_date[1] : split_date[1]}-${
                    split_date[2].length === 1 ? '0' + split_date[2] : split_date[2]
                }`;
            };

            const dataSent = {
                class_id: parseInt(classId),
                skills: skills,
                start_date: GetEnglishNumber(ConvertToServerFormat(startDate)),
                end_date: GetEnglishNumber(ConvertToServerFormat(endDate)),
                icon: `/assets/images/homework/${Math.floor(Math.random() * 5) + 1}.gif`,
            };

            axios
                .post(url, dataSent)
                .then((response) => {
                    if (response.data.message === 'Done') {
                        enqueueSnackbar('تکلیف با موفقیت ساخته شد', { variant: 'success' });
                        axios
                            .get(endpoints.teacher.get_homeworks_by_class(classId))
                            .then((response) => {
                                const homeworks = response;
                                if (setHomeWorks) {
                                    setHomeWorks({
                                        current: homeworks.data.current_homeworks,
                                        other: homeworks.data.other_homeworks,
                                    });
                                }
                            })
                            .catch((error) => {
                                enqueueSnackbar(error.detail || error.message || 'خطا در دریافت اطلاعات', {
                                    variant: 'error',
                                });
                            });
                    }
                })
                .catch((error) => {
                    enqueueSnackbar(error.detail || error.message || 'خطا در ارسال اطلاعات', { variant: 'error' });
                })
                .finally(() => setOpen(false));
        } else {
            const url = endpoints.teacher.edit_homework(homeworkId, pages.startPage, pages.endPage);

            const skills = [];
            for (let categoryName in isSelected) {
                for (let key in isSelected[categoryName].children) {
                    if (isSelected[categoryName].children[key]) {
                        skills.push(key);
                    }
                }
            }

            const dataSent = {
                class_id: parseInt(classId),
                skills: skills,
                start_date: GetEnglishNumber(new Date(startDate).toLocaleDateString('fa-IR').replaceAll('/', '-')),
                end_date: GetEnglishNumber(new Date(endDate).toLocaleDateString('fa-IR').replaceAll('/', '-')),
                icon: `/assets/images/homework/${Math.floor(Math.random() * 5) + 1}.gif`,
            };

            axios
                .put(url, dataSent)
                .then((response) => {
                    if (response.data.message === 'Done') {
                        enqueueSnackbar('تکلیف با موفقیت ویرایش شد', { variant: 'success' });
                        Promise.all([axios.get(endpoints.teacher.get_class_by_homework(homeworkId))])
                            .then((response) => {
                                const class_data = response[0].data;
                                setBriefHomeworkData(class_data);
                                setUnExtendEndDate(class_data.end_date);
                            })
                            .catch((error) => {
                                enqueueSnackbar(error.detail || error.message || 'خطا در دریافت اطلاعات', {
                                    variant: 'error',
                                });
                            });

                        if (!cache['skills']) {
                            Promise.all([axios.get(endpoints.teacher.get_class_homework_skills(homeworkId))])
                                .then((response) => {
                                    const skills = response[0].data;
                                    setHomeworkSkills(skills || []);
                                    cache.skills = skills;
                                })
                                .catch((err) => {
                                    enqueueSnackbar(err.detail || err.message || 'خطا در دریافت اطلاعات', {
                                        variant: 'error',
                                    });
                                });
                        } else {
                            setHomeworkSkills(cache.skills);
                        }
                    }
                })
                .catch((error) => {
                    enqueueSnackbar(error.detail || error.message || 'خطا در ارسال اطلاعات', { variant: 'error' });
                })
                .finally(() => setOpen(false));
        }
    });

    const innerWidth = useInnerWidth();

    const modifiedSetOpen = (newOpen) => {
        setPages({ startPage: null, endPage: null });
        setStartDate(new Date());
        setEndDate(new Date());
        setGroupedSkills({});
        setIsSelected({});
        setOpen(newOpen);
    };

    return (
        <Box display={open ? 'block' : 'none'}>
            {innerWidth < 768 ? (
                <SmallView open={open} setOpen={setOpen} methods={methods} onSubmit={onSubmit} isEdit={isEdit}>
                    <Content
                        pages={pages}
                        groupedSkills={groupedSkills}
                        isSelected={isSelected}
                        setPages={setPages}
                        startDate={startDate}
                        setStartDate={setStartDate}
                        endDate={endDate}
                        setEndDate={setEndDate}
                        toggleSection={toggleSectionIsSelectedByName(setIsSelected)}
                        toggleSkill={toggleSkillIsSelectedByKey(setIsSelected)}
                    />
                </SmallView>
            ) : (
                <LargeView open={open} setOpen={setOpen} methods={methods} onSubmit={onSubmit} isEdit={isEdit}>
                    <Content
                        pages={pages}
                        groupedSkills={groupedSkills}
                        isSelected={isSelected}
                        setPages={setPages}
                        startDate={startDate}
                        setStartDate={setStartDate}
                        endDate={endDate}
                        setEndDate={setEndDate}
                        toggleSection={toggleSectionIsSelectedByName(setIsSelected)}
                        toggleSkill={toggleSkillIsSelectedByKey(setIsSelected)}
                        isEdit={isEdit}
                    />
                </LargeView>
            )}
        </Box>
    );
};

export default ModifyHomework;
