// @mui
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Card, CardHeader, Divider, CardContent, Stack, ListItemText, TextField, Switch } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// custom components
import { toFarsiNumber } from 'src/utils/format-number-persian';
import GetEnglishNumber from 'src/utils/get-english-number';

function RenderSectionCard({ section, skills, isSelected, toggleSection, toggleSkill }) {
    return (
        <Card>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <CardHeader title={section} />
                {isSelected && (
                    <Switch
                        sx={{ mt: 'auto' }}
                        checked={isSelected.isSelected}
                        onClick={() => toggleSection(section)}
                    />
                )}
            </Box>
            <Divider sx={{ m: 3, borderStyle: 'dashed' }} />
            <CardContent sx={{ pt: 0 }}>
                {skills &&
                    skills.map((skill, index) => (
                        <Stack direction="row" alignItems="center" justifyContent="space-between" key={index} my={2}>
                            <ListItemText
                                primary={`${toFarsiNumber(index + 1)}. ${skill.name}`}
                                primaryTypographyProps={{
                                    noWrap: true,
                                    typography: 'subtitle2',
                                }}
                            />
                            {isSelected && (
                                <Switch
                                    checked={isSelected.children[skill.key]}
                                    onClick={() => toggleSkill(skill.key)}
                                />
                            )}
                        </Stack>
                    ))}
            </CardContent>
        </Card>
    );
}

export default function Content({
    groupedSkills,
    isSelected,
    setPages,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    pages,
    ...props
}) {
    const sectionCards = [];

    for (let key in groupedSkills) {
        sectionCards.push(
            <Grid item xs={12}>
                <RenderSectionCard section={key} skills={groupedSkills[key]} isSelected={isSelected[key]} {...props} />
            </Grid>
        );
    }

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 2 }}>
                <TextField
                    value={pages?.startPage || ''}
                    focused={pages?.startPage ? true : false}
                    width="30%"
                    name="startPage"
                    label="صفحه شروع"
                    variant="outlined"
                    type="int"
                    onChange={(event) =>
                        setPages((prev) => {
                            return { ...prev, startPage: Number(event.target.value) };
                        })
                    }
                    inputProps={{
                        style: {
                            fontFamily: 'PersianNumber',
                        },
                    }}
                />
                <TextField
                    width="30%"
                    value={pages.endPage || ''}
                    focused={pages.endPage ? true : false}
                    name="endPage"
                    label="صفحه پایان"
                    variant="outlined"
                    type="int"
                    onChange={(event) =>
                        setPages((prev) => {
                            return { ...prev, endPage: Number(event.target.value) };
                        })
                    }
                    inputProps={{
                        style: {
                            fontFamily: 'PersianNumber',
                        },
                    }}
                />
            </Box>
            <Grid container spacing={2} sx={{ my: 4 }}>
                {sectionCards}
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'space-around', mb: 4 }}>
                <Box width="35%">
                    <DatePicker
                        label="تاریخ شروع"
                        value={startDate}
                        onChange={(newValue) => {
                            setStartDate(newValue);
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                name="startDate"
                                variant="outlined"
                                type="int"
                                fullWidth
                                value={new Date(startDate).toLocaleDateString('fa-IR')}
                                inputProps={{
                                    style: {
                                        fontFamily: 'PersianNumber',
                                    },
                                }}
                            />
                        )}
                    />
                </Box>
                <Box width="35%">
                    <DatePicker
                        label="تاریخ پایان"
                        onChange={(newValue) => setEndDate(newValue)}
                        value={endDate}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                name="endDate"
                                variant="outlined"
                                type="int"
                                fullWidth
                                value={new Date(endDate).toLocaleDateString('fa-IR')}
                                inputProps={{
                                    style: {
                                        fontFamily: 'PersianNumber',
                                    },
                                }}
                            />
                        )}
                    />
                </Box>
            </Box>
        </Box>
    );
}
