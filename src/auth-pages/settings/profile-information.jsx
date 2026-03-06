import React, { useState } from 'react'
import { Label } from '../../components/ui/label'
import { Input } from '../../components/ui/input'

const ProfileInformation = ({ profile }) => {

    console.log(profile)

    const [fullname, setFullname] = useState(profile && profile?.fullname ? profile?.fullname : '');
    const [email, setEmail] = useState(profile && profile?.email ? profile?.email : '');
    const [role, setRole] = useState(profile && profile?.role ? profile?.role : '');
    const [directorate, setDirectorate] = useState(profile && profile?.directorate ? profile?.directorate : '');
    const [unit, setUnit] = useState(profile && profile?.unit ? profile?.unit : '');
    const [office_location, setOffice_location] = useState(profile && profile?.office_location ? profile?.office_location : '')

    return (
        <form className='w-full grid gap-4'>
            <div className="grid w-full gap-3">
                <Label htmlFor="title-1">Full name</Label>
                <Input 
                    value={fullname}
                    placeholder="Enter full name..."
                    onChange={(e) => setFullname(e.target.value)} // Updates the state on selection
                    readOnly
                    className="w-full"
                />
            </div>
            <div className="grid gap-3 w-full">
                <Label htmlFor="title-1">Email</Label>
                <Input 
                    type="email"
                    value={email}
                    placeholder="Enter email..."
                    onChange={(e) => setEmail(e.target.value)} // Updates the state on selection
                    readOnly
                    className="w-full"
                />
            </div>
            <div className="grid w-full gap-3">
                <Label htmlFor="title-1">Role</Label>
                <Input 
                    value={role}
                    placeholder="Enter phone..."
                    onChange={(e) => setRole(e.target.value)} // Updates the state on selection
                    readOnly
                    className="w-full"
                />
            </div>
            <div className="grid gap-3 w-full">
                <Label htmlFor="title-1">Directorate</Label>
                <Input 
                    type="email"
                    value={directorate}
                    placeholder="Enter directorate..."
                    onChange={(e) => setDirectorate(e.target.value)} // Updates the state on selection
                    readOnly
                    className="w-full"
                />
            </div>
            <div className="grid w-full gap-3">
                <Label htmlFor="title-1">Unit</Label>
                <Input 
                    value={unit}
                    placeholder="Enter state..."
                    onChange={(e) => setUnit(e.target.value)} // Updates the state on selection
                    readOnly
                    className="w-full"
                />
            </div>
            <div className="grid w-full gap-3">
                <Label htmlFor="title-1">Office location</Label>
                <Input 
                    value={office_location}
                    placeholder="Enter state..."
                    onChange={(e) => setOffice_location(e.target.value)} // Updates the state on selection
                    readOnly
                    className="w-full"
                />
            </div>
        </form>
    )
}

export default ProfileInformation