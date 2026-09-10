let currentMidiPitch = -1;

const startMic = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({audio: true});
  const audioContext = new AudioContext();
  const sampleRate = audioContext.sampleRate;

  await audioContext.audioWorklet.addModule("audio_worklet.js");

  const workletNode = new AudioWorkletNode(audioContext, "audio_worklet");

  workletNode.port.onmessage = (event) => {
    currentMidiPitch = event.data;
  };

  source = audioContext.createMediaStreamSource(stream);
  source.connect(workletNode);
}