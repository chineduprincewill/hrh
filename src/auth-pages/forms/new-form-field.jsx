import ComboboxComponent from '@/components/combobox-component'
import SkeletonComponent from '@/components/skeleton-component'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Spinner } from '@/components/ui/spinner'
import { Textarea } from '@/components/ui/textarea'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { fetchFormFieldCategories, updateFormField } from '../../utils/forms'
import { AppContext } from '../../context/AppContext'

const NewFormField = ({ formid, setIsCreated, isEdit, setIsUpdating, reloadform, setReloadform }) => {

    const { token } = useContext(AppContext);
    //const [id, setId] = useState();
    //const [formcategory, setFormcategory] = useState();
    const [fieldName, setFieldName] = useState();
    const [label, setLabel] = useState();
    const [type, setType] = useState();
    const [required, setRequired] = useState();
    const [options, setOptions] = useState();
    const [dependent, setDependent] = useState();
    const [logic,setLogic] = useState();
    const [success, setSuccess] = useState();
    const [error, setError] = useState();
    const [adding, setAdding] = useState(false);
    const [formfields, setFormfields] = useState();
    const [loading, setLoading] = useState(false);
    //const [reloadform, setReloadform] = useState(false);
    const [categories, setCategories] = useState([]);
    const [value, setValue] = useState()
    
    const data = {
        formid
    }

    const handleUpdate = () => {

        if(!label || !type || !required || !dependent){
            toast.error("One or more required fields are empty!", {
                className: "!bg-red-700 !text-white !border-white !font-bold",
                descriptionClassName: "!text-red-700",
            });
        }
        else{
            const data = {
                formcategory:value,
                formid,
                fieldName,
                label, 
                type,
                required,
                options,
                dependent,
                logic
            }

            if(isEdit){
                data.id = isEdit?.id
            }

            console.log(data);
            
            updateFormField(token, data, setSuccess, setError, setAdding)
            //addFormField(data, setSuccess, setError, setAdding)
        }
    }

    if(success){
        toast.success("Form field created successfully!", {
            className: "!bg-green-700 !text-white !border-white !font-bold",
            descriptionClassName: "!text-green-700",
        });
        //router.push('/forms');
        setSuccess();
        setLabel('');
        setFieldName('')
        setRequired('');
        setDependent('');
        setType('');
        setOptions('');
        setIsCreated(Date.now());
        setIsUpdating(true);
    }

    if(error){
        toast.error(JSON.stringify(error), {
            className: "!bg-red-700 !text-white !border-white !font-bold",
            descriptionClassName: "!text-red-700",
        });
        setError();
    }

    const initFormReload = () => {
        setReloadform(true);
        //setTimeout(() => setReloadform(false), 2000)
    }

    useEffect(() => {
        //fetchFormfields(data, setFormfields, setError, setLoading)
    }, [])

    useEffect(() => {
        //setReloadform(true)
        if(isEdit){
            setFieldName(isEdit?.fieldName);
            setLabel(isEdit?.label);
            setType(isEdit?.type);
            setOptions(isEdit?.options);
            setRequired(isEdit?.required);
            setDependent(isEdit?.depends_on);
            setValue(isEdit?.form_category)
            setLogic(isEdit?.logic)
        }
    }, [isEdit])

    useEffect(() => {
        reloadform && setTimeout(() => setReloadform(false), 2000)
    }, [reloadform])

    useEffect(() => {
        fetchFormFieldCategories(token, data, setCategories, setError, setLoading)
    }, [reloadform])

    console.log(isEdit);

    return (
        reloadform ?
        <SkeletonComponent />
        :
        <div className='w-full'>
            <div className={`w-full grid gap-4`}>
                <ComboboxComponent comboOptions={categories} value={value} setValue={setValue} />
                <Input 
                    value={fieldName}
                    placeholder="Enter field name (fieldName)*"
                    onChange={(e) => setFieldName(e.target.value)}
                    required
                    className="w-full"
                />
                <Input 
                    value={label}
                    placeholder="Enter field label...*"
                    onChange={(e) => setLabel(e.target.value)}
                    required
                    className="w-full"
                />
                <Select
                    value={type}
                    onValueChange={setType}
                    required
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a field type *" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Field type</SelectLabel>
                            <SelectItem value="text">text</SelectItem>
                            <SelectItem value="date">date</SelectItem>
                            <SelectItem value="number">number</SelectItem>
                            <SelectItem value="select">select</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <RadioGroup 
                    defaultValue={required} 
                    className='flex items-center gap-3'
                    onValueChange={setRequired}
                >
                    <div className="flex items-center gap-3">
                        <RadioGroupItem value="required" id="r1" />
                        <Label htmlFor="r1">required</Label>
                    </div>
                    <div className="flex items-center gap-3">
                        <RadioGroupItem value="Not required" id="r2" />
                        <Label htmlFor="r2">Not required</Label>
                    </div>
                </RadioGroup>
                {
                    type === 'select' &&
                    <Textarea 
                        value={options}
                        placeholder="Enter options separated with comma ','"
                        className="w-full"
                        onChange={(e) => setOptions(e.target.value)}
                    />
                    }
                    <Select
                        value={dependent}
                        required
                        onValueChange={setDependent}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select dependent if any *" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Dependent</SelectLabel>
                                <SelectItem value="none">none</SelectItem>
                            {
                                formfields && formfields.length > 0 && formfields.map(fm => (
                                    <SelectItem key={fm.id} value={fm.label}>{fm.label}</SelectItem>
                                ))
                            }
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                {
                    dependent && dependent !== 'none' &&
                    <Select
                        required
                        onValueChange={setLogic}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Logic value" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Logic value</SelectLabel>
                                <SelectItem value="value one">value one</SelectItem>
                                <SelectItem value="value two">value two</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                }
                <Button 
                    className="gradient"
                    onClick={handleUpdate}
                >
                {
                    adding ?
                    <div className='flex items-center gap-1'>
                        <Spinner className="size-4" />
                        <span>Saving...</span>
                    </div>
                    :
                    <span>Save changes</span>
                }
                </Button>
            </div>   
        </div>
    )
}

export default NewFormField