// @mui
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

// components
import { useSettingsContext } from 'src/components/settings';
import axios, { endpoints } from 'src/utils/axios';

import { useState, useEffect } from 'react';
import Link from '@mui/material/Link';

import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------

export default function SkillsView() {
    const settings = useSettingsContext();

    const [skillsData, setSkillsData] = useState({});

    const [myClasses, setMyClasses] = useState([]);
    const [selectedClass, setSelectedClass] = useState(null);

    useEffect(() => {
        axios
            .get(endpoints.teacher.get_classes_list)
            .then((response) => {
                setMyClasses(response.data);
                console.log(response.data);
                setSelectedClass(response.data[0]);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        if (selectedClass) {
            axios
                .get(endpoints.teacher.get_skills_by_class(selectedClass.id))
                .then((response) => {
                    setSkillsData(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [selectedClass]);

    const buttons = [];

    for (let i = 0; i < myClasses.length; i++) {
        buttons.push(
            <Button
                onClick={() => {
                    setSelectedClass(myClasses[i]);
                }}
            >
                {myClasses[i].name}
            </Button>
        );
    }

    return (
        <Container maxWidth={settings.themeStretch ? false : 'xl'} sx={{ mx: 5 }}>
            <>{buttons}</>

            <br />

            <Typography
                variant="h4"
                sx={{
                    my: 2,
                }}
            >
                مهارت
            </Typography>

            <br />

            {skillsData.name && (
                <Typography
                    variant="h4"
                    sx={{
                        my: 2,
                    }}
                >
                    {skillsData.name}
                </Typography>
            )}

            {skillsData.class_id && (
                <>
                    <Typography
                        variant="h4"
                        sx={{
                            my: 2,
                        }}
                    >
                        {skillsData.class_id}
                    </Typography>

                    <br />
                </>
            )}

            {skillsData.categories &&
                skillsData.categories.map((category) => (
                    <>
                        <Typography
                            variant="h4"
                            sx={{
                                my: 2,
                                color: 'red',
                            }}
                        >
                            {category.name}
                        </Typography>

                        {category.children.map((subject) => (
                            <>
                                <Typography
                                    variant="h5"
                                    sx={{
                                        my: 2,
                                        color: 'blue',
                                    }}
                                >
                                    {subject.name}
                                </Typography>

                                {subject.children.map((skill) => (
                                    <Link href={paths.teacher.skillQuestion(skill.key)}>
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                my: 2,
                                            }}
                                        >
                                            {skill.name}
                                        </Typography>
                                    </Link>
                                ))}

                                <br />
                            </>
                        ))}

                        <br />
                    </>
                ))}
        </Container>
    );
}
