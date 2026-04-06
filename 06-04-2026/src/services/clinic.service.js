import fs from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'src/data/clinics.json');

let clinics = [];

function loadData() {
    try {
        const data = fs.readFileSync(dataPath, 'utf8');
        clinics = JSON.parse(data);
    } catch (error) {
        clinics = [];
    }
}

function saveData() {
    fs.writeFileSync(dataPath, JSON.stringify(clinics, null, 2));
}

loadData();

class ClinicService {
    getAll() {
        return clinics;
    }

    getById(id) {
        return clinics.find(c => c.id === parseInt(id));
    }

    create(clinicData) {
        const { name, address, phone } = clinicData;
        if (!name || !address || !phone) {
            throw new Error('name, address and phone are required');
        }
        const newId = clinics.length > 0 ? Math.max(...clinics.map(c => c.id)) + 1 : 1;
        const newClinic = { id: newId, name, address, phone };
        clinics.push(newClinic);
        saveData();
        return newClinic;
    }

    update(id, clinicData) {
        const index = clinics.findIndex(c => c.id === parseInt(id));
        if (index === -1) return null;
        clinics[index] = { ...clinics[index], ...clinicData, id: parseInt(id) };
        saveData();
        return clinics[index];
    }

    delete(id) {
        const index = clinics.findIndex(c => c.id === parseInt(id));
        if (index === -1) return null;
        const deleted = clinics.splice(index, 1)[0];
        saveData();
        return deleted;
    }
}

export const clinicService = new ClinicService();

