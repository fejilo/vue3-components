<template>
  <div class="video-player">
    <video ref="videoElement" :src="src" @timeupdate="updateProgress" @loadedmetadata="setDuration" controls></video>

    <div class="controls">
      <button @click="togglePlay">{{ isPlaying ? 'Pausar' : 'Reproducir' }}</button>
      <span>{{ formatTime(currentTime) }} / {{ formatTime(duration) }}</span>
      <input type="range" min="0" :max="duration" step="0.1" v-model="currentTime" @input="seek" />
    </div>
  </div>
</template>

<script>
  import { ref } from 'vue';

  export default {
    name: 'VideoPlayer',
    props: {
      src: {
        type: String,
        required: true,
      },
    },
    setup(props) {
      const videoElement = ref(null);
      const isPlaying = ref(false);
      const currentTime = ref(0);
      const duration = ref(0);

      const togglePlay = () => {
        if (!videoElement.value) return;

        if (isPlaying.value) {
          videoElement.value.pause();
        } else {
          videoElement.value.play();
        }
        isPlaying.value = !isPlaying.value;
      };

      const updateProgress = () => {
        if (videoElement.value) {
          currentTime.value = videoElement.value.currentTime;
        }
      };

      const setDuration = () => {
        if (videoElement.value) {
          duration.value = videoElement.value.duration;
        }
      };

      const seek = () => {
        if (videoElement.value) {
          videoElement.value.currentTime = currentTime.value;
        }
      };

      const formatTime = time => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60)
          .toString()
          .padStart(2, '0');
        return `${minutes}:${seconds}`;
      };

      return {
        props,
        videoElement,
        isPlaying,
        currentTime,
        duration,
        togglePlay,
        updateProgress,
        setDuration,
        seek,
        formatTime,
      };
    },
  };
</script>

<style scoped>
  .video-player {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 600px;
    margin: auto;
  }

  .controls {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 10px;
  }

  input[type='range'] {
    width: 100%;
  }
</style>
