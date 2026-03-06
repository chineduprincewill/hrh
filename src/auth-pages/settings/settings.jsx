import React, { useContext, useEffect, useMemo, useState } from 'react'
//import { useAuth } from '../../hooks/useAuth'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Hospital, House, LockKeyhole, MapPinHouse, User } from 'lucide-react';
import Users from './Users';
import Facilities from './Facilities';
import { fetchGeodata, fetchUsers } from '../../utils/users';
import SkeletonComponent from '../../components/skeleton-component';
import { AppContext } from '../../context/AppContext';
import Security from './security';
import OfficeCoordinates from './offices';
import Offices from './offices';
import OfficeCordinates from './office-cordinates';

const Settings = () => {

  const { token, user, record } = useContext(AppContext);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [geodata, setGeodata] = useState([]);
  const [fetching, setFetching] = useState(false);

  const role = JSON.parse(user)?.role;

  return (
    <div className='w-full p-4'>
        {/* Error Message */}
        {error && (
            <div className="mb-6 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                <p className="text-sm text-destructive flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {error}
                </p>
            </div>
        )}
        <Tabs defaultValue="security">
            <TabsList className="gap-4 w-full md:max-w-max">
                <TabsTrigger value="security">
                    <div className='flex gap-1 items-center'>
                        <LockKeyhole size={16} />
                        <span className='hidden md:block'>Security</span>
                    </div>
                </TabsTrigger>
            {
                role === 'admin' &&
                <>
                    <TabsTrigger value="offices">
                        <div className='flex gap-1 items-center'>
                            <House size={16} />
                            <span className='hidden md:block'>Offices</span>
                        </div>
                    </TabsTrigger>
                    <TabsTrigger value="office-cordinates">
                        <div className='flex gap-1 items-center'>
                            <MapPinHouse size={16} />
                            <span className='hidden md:block'>Office cordinates</span>
                        </div>
                    </TabsTrigger>
                </>
                
            }
            </TabsList>
            <TabsContent value="security">
              <Security />
            </TabsContent>
            <TabsContent value="offices">
              <Offices />
            </TabsContent>
            <TabsContent value="office-cordinates">
              <OfficeCordinates />
            </TabsContent>
        </Tabs>
    </div>
  )
}

export default Settings