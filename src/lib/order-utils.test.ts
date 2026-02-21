import { describe, it, expect } from 'vitest';
import { parseCurrency, getVehicleType } from './order-utils';

describe('order-utils', () => {
    describe('parseCurrency', () => {
        it('should return 0 for empty or undefined input', () => {
            expect(parseCurrency('')).toBe(0);
            expect(parseCurrency(undefined)).toBe(0);
        });

        it('should parse currency string with dots correctly', () => {
            expect(parseCurrency('35.000')).toBe(35000);
            expect(parseCurrency('1.000.000')).toBe(1000000);
            expect(parseCurrency('143.000')).toBe(143000);
        });

        it('should handle strings without dots', () => {
            expect(parseCurrency('50000')).toBe(50000);
        });
    });

    describe('getVehicleType', () => {
        it('should return MOTOR for undefined or empty input', () => {
            expect(getVehicleType('')).toBe('MOTOR');
            expect(getVehicleType(undefined)).toBe('MOTOR');
        });

        it('should return MOTOR for 35.000 and 83.000', () => {
            expect(getVehicleType('35.000')).toBe('MOTOR');
            expect(getVehicleType('83.000')).toBe('MOTOR');
        });

        it('should return MOBIL for 143.000', () => {
            expect(getVehicleType('143.000')).toBe('MOBIL');
        });

        it('should return TRUK for other values', () => {
            expect(getVehicleType('200.000')).toBe('TRUK');
            expect(getVehicleType('1.000.000')).toBe('TRUK');
        });
    });
});
