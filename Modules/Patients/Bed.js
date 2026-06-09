import mongoose from "mongoose";

const BedSchema = new mongoose.Schema(
{
    number: Number,              // номер койки
    department: String,          // отделение
    status: String,              // свободна / занята / санобработка / недоступна
    patientName: String         // если занята — ФИО пациента
},
{
    collection: "beds"
});

export default mongoose.model("Bed", BedSchema);