import React, {useContext, useEffect, useState} from "react";
import s from "./MyForm.module.css";
import {useForm, useFieldArray} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import PropTypes from "prop-types";
import {ListContext} from "../../../App";
import * as yup from "yup";
import {addToList, updateList} from "../../../api/api";
import Input from "./Inputs/Input";
import Select from "./Inputs/Select";
import Radio from "./Inputs/Radio";

//validation
const schema = yup.object().shape({
    name: yup.string().required().max(20),
    username: yup.string().required().max(20),
    country: yup.string().required().max(20),
    age: yup.number().required().max(100),
    social: yup.array().of(
        yup.object().shape({
            platform: yup.string().required(),
            url: yup.string().required(),
        }),
    ),
});

const MyForm = ({initValues, setValues, setIsVisible}) => {
    const [isInit, setIsInit] = useState(true);
    const {list, setList} = useContext(ListContext);
    const {
        register,
        control,
        handleSubmit,
        watch,
        reset,
        setValue,
        formState: {errors},
    } = useForm({
        resolver: yupResolver(schema),
    });
    const {fields, append, remove} = useFieldArray({
        control,
        name: "social",
    });

    //edit mode
    useEffect(() => {
        if (initValues) {
            setValue("name", initValues.name);
            setValue("username", initValues.username);
            setValue("country", initValues.country);
            setValue("age", initValues.age);
            setValue("game", initValues.game);
            setValue("level", initValues.level);
            setValue("isProfessional", initValues.isProfessional.toString());
            if (initValues.isProfessional) {
                setValue("professional.team", initValues.professional.team);
                setValue("professional.earnings", initValues.professional.earnings);
            }
            if (initValues.social.length > 0) {
                initValues.social.forEach((el, index) => {
                    append({id: fields.length + 1, platform: "", url: ""});
                    setValue(`social[${index}].platform`, initValues?.social[index]?.platform);
                    setValue(`social[${index}].url`, initValues?.social[index]?.url);
                })
            }
            setIsInit(false);
        }
    }, [initValues]);

    //close form action
    const onClose = () => {
        reset();
        fields.map((field, index) => remove(index));
        setValues(null);
        setIsVisible(false);
    }

    //submit data
    const onSubmit = async data => {
        //convert string from radio-button to boolean
        if (data.isProfessional === "false") {
            data.isProfessional = false;
        } else if (data.isProfessional === "true") {
            data.isProfessional = true
        }

        //if edit mode
        if (initValues) {
            data.id = initValues.id;
            //find only changed fields
            let changed = {
                id: initValues.id,
            };
            for (let key in data) {
                if (JSON.stringify(initValues[key]) !== JSON.stringify(data[key])) {
                    changed[key] = data[key];
                }
            }
            const response = await updateList(changed);
            //if all is ok, delete previous version of player and add new, then sort by id
            if (!response?.message) {
                setList([...list.filter(el => el.id !== data.id), data].sort((a, b) => a.id - b.id));
            }
        } else {
            //creation mode
            const response = await addToList(data);
            if (!response.message) {
                data.id = response;
                setList(prev => [...prev, data]);
            }
        }

        //reset form and close it
        reset();
        fields.map((field, index) => remove(index));
        setIsVisible(false);
    };

    return (
        <>
            <button onClick={onClose} className={s.button}>
                X
            </button>
            <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
                <Input label="Name:" type="text" placeholder="Enter name..." errors={errors} name="name"
                       register={register}/>
                <Input label="Username:" type="text" placeholder="Enter username..." errors={errors} name="username"
                       register={register}/>
                <Input label="Country:" type="text" placeholder="Enter country..." errors={errors} name="country"
                       register={register}/>
                <Input label="Age:" type="number" placeholder="Enter age..." errors={errors} name="age"
                       register={register}/>
                <Select label="Game:" options={["CS:GO", "Dota 2", "Valorant", "PUBG", "Hearthstone"]} name="game"
                        register={register}/>
                <Select label="Level:" options={["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]} name="level"
                        register={register}/>

                <label>
                    Is Professional:
                    <br/>
                    <Radio value="true" defaultChecked={initValues?.isProfessional} text="Yes" name="isProfessional"
                           register={register}/>
                    <Radio value="false" defaultChecked={!initValues?.isProfessional} text="No" name="isProfessional"
                           register={register}/>
                </label>
                <br/>

                {watch("isProfessional") === "true" && (
                    <>
                        <Select label="Team:" options={["NaVi", "G2", "Fnatic", "Team Spirit", "Liquid"]}
                                name="professional.team" register={register}/>
                        <Input label="Earnings:" type="number" placeholder="Enter earnings..." errors={errors}
                               name="professional.earnings" register={register}/>
                    </>
                )}

                {fields.map((field, index) => {
                    //if edit mode
                    if (isInit && initValues) {
                        //if more than the length of array, then return
                        if (index >= initValues.social.length) {
                            return null;
                        }
                    }
                    return (
                        <div key={field.id}>
                            {errors.social && errors.social[index] && (
                                <p style={{color: "red"}}>
                                    {errors.social[index].platform?.message}
                                </p>
                            )}
                            <Select label="Social Platform:" options={["twitch", "youtube", "vk", "tiktok"]}
                                    name={`social[${index}].platform`} register={register}/>
                            <Input label="Social URL:" type="text" placeholder="Enter url..." errors={errors}
                                   name={`social[${index}].url`} register={register}/>

                            <button
                                type="button"
                                onClick={() => remove(index)}
                                className={s.remove}
                            >
                                Remove Social
                            </button>
                            <br/>
                        </div>
                    )
                })}

                <button
                    type="button"
                    onClick={() =>
                        append({id: fields.length + 1, platform: "", url: ""})
                    }
                    className={s.add}
                >
                    Add Social
                </button>
                <br/>

                <button type="submit">Submit</button>
            </form>
        </>
    );
};

MyForm.propTypes = {
    initValues: PropTypes.object,
    setValues: PropTypes.func,
    setIsVisible: PropTypes.func,
};

export default MyForm;
