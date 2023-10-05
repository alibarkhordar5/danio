// general imports
import { useState, useCallback, useEffect } from 'react';
// @mui
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
// custom components
import { useSettingsContext } from 'src/components/settings';
import Iconify from 'src/components/iconify/iconify';
import ClassGeneral from './class-general';
import ClassStudents from './class-students';
import ClassHomework from './class-homework';
import ClassSkills from './class-skills';
import { useParams } from 'src/routes/hook';
import { Box, alpha } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { useLocation } from 'react-router';
// ----------------------------------------------------------------------

const TABS = [
    {
        value: 'homework',
        label: 'تکالیف',
        icon: <Iconify icon="solar:pen-new-square-line-duotone" width={24} />,
    },
    {
        value: 'students',
        label: 'دفترمعلم',
        icon: <Iconify icon="solar:user-id-line-duotone" width={24} />,
    },
    {
        value: 'general',
        label: 'عملکرد',
        icon: <Iconify icon="solar:graph-up-line-duotone" width={24} />,
    },
    {
        value: 'skills',
        label: 'محتوای کتاب',
        icon: <Iconify icon="solar:notebook-line-duotone" width={24} />,
    },
];

// ----------------------------------------------------------------------

export default function ClassView() {
    const cache = {};
    const settings = useSettingsContext();

    const { id } = useParams();
    const theme = useTheme();

    const {
        state: { name, school_name, grade },
    } = useLocation();

    const [currentTab, setCurrentTab] = useState('homework');

    const handleChangeTab = useCallback((event, newValue) => {
        setCurrentTab(newValue);
    }, []);

    return (
        <Container maxWidth={settings.themeStretch ? false : 'xl'}>
            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    margin: 2,
                }}
            >
                <Typography variant="h4" sx={{ ml: -1, mr: 2 }}>
                    کلاس {name}
                </Typography>

                <Typography sx={{ mx: 2 }}>مدرسه {school_name}</Typography>

                <Typography sx={{ mx: 2 }}>پایه {grade}</Typography>
            </Box>

            <Tabs
                value={currentTab}
                onChange={handleChangeTab}
                sx={{
                    mb: { xs: 3, md: 5 },
                    display: { xs: 'none', md: 'block' },
                }}
            >
                {TABS.map((tab) => (
                    <Tab key={tab.value} label={tab.label} icon={tab.icon} value={tab.value} />
                ))}
            </Tabs>
            <Box
                sx={{
                    justifyContent: 'space-between',
                    position: 'sticky',
                    top: '0',
                    zIndex: '1',
                    padding: '15px 3px',
                    width: '100%',
                    background: 'white',
                    borderBottom: `1px solid lightgray`,
                    display: { xs: 'flex', md: 'none' },
                }}
            >
                {TABS.map((tab) => {
                    return (
                        <>
                            <Iconify icon={tab.icon} width={24} />
                            <Box
                                onClick={() => setCurrentTab(tab.value)}
                                sx={{
                                    border:
                                        currentTab === tab.value
                                            ? `1px solid ${alpha(theme.palette.primary.light, 1)}`
                                            : null,
                                    padding: '0px 5px',
                                    borderRadius: '10px',
                                }}
                                key={tab.value}
                            >
                                {tab.label}
                            </Box>
                        </>
                    );
                })}
            </Box>

            {currentTab === 'general' && <ClassGeneral />}
            {currentTab === 'students' && <ClassStudents cache={cache} classId={id} />}
            {currentTab === 'homework' && <ClassHomework cache={cache} classId={id} grade={grade} />}
            {currentTab === 'skills' && <ClassSkills cache={cache} classId={id} />}
        </Container>
    );
}
