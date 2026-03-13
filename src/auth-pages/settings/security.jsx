import React, { useContext, useEffect, useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "../../components/ui/card";
import ProfileInformation from './profile-information';
import { AppContext } from '../../context/AppContext';
import PasswordUpdate from './password-update';
import { fetchUserRole } from '../../utils/roles';
import SkeletonComponent from '../../components/skeleton-component';
import OfficeLocationUpdate from './office-location-update';
import { Alert, AlertTitle } from '../../components/ui/alert';
import { InfoIcon } from 'lucide-react';

const Security = () => {

    const { token } = useContext(AppContext);
    const [role, setRole] = useState();
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchUserRole(token, setRole, setError, setLoading)
    }, [])

    return (
        <div className='w-full mt-4 space-y-4'>
            <div className='w-full hidden justify-between items-center'>
                <span className='text-xl font-extralight'>Security</span>
            </div>
            <div className='w-full grid md:grid-cols-2 gap-4'>
                <div className='col-span-1'>
                    <Card>
                        <CardHeader>
                            <CardTitle>Profile information</CardTitle>
                            <CardDescription>
                            Below is your profile information
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                        {
                            loading || !role ?
                                <SkeletonComponent /> : 
                                <ProfileInformation profile={role} />
                        }
                        </CardContent>
                    </Card>
                </div>
                <div className='grid gap-4 col-span-1'>
                    <Card>
                        <CardHeader>
                            <CardTitle>Update office location</CardTitle>
                            <CardDescription>
                            Select your office to update your profile
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            <Alert className="flex items-center w-full md:max-w-max border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-50">
                                <InfoIcon size={16} />
                                <AlertTitle className="leading-relaxed">Ensure you update your office location so as to effectively use the attendance feature!</AlertTitle>
                            </Alert>
                            <OfficeLocationUpdate />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Password update</CardTitle>
                            <CardDescription>
                            Secure your account
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <PasswordUpdate />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default Security