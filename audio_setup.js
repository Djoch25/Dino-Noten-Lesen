let currentMidiPitch = -1;

const startMic = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({audio: true});
  const audioContext = new AudioContext();
  const sampleRate = audioContext.sampleRate;

  await audioContext.audioWorklet.addModule("audio_worklet.js");

  const workletNode = new AudioWorkletNode(audioContext, "audio_worklet");

  workletNode.port.onmessage = (event) => {
    const {frequency, confidence} = event.data;

    if (confidence > 0.8) {
      currentMidiPitch = Math.round(12 * Math.log2(frequency / 440)) + 69;
    } else {
      currentMidiPitch = -1;
    }
  };

  source = audioContext.createMediaStreamSource(stream);
  source.connect(workletNode);
}
