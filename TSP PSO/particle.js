class Particle {
    constructor(nDimensi, objFunction) {
        this.objFunction = objFunction;
        this.nDimensi = nDimensi;
        this.position = [];
        this.velocity = [];
        this.pbest = [];
        this.pbestFitness = Infinity;
        this.fitness = Infinity;
    }

    inisialisasiPosisi() {
        const cities = Array.from({ length: this.nDimensi - 1 }, (_, i) => i + 1);
        this.position = [0, ...this.shuffle(cities), 0];
        this.velocity = [];
        this.pbest = [...this.position];
        this.pbestFitness = this.objFunction(...this.pbest);
    }

    shuffle(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    hitungFitness() {
        this.fitness = this.objFunction(...this.position);
    }

    updatePbest() {
        if (this.fitness < this.pbestFitness) {
            this.pbestFitness = this.fitness;
            this.pbest = [...this.position];
        }
    }

    applySwap(swap) {
        const [i, j] = swap;

        // Hindari swapping posisi awal dan akhir
        if (i === 0 || j === 0) return;
        if (i === this.nDimensi - 1 || j === this.nDimensi - 1) return;

        [this.position[i], this.position[j]] = [this.position[j], this.position[i]];
    }

    updatePosition() {
        this.velocity.forEach(swap => this.applySwap(swap));
    }
}

export { Particle };
