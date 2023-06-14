import React from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";

const MyForm = () => {
    const { register, control, handleSubmit, watch } = useForm();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "social",
    });

    const onSubmit = data => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>Name:</label>
            <input {...register("name")} />
            <br />

            <label>Username:</label>
            <input {...register("username")} />
            <br />

            <label>Country:</label>
            <input {...register("country")} />
            <br />

            <label>Age:</label>
            <input {...register("age")} />
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
                <input
                    type="radio"
                    value="true"
                    {...register("isProfessional")}
                />
                Yes
                <input
                    type="radio"
                    value="false"
                    {...register("isProfessional")}
                />
                No
            </label>
            <br />

            {watch("isProfessional") === "true" && (
                <>
                    <label>Team:</label>
                    <input {...register("professional.team")} />
                    <br />

                    <label>Earnings:</label>
                    <input {...register("professional.earnings")} />
                    <br />
                </>
            )}

            {fields.map((field, index) => (
                <div key={field.id}>
                    <label>Social Platform:</label>
                    <input {...register(`social[${index}].platform`)} />
                    <br />

                    <label>Social URL:</label>
                    <input {...register(`social[${index}].url`)} />
                    <br />

                    <button type="button" onClick={() => remove(index)}>
                        Remove Social
                    </button>
                    <br />
                </div>
            ))}

            <button
                type="button"
                onClick={() => append({ platform: "", url: "" })}
            >
                Add Social
            </button>
            <br />

            <button type="submit">Submit</button>
        </form>
    );
};

export default MyForm;
