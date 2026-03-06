import React, { useContext, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { directorates } from '../../lib/data'
import { AppContext } from '../../context/AppContext'
import { Spinner } from '@/components/ui/spinner'
import { toast } from 'sonner'
import { updateUser } from '../../utils/users'

const EditAccount = ({ acct }) => {

    const { token, refreshRecord } = useContext(AppContext);
    const [selectedRole, setSelectedRole] = useState(acct.role);
    const [selectedDirectorate, setSelectedDirectorate] = useState(acct.directorate);
    const [selectedUnit, setSelectedUnit] = useState(acct.unit);
    const [office_location, setOffice_location] = useState(acct.office_location);
    const [units, setUnits] = useState([]);
    const [success, setSuccess] = useState();
    const [error, setError] = useState();
    const [updating, setUpdating] = useState(false);

    const getDirectorateUnits = () => {
        let filteredUnits;

        if(selectedDirectorate){
            directorates.filter(dir => {
                if(dir.title === selectedDirectorate){
                    filteredUnits = dir.units;
                }
            }) 
        }
        return filteredUnits;
    }

    const handleUpdate = () => {

        if(!selectedRole){
            alert('Role must be selected!')
        }
        else{

            const data = {
                id: acct.id, 
                role: selectedRole, 
                directorate: selectedDirectorate, 
                unit: selectedUnit,
                office_location
            }
            
            console.log(data);
            updateUser(token, data, setSuccess, setError, setUpdating)
        }
    }

    if(success){
        toast.success("Account updated successfully!", {
            className: "!bg-green-700 !text-white !border-white !font-bold",
            descriptionClassName: "!text-green-700",
        });
        setSuccess();
        refreshRecord(Date.now());
    }

    if(error){
        alert(JSON.stringify(error))
        setError();
    }

    useEffect(() => {
        setUnits(getDirectorateUnits());
    }, [selectedDirectorate])


    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Update account</DialogTitle>
                <DialogDescription>
                Make changes to account here. Click save when you&apos;re
                done.
                </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
                <div className="grid gap-3">
                <Label className="font-light text-lg">{acct.fullname}</Label>
                </div>
                <div className="grid gap-3">
                <Label htmlFor="role-1">Role</Label>
                <Select
                    value={selectedRole} // Reflects the current state
                    onValueChange={setSelectedRole} // Updates the state on selection
                    required
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                        <SelectLabel>Role</SelectLabel>
                        <SelectItem value="user">user</SelectItem>
                        <SelectItem value="admin">admin</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                </div>
                <div className="grid gap-3">
                <Label htmlFor="role-1">Directorate</Label>
                <Select
                    value={selectedDirectorate} // Reflects the current state
                    onValueChange={setSelectedDirectorate} // Updates the state on selection
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                        <SelectLabel>Directorate</SelectLabel>
                        {
                            directorates.map( dir => (
                                <SelectItem key={dir.id} value={dir.title}>{dir.title}</SelectItem>
                            ))
                        }
                        </SelectGroup>
                    </SelectContent>
                </Select>
                </div>
                <div className="grid gap-3">
                <Label htmlFor="role-1">Unit</Label>
                <Select
                    value={selectedUnit} // Reflects the current state
                    onValueChange={setSelectedUnit} // Updates the state on selection
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a unit" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                        <SelectLabel>Unit</SelectLabel>
                        {
                            units && units.length > 0 && units.map( un => (
                                <SelectItem key={un.id} value={un.title}>{un.title}</SelectItem>
                            ))
                        }
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <div className="grid gap-3">
                <Label htmlFor="role-1">Office location</Label>
                <Select
                    value={office_location} // Reflects the current state
                    onValueChange={setOffice_location} // Updates the state on selection
                    required
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a office location" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                        <SelectLabel>Office location</SelectLabel>
                        <SelectItem value="Abuja">Abuja</SelectItem>
                        <SelectItem value="Lagos">Lagos</SelectItem>
                        <SelectItem value="Benue">Benue</SelectItem>
                        <SelectItem value="Plateau">Plateau</SelectItem>
                        <SelectItem value="Ogun">Ogun</SelectItem>
                        <SelectItem value="Oyo">Oyo</SelectItem>
                        <SelectItem value="Ondo">Ondo</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                </div>
                </div>
            </div>
            <DialogFooter>
                <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button 
                    onClick={() => handleUpdate()}
                >
                {
                    updating ?
                    <div className='flex items-center gap-1'>
                        <Spinner className="size-4" />
                        <span>Saving...</span>
                    </div>
                    :
                    <span>Save changes</span>
                }
                </Button>
            </DialogFooter>
        </DialogContent>
    )
}

export default EditAccount