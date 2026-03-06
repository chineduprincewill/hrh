import React, { useContext, useState } from 'react'
import { Label } from '../../../components/ui/label';
import { RadioGroup, RadioGroupItem } from '../../../components/ui/radio-group'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { AtSign, CalendarDays, ClockArrowDown, ClockArrowUp, InfoIcon, Send } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Alert, AlertTitle } from '../../../components/ui/alert'
import { Textarea } from '../../../components/ui/textarea';
import { AppContext } from '../../../context/AppContext';
import { toast } from 'sonner';
import { Spinner } from '../../../components/ui/spinner';
import { updateFormdata } from '../../../utils/forms';

const AttendanceForm = ({ formid, uniqueid, setActive, editinfo }) => {

    const { token, user, refreshRecord } = useContext(AppContext);
    const [attended, setAttended] = useState(editinfo && editinfo?.attended);
    const [in_date, setIn_date] = useState(editinfo ? editinfo?.in_date : new Date().toDateString());
    const [in_time, setIn_time] = useState(editinfo && editinfo?.in_time);
    const [out_time, setOut_time] = useState(editinfo && editinfo?.out_time);
    const [out_reason, setOut_reason] = useState(editinfo && editinfo?.out_reason);
    const [success, setSuccess] = useState();
    const [error, setError] = useState();
    const [updating, setUpdating] = useState(false);
    const formdata = {};
    const userdata = JSON.parse(user);

    const setClockinDetail = () => {
        //setIn_date(new Date().toDateString());
        editinfo ? 
        setOut_time(new Date().toTimeString().split(' ')[0])
        :
        setIn_time(new Date().toTimeString().split(' ')[0]);
    }

    const submitAttendance = () => {
        formdata.email = userdata?.email;
        formdata.fullname = userdata?.fullname;
        formdata.attended = attended;
        formdata.in_date = in_date;
        formdata.in_time = in_time ?? '';
        formdata.out_time = out_time ?? '';
        formdata.out_reason = out_reason ?? '';

        const data = {
            formdata,
            uid:editinfo ? editinfo?.uid : uniqueid,
            formid
        }

        if(editinfo){
            data.id = editinfo?.id
        }
        //editinfo ? console.log(data) :
        updateFormdata(token, data, setSuccess, setError, setUpdating);
    }

    if(success){
        toast.success("Entry updated successfully!", {
            className: "!bg-green-700 !text-white !border-white !font-bold",
            descriptionClassName: "!text-green-700",
        });
        refreshRecord(Date.now());
        setSuccess();
        //setFormdata({});
        setActive('records');
    }

    if(error){
        toast.error(JSON.stringify(error), {
                className: "!bg-red-700 !text-white !border-white !font-bold",
                descriptionClassName: "!text-red-700",
            });
    }

    return (
        <div className='w-full grid gap-4'>
            <Card className='w-full'>
                <CardHeader>
                    <CardTitle>Attendance form</CardTitle>
                    <CardDescription>Fill your daily attendance form</CardDescription>
                </CardHeader>
                <CardContent>
                    <RadioGroup 
                        defaultValue={attended} 
                        className='flex items-center gap-12'
                        onValueChange={setAttended}
                    >
                        <div className="flex items-center gap-3">
                            <RadioGroupItem 
                                value="Yes" 
                                id="r1" 
                                disabled={editinfo}  // true when editinfo is truthy
                                className={editinfo ? "opacity-20 cursor-not-allowed" : ""}
                            />
                            <Label htmlFor="r1" className={editinfo ? "opacity-20" : ""}>
                                In Office
                            </Label>
                        </div>
                        <div className="flex items-center gap-3">
                            <RadioGroupItem 
                                value="No" 
                                id="r2" 
                                disabled={editinfo}
                                className={editinfo ? "opacity-20 cursor-not-allowed" : ""}
                            />
                            <Label htmlFor="r2" className={editinfo ? "opacity-20" : ""}>
                                Out of Office
                            </Label>
                        </div>
                    </RadioGroup>
                </CardContent>
            </Card>
        {
            attended === 'Yes' &&
                <Card className='w-full'>
                    <CardHeader>
                        <CardTitle>{editinfo ? 'Clock Out' : 'Clock In'}</CardTitle>
                        <CardDescription>Click the clock icon to {editinfo ? 'clock out' : 'clock in'}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className='w-full grid md:grid-cols-3 gap-4 mt-2'>
                            <div className='md:cols-span-1 flex items-center justify-center'>
                            {
                                editinfo ?
                                <ClockArrowDown 
                                    size={192} 
                                    className={`text-foreground/70 hover:text-foreground/90 ${out_time ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                                    onClick={() => !out_time && setClockinDetail()}
                                /> :
                                <ClockArrowUp 
                                    size={192} 
                                    className={`text-foreground/70 hover:text-foreground/90 ${in_time ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                                    onClick={() => !in_time && setClockinDetail()}
                                />
                            }
                            </div>
                            <div className='md:col-span-2'>
                            {
                                editinfo ?
                                (out_time && 
                                    <div className='grid gap-4'>
                                        <span>You clocked out of office</span>
                                        <div className='flex items-baseline gap-4'>
                                            <CalendarDays size={16} />
                                            <span className='text-4xl font-extralight'>{in_date}</span>
                                        </div>
                                        <div className='flex items-baseline gap-4'>
                                            <AtSign size={16} />
                                            <span className='text-4xl font-extralight'>{out_time}</span>
                                        </div>
                                        <Alert className="flex items-baseline w-full md:max-w-max border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-50">
                                            <InfoIcon size={16} />
                                            <AlertTitle className="mt-1">Click send button below to submit</AlertTitle>
                                        </Alert>
                                        <Button 
                                            className={`w-full md:w-1/4 ${editinfo?.out_time && 'opacity-20'}`}
                                            onClick={() => !editinfo?.out_time && submitAttendance()}
                                            disabled={editinfo?.out_time}
                                        >
                                        {
                                            updating ?
                                            <Spinner className="size-4" /> :
                                            <Send size={16} />
                                        }
                                        </Button>
                                    </div>)
                                :
                                (in_time && 
                                <div className='grid gap-4'>
                                    <span>You clocked into office</span>
                                    <div className='flex items-baseline gap-4'>
                                        <CalendarDays size={16} />
                                        <span className='text-4xl font-extralight'>{in_date}</span>
                                    </div>
                                    <div className='flex items-baseline gap-4'>
                                        <AtSign size={16} />
                                        <span className='text-4xl font-extralight'>{in_time}</span>
                                    </div>
                                    <Alert className="flex items-baseline w-full md:max-w-max border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-50">
                                        <InfoIcon size={16} />
                                        <AlertTitle className="mt-1">Click send button below to submit</AlertTitle>
                                    </Alert>
                                    <Button 
                                        className='w-full md:w-1/4'
                                        onClick={() => submitAttendance()}
                                    >
                                    {
                                        updating ?
                                        <Spinner className="size-4" /> :
                                        <Send size={16} />
                                    }
                                    </Button>
                                </div>)
                            }
                            </div>
                        </div>
                    </CardContent>
                </Card>
        }
        {
            attended === 'No' &&
                <Card className='w-full'>
                    <CardHeader>
                        <CardTitle>Not in Office?</CardTitle>
                        <CardDescription>State reason for not being in office</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className='w-full grid gap-4 mt-2'>
                            <Textarea 
                                value={out_reason ?? ''}
                                placeholder="Reason for absence"
                                className="min-h-24"
                                onChange={(e) => setOut_reason(e.target.value)}
                                readOnly={out_reason}
                            />
                            <Button 
                                className={`w-full md:w-1/4 ${editinfo?.out_reason && 'opacity-20'}`}
                                onClick={() => !editinfo?.out_reason && submitAttendance()}
                                disabled={editinfo?.out_reason}
                            >
                            {
                                updating ?
                                <Spinner className="size-4" /> :
                                <Send size={16} />
                            }
                            </Button>
                        </div>
                    </CardContent>
                </Card>
        }  
        </div>
    )
}

export default AttendanceForm