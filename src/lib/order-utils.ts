export const parseCurrency = (str?: string): number => {
    if (!str) return 0;
    return parseInt(str.replace(/\./g, ''), 10);
};

export type VehicleType = 'MOTOR' | 'MOBIL' | 'TRUK';

export const getVehicleType = (swdPokok?: string): VehicleType => {
    if (!swdPokok) return "MOTOR";

    const value = parseCurrency(swdPokok);

    if (value === 35000 || value === 83000) {
        return "MOTOR";
    } else if (value === 143000) {
        return "MOBIL";
    } else {
        return "TRUK";
    }
};
