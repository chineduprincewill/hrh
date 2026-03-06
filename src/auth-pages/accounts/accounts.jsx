import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { Edit, FilePlusCorner } from 'lucide-react';
import DataTable from '../../components/data-table';
import SkeletonComponent from '../../components/skeleton-component';
import { fetchRoles } from '../../utils/roles';
import EditAccount from './edit-account';
import UserAssignForm from './user-assign-form';

const Accounts = () => {

    const { token, user, record } = useContext(AppContext);
    const [roles, setRoles] = useState()
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);

    const columns = [
        {
            accessorKey: 'fullname',
            header: 'Full name',
            enableSorting: true,
        },
        {
            accessorKey: 'email',
            header: 'Email',
            enableSorting: true,
            enableColumnFilter: true,
        },
        {
            accessorKey: 'role',
            header: 'Role',
            enableSorting: true,
            enableColumnFilter: true,
        },
        {
            accessorKey: 'directorate',
            header: 'Directorate',
            enableSorting: true,
            enableColumnFilter: true,
        },
        {
            accessorKey: 'unit',
            header: 'Unit',
            enableSorting: true,
            enableColumnFilter: true,
        },
        {
            accessorKey: 'office_location',
            header: 'Office location',
            enableSorting: true,
            enableColumnFilter: true,
        },
        {
            id: 'actions',
            cell: ({ row }) => {
              const acct = row.original; 
              //const [isOpen, setIsOpen] = useState(false);
              //const [assignOpen, setAssignOpen] = useState(false);
    
              return (
                <div className="w-full flex items-center gap-3">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Edit 
                                className="h-4 w-4 cursor-pointer" 
                            />
                        </DialogTrigger>
                        <DialogContent>
                            <DialogTitle></DialogTitle>
                            <EditAccount acct={acct} />
                        </DialogContent>
                    </Dialog>
                    <Dialog>
                        <DialogTrigger asChild>
                            <FilePlusCorner 
                                className="h-4 w-4 cursor-pointer" 
                            />
                        </DialogTrigger>
                        <UserAssignForm usr={acct} />
                    </Dialog>
                </div>
              );
            },
        },
    ];

    const datafilters = [
        {
            title: "fullname",
            placeholder: "filter by name..."
        },
        {
            title: "email",
            placeholder: "filter by email..."
        },
        {
            title: "role",
            placeholder: "filter by role..."
        },
        /**{
            title: "directorate",
            placeholder: "filter by directorate..."
        },
        {
            title: "unit",
            placeholder: "filter by unit..."
        }*/
    ]

    useEffect(() => {
        fetchRoles(token, setRoles, setError, setLoading)
    }, [record])

    return (
        <div className='w-full p-4 space-y-8'>
            <div className='w-full flex justify-between items-center'>
                <span className='text-xl font-extralight'>Accounts</span>
            </div>
            <div className='w-full'>
            {
                loading || !roles ? <SkeletonComponent /> :
                <DataTable data={roles} columns={columns} filterArrs={datafilters} />
            }  
            </div>
        </div>
    )
}

export default Accounts