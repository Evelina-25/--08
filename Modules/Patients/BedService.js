import Bed from "./Bed.js";

class BedService {

    async getAll() {
        return await Bed.find();
    }

    async filter(filter) {

        const query = {};

        if (filter.department) {
            query.department = filter.department;
        }

        if (filter.status) {
            query.status = filter.status;
        }

        return await Bed.find(query);
    }
    async create(bed) {
    return await Bed.create(bed);
}
async getStatistics() {

    const totalBeds = await Bed.countDocuments();

    const occupiedBeds = await Bed.countDocuments({ status: "Занята" });

    const freeBeds = await Bed.countDocuments({ status: "Свободна" });

    const departments = await Bed.aggregate([
        {
            $group: {
                _id: "$department",
                count: { $sum: 1 }
            }
        }
    ]);

    return {
        totalBeds: totalBeds || 0,
        occupiedBeds: occupiedBeds || 0,
        freeBeds: freeBeds || 0,
        occupancyPercent: totalBeds ? Math.round((occupiedBeds / totalBeds) * 100) : 0,
        departments: departments || []
    };
}
}

export default new BedService();