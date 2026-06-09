import BedService from "./BedService.js";

class BedController {

    async getAll(req, res) {
        const beds = await BedService.getAll();
        res.json(beds);
    }

    async filter(req, res) {
        const beds = await BedService.filter(req.body);
        res.json(beds);
    }

    async create(req, res) {
    const bed = await BedService.create(req.body);
    res.json(bed);
}
async statistics(req, res) {

    const statistics =
        await BedService.getStatistics();

    res.json(statistics);
}
}

export default new BedController();