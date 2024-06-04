import mongoose from "mongoose";

const VeganSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        user:{
            type: String,
            required: true,
        },
        publishYear: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

export const Vegan = mongoose.model('Vietnamese', VeganSchema);