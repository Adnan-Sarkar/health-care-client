import {Chip, FormControl, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent} from "@mui/material";
import Box from "@mui/material/Box";
import {generateTimeIn12HourFormat} from "@/utils/generateTimeIn12HourFormat";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};


const DoctorMultipleScheduleSelectField = ({
                                               schedules,
                                               selectedScheduleIds,
                                               setSelectedScheduleIds,
                                           }: any) => {
    const handleChange = (
        event: SelectChangeEvent<typeof selectedScheduleIds>
    ) => {
        const {
            target: {value},
        } = event;
        setSelectedScheduleIds(
            typeof value === 'string' ? value.split(',') : value
        );
    };

    return (
        <div>
            <FormControl sx={{width: 300}}>
                <InputLabel id='demo-multiple-chip-label'>Schedules</InputLabel>
                <Select
                    labelId='demo-multiple-chip-label'
                    id='demo-multiple-chip'
                    multiple
                    value={selectedScheduleIds}
                    fullWidth={true}
                    onChange={handleChange}
                    input={<OutlinedInput id='select-multiple-chip' label='Chip'/>}
                    renderValue={(selected) => {
                        return (
                            <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                                {selected.map((scheduleId: string) => {
                                    const selectedSchedule = schedules.find((schedule: any) => schedule.id === scheduleId);
                                    if (!selectedSchedule) return null;

                                    const formattedTimeSlot = `${generateTimeIn12HourFormat(selectedSchedule.startDate)} - ${generateTimeIn12HourFormat(selectedSchedule.endDate)}`

                                    return <Chip key={scheduleId} label={formattedTimeSlot}/>
                                })}
                            </Box>
                        );
                    }}
                    MenuProps={MenuProps}
                >
                    {schedules && schedules.map((schedule: any) => {
                        return <MenuItem key={schedule.id}
                                         value={schedule.id}>{`${generateTimeIn12HourFormat(schedule.startDate)} - ${generateTimeIn12HourFormat(schedule.endDate)}`}</MenuItem>
                    })}
                </Select>
            </FormControl>
        </div>
    );
};

export default DoctorMultipleScheduleSelectField;