import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    name: String,
    salary: Number,
    language: String,
    city: String,
    isManager: Boolean
});

export const Employee = mongoose.model('Employee', Schema);
