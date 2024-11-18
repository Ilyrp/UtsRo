import { Particle } from "./particle.js";

class PSO {
    constructor(n_Particles, n_Dimensi, obj_Function) {
        this.n_Particles = n_Particles;
        this.particles = [];
        this.n_Dimensi = n_Dimensi;
        this.obj_Function = obj_Function;
        this.gbestFitness = Infinity;
        this.gbestPosition = [];
        this.init_particles();
    }

    init_particles() {
        for (let i = 0; i < this.n_Particles; i++) {
            const particle = new Particle(this.n_Dimensi, this.obj_Function);
            particle.inisialisasiPosisi();
            this.particles.push(particle);
        }
        this.updateGbest();
    }

    evaluateFitness() {
        this.particles.forEach(particle => {
            particle.hitungFitness();
        });
    }

    updatePbest() {
        this.particles.forEach(particle => {
            particle.updatePbest();
        });
    }

    updateGbest() {
        this.particles.forEach(particle => {
            if (particle.pbestFitness < this.gbestFitness) {
                this.gbestFitness = particle.pbestFitness;
                this.gbestPosition = [...particle.pbest];
            }
        });
    }

    generateSwaps() {
        const idx1 = Math.floor(Math.random() * (this.n_Dimensi - 2)) + 1;
        let idx2 = Math.floor(Math.random() * (this.n_Dimensi - 2)) + 1;
        while (idx1 === idx2) {
            idx2 = Math.floor(Math.random() * (this.n_Dimensi - 2)) + 1;
        }
        return [idx1, idx2];
    }

    updateVelocity(c1 = 1.5, c2 = 1.5) {
        this.particles.forEach(particle => {
            particle.velocity = [];
            const r1 = Math.random();
            const r2 = Math.random();

            if (Math.random() < r1) {
                particle.velocity.push(this.generateSwaps());
            }

            if (Math.random() < r2) {
                particle.velocity.push(this.generateSwaps());
            }
        });
    }

    updatePosition() {
        this.particles.forEach(particle => {
            particle.updatePosition();
            particle.hitungFitness();
        });
    }

    mainPSO() {
        this.evaluateFitness();
        this.updatePbest();
        this.updateGbest();
        this.updateVelocity();
        this.updatePosition();
    }
}

export { PSO };
