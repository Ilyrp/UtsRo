function maxProfit(x, y) {
    const profitA = 50;
    const profitB = 30;
    const timeA = 1;
    const timeB = 0.5;
    const materialA = 3;
    const materialB = 2;
    const maxTime = 12; 
    const maxMaterial = 50; 

    const totalTime = x * timeA + y * timeB;
    const totalMaterial = x * materialA + y * materialB;
    const totalProfit = x * profitA + y * profitB;

    if (totalTime > maxTime || totalMaterial > maxMaterial) {
        return 0;
    } else {
        return totalProfit; 
    }
}

export { maxProfit };