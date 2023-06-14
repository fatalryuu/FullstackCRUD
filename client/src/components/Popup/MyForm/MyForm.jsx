import React, { useContext } from "react";
import s from "./MyForm.module.css";
import { useForm, useFieldArray } from "react-hook-form";
import PropTypes from "prop-types";
import { ListContext } from "../../../App";

const MyForm = ({ initValues, setIsVisible }) => {
    const { list, setList } = useContext(ListContext);
    const { register, control, handleSubmit, watch, reset, setValue } =
        useForm();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "social",
    });

    const onSubmit = data => {
        data.id = list.length + 1;
        setList(prev => [...prev, data]);
        reset();
        fields.map((field, index) => remove(index));
        setIsVisible(false);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
            <label>Name:</label>
            <input
                type="text"
                placeholder="Enter name..."
                autoComplete="off"
                {...register("name")}
            />
            <br />

            <label>Username:</label>
            <input
                type="text"
                placeholder="Enter username..."
                autoComplete="off"
                {...register("username")}
            />
            <br />

            <label>Country:</label>
            <input
                type="text"
                placeholder="Enter country..."
                autoComplete="off"
                {...register("country")}
            />
            <br />

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
                    {...register("isProfessional")}
                />{" "}
                Yes{" "}
                <input
                    type="radio"
                    value="false"
                    defaultChecked={true}
                    {...register("isProfessional")}
                />{" "}
                No
            </label>
            <br />

            {watch("isProfessional") === "true" && (
                <>
                    <label>Team:</label>
                    <input
                        type="text"
                        placeholder="Enter team..."
                        {...register("professional.team")}
                    />
                    <br />

                    <label>Earnings:</label>
                    <input
                        type="text"
                        placeholder="Enter earnings..."
                        {...register("professional.earnings")}
                    />
                    <br />
                </>
            )}

            {fields.map((field, index) => (
                <div key={field.id}>
                    <label>Social Platform:</label>
                    <input
                        type="text"
                        placeholder="Enter platform..."
                        {...register(`social[${index}].platform`)}
                    />
                    <br />

                    <label>Social URL:</label>
                    <input
                        type="text"
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
            ))}

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
    );
};

MyForm.propTypes = {
    initValues: PropTypes.object,
    setIsVisible: PropTypes.func,
};

export default MyForm;
