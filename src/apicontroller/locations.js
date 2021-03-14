import fs from 'fs';

export default {
    showlocationdivision: (req, res, next) => {
        const location = fs.readFileSync('./src/config/meta.json', 'utf8');
        const response = {
            status: 200,
            message: "location divisions fetched successfully!",
            data: JSON.parse(location)
            }
        res.send(response);
    }

}