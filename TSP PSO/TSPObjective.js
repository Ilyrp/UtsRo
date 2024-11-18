import { distances } from "./cities.js";

export function calculateTotalDistance(...cities) {
    let totalDistance = 0;

    // Pastikan rute dimulai dan diakhiri di Surabaya
    const fullPath = [0, ...cities.filter(city => city !== 0), 0]; 

    for (let i = 0; i < fullPath.length - 1; i++) {
        totalDistance += distances[fullPath[i]][fullPath[i + 1]];
    }

    return totalDistance;
}
