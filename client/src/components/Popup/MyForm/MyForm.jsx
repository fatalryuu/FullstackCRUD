import React, { useContext, useEffect, useState } from "react";
import s from "./MyForm.module.css";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import PropTypes from "prop-types";
import { ListContext } from "../../../App";
import * as yup from "yup";
import { addToList, updateList } from "../../../api/api";

const schema = yup.object().shape({
    name: yup.string().required().max(20),
    username: yup.string().required().max(20),
    country: yup.string().required().max(20),
    age: yup.number().required().max(100),
    social: yup.array().of(
        yup.object().shape({
            platform: yup.string().required(),
        }),
    ),
});

const MyForm = ({ initValues, setIsVisible }) => {
    const [isInit, setIsInit] = useState(true);
    const { list, setList } = useContext(ListContext);
    const {
        register,
        control,
        handleSubmit,
        watch,
        reset,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: "social",
    });

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
            initValues.social.forEach((el, index) => {
                append({ id: fields.length + 1, platform: "", url: "" });
                setValue(`social[${index}].platform`, initValues?.social[index]?.platform);
                setValue(`social[${index}].url`, initValues?.social[index]?.url);
            })
            setIsInit(false);
        }
    }, [initValues]);

    const onClose = () => {
        reset();
        fields.map((field, index) => remove(index));
        setIsVisible(false);
    }

    const onSubmit = data => {
        if (data.isProfessional === "false") {
            data.isProfessional = false;
        } else if (data.isProfessional === "true") {
            data.isProfessional = true
        }

        if (initValues) {
            data.id = initValues.id;
            updateList(data);
            setList(list.filter(el => el.id !== data.id));
            setList(prev => [...prev, data]);
        } else {
            data.id = addToList(data);
            setList(prev => [...prev, data]);
        }
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
                {errors.name && (
                    <p style={{ color: "red" }}>{errors.name.message}</p>
                )}
                <label>Name:</label>
                <input
                    type="text"
                    placeholder="Enter name..."
                    autoComplete="off"
                    {...register("name")}
                />
                <br />

                {errors.username && (
                    <p style={{ color: "red" }}>{errors.username.message}</p>
                )}
                <label>Username:</label>
                <input
                    type="text"
                    placeholder="Enter username..."
                    autoComplete="off"
                    {...register("username")}
                />
                <br />

                {errors.country && (
                    <p style={{ color: "red" }}>{errors.country.message}</p>
                )}
                <label>Country:</label>
                <input
                    type="text"
                    placeholder="Enter country..."
                    autoComplete="off"
                    {...register("country")}
                />
                <br />

                {errors.age && (
                    <p style={{ color: "red" }}>{errors.age.message}</p>
                )}
                <label>Age:</label>
                <input
                    type="number"
                    placeholder="Enter age..."
                    autoComplete="off"
                    {...register("age")}
                />
                <br />

                <label>Game:</label>
                <select {...register("game")}>
                    <option value="CS:GO">CS:GO</option>
                    <option value="Dota 2">Dota 2</option>
                    <option value="Valorant">Valorant</option>
                    <option value="PUBG">PUBG</option>
                    <option value="Hearthstone">Hearthstone</option>
                </select>
                <br />

                <label>Level:</label>
                <select {...register("level")}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>
                <br />

                <label>
                    Is Professional:
                    <br />
                    <input
                        type="radio"
                        value="true"
                        defaultChecked={initValues?.isProfessional}
                        {...register("isProfessional")}
                    />{" "}
                    Yes{" "}
                    <input
                        type="radio"
                        value="false"
                        defaultChecked={!initValues?.isProfessional}
                        {...register("isProfessional")}
                    />{" "}
                    No
                </label>
                <br />

                {watch("isProfessional") === "true" && (
                    <>
                        <label>Team:</label>
                        <select {...register("professional.team")}>
                            <option value="NaVi">NaVi</option>
                            <option value="G2">G2</option>
                            <option value="Fnatic">Fnatic</option>
                            <option value="Team Spirit">Team Spirit</option>
                            <option value="Liquid">Liquid</option>
                        </select>
                        <br />

                        <label>Earnings:</label>
                        <input
                            type="number"
                            autoComplete={"off"}
                            placeholder="Enter earnings..."
                            {...register("professional.earnings")}
                        />
                        <br />
                    </>
                )}

                {fields.map((field, index) => {
                    if (isInit && initValues) {
                        if (index >= initValues.social.length) {
                            return null;
                        }
                    }
                    return (
                    <div key={field.id}>
                        {errors.social && errors.social[index] && (
                            <p style={{ color: "red" }}>
                                {errors.social[index].platform?.message}
                            </p>
                        )}
                        <label>Social Platform:</label>
                        <select {...register(`social[${index}].platform`)}>
                            <option value="twitch">twitch</option>
                            <option value="youtube">youtube</option>
                            <option value="vk">vk</option>
                            <option value="tiktok">tiktok</option>
                        </select>
                        <br />

                        <label>Social URL:</label>
                        <input
                            type="text"
                            autoComplete="off"
                            placeholder="Enter url..."
                            {...register(`social[${index}].url`)}
                        />
                        <br />

                        <button
                            type="button"
                            onClick={() => remove(index)}
                            className={s.remove}
                        >
                            Remove Social
                        </button>
                        <br />
                    </div>
                )})}

                <button
                    type="button"
                    onClick={() =>
                        append({ id: fields.length + 1, platform: "", url: "" })
                    }
                    className={s.add}
                >
                    Add Social
                </button>
                <br />

                <button type="submit">Submit</button>
            </form>
        </>
    );
};

MyForm.propTypes = {
    initValues: PropTypes.object,
    setIsVisible: PropTypes.func,
};

export default MyForm;
