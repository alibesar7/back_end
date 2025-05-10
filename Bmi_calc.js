function calculateBMI(weightKg, heightMeters, age) {
    if (heightMeters <= 0) {
        throw new Error("Height must be greater than zero.");
    }
    return weightKg / (heightMeters/100 * heightMeters/100);
}

module.exports = calculateBMI; 