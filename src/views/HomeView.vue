<template>
  <div>
    <div class="table-skeleton">
      <div class="skeleton-header">
        <div class="skeleton-cell"></div>
        <div class="skeleton-cell"></div>
        <div class="skeleton-cell"></div>
      </div>
      <div class="skeleton-row">
        <div class="skeleton-cell"></div>
        <div class="skeleton-cell"></div>
        <div class="skeleton-cell"></div>
      </div>
      <div class="skeleton-row">
        <div class="skeleton-cell"></div>
        <div class="skeleton-cell"></div>
        <div class="skeleton-cell"></div>
      </div>
      <div class="skeleton-row">
        <div class="skeleton-cell"></div>
        <div class="skeleton-cell"></div>
        <div class="skeleton-cell"></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        isLoading: true,
        data: [],
      };
    },
    mounted() {
      setTimeout(() => {
        this.data = [
          { id: 1, col1: 'Data 1', col2: 'Data 2', col3: 'Data 3' },
          { id: 2, col1: 'Data 4', col2: 'Data 5', col3: 'Data 6' },
        ];
        this.isLoading = false;
      }, 3000); // Simula un tiempo de carga
    },
  };
</script>

<style>
  /* Skeleton Container */
  .table-skeleton {
    display: grid;
    gap: 8px;
    width: 100%;
    max-width: 600px;
    margin: auto;
  }

  /* Skeleton Rows */
  .skeleton-header,
  .skeleton-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
  }

  /* Skeleton Cells */
  .skeleton-cell {
    height: 20px;
    background-color: #e0e0e0;
    border-radius: 4px;
    position: relative;
    overflow: hidden;
  }

  /* Skeleton Animation */
  .skeleton-cell::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    animation: shimmer 1.5s infinite;
  }

  @keyframes shimmer {
    0% {
      left: -100%;
    }
    100% {
      left: 100%;
    }
  }
</style>
