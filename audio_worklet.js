class PitchProcessor extends AudioWorkletProcessor {
	constructor() {
		super();

		this.bufferSize = 2048;
        this.hopSize = 512;

		this.buffer = new Float32Array(this.bufferSize);
		this.index = 0;

        this.pitchConfidence = 0.8;

        this.minLag = Math.floor(sampleRate / 550);
        this.maxLag = Math.ceil(sampleRate / 250);

        this.detectionAvailable = true;

        this.releaseCount = 0;
        this.releaseThreshold = 3;
	}

	process(inputs) {
		//inputs è l'array che contiene l'array dei due canali
		//inputs[0] è l'array che contiene i due canali L e R
		//inputs[0][0] è il sample del canale L

		const inputSamples = inputs[0][0];

		for (let sample of inputSamples) {
			this.buffer[this.index++] = sample;

            if (this.index >= this.bufferSize) {
                this.sendPitch();
                this.buffer.copyWithin(0, this.hopSize, this.bufferSize);
                this.index = this.bufferSize - this.hopSize;
            }
		}

		return true;
	}

    sendPitch() {
        const yinDetected = yin(this.buffer, sampleRate, this.maxLag, this.minLag, 0.15); //finestra 250 - 550 Hz
        const frequency = yinDetected.frequency;
        const confidence = yinDetected.confidence;

        if (frequency <= 0 || confidence < this.pitchConfidence) {
            this.releaseCount++;

            if (this.releaseCount >= this.releaseThreshold) {
                this.detectionAvailable = true;
            }   

            return;
        }

        this.releaseCount = 0;

        if (this.detectionAvailable) {
            const midiPitch = Math.round(12 * Math.log2(frequency / 440)) + 69;
        
            this.port.postMessage(midiPitch);

            this.detectionAvailable = false;
        }
    }
}

registerProcessor("audio_worklet", PitchProcessor);

const yin = (buffer, sampleRate, maxLag, minLag, threshold = 0.1) => {
	const len = buffer.length;

    // 1. Difference Function
    const df = new Float32Array(maxLag + 1);

    for (let tau = 0; tau <= maxLag; tau++) {
        let sum = 0;

        for (let i = 0; i < len - tau; i++) {
            const diff = (buffer[i] - buffer[i + tau]);
            sum += diff * diff;
        }

        df[tau] = sum;
    }

    // 2. CMNDF
    const cmndf = new Float32Array(maxLag + 1);
    cmndf[0] = 1;

    let runningSum = 0;

    for (let tau = 1; tau <= maxLag; tau++) {
        runningSum += df[tau];

        cmndf[tau] = runningSum === 0 ? 1 : (df[tau] * (tau)) / runningSum;
    }

    // 3. Absolute threshold
    let tau = -1;

    for (let i = minLag; i <= maxLag; i++) {
        if (cmndf[i] < threshold) {

            // cerca il minimo locale
            while (i + 1 <= maxLag && cmndf[i + 1] < cmndf[i]) {
                i++;
            }

            tau = i;
            break;
        }
    }

    if (tau === -1) {
        return {
            frequency: -1,
            confidence: 0
        }
    }

    // 4. Interpolazione parabolica
    let betterTau = tau;

    if (tau > 0 && tau < maxLag) {
        const s0 = cmndf[tau - 1];
        const s1 = cmndf[tau];
        const s2 = cmndf[tau + 1];

        const denominator = 2 * (2 * s1 - s2 - s0);

        if (Math.abs(denominator) > 1e-12) {
            betterTau += (s2 - s0) / denominator;
        }
    }

    // 5. Frequenza fondamentale
    return {
        frequency: sampleRate / betterTau,
        confidence: 1 - cmndf[tau]
    }
}
