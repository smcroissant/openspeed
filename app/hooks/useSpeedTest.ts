import { useState, useCallback, useRef } from 'react';

export type TestPhase = 'idle' | 'ping' | 'download' | 'upload' | 'complete';

export interface SpeedTestResults {
  ping: number | null;
  download: number | null;
  upload: number | null;
  jitter: number | null;
}

export interface SpeedTestState {
  phase: TestPhase;
  progress: number;
  currentSpeed: number;
  results: SpeedTestResults;
  isRunning: boolean;
}

const PING_ITERATIONS = 10;
const DOWNLOAD_DURATION = 10000; // 10 seconds
const UPLOAD_DURATION = 10000; // 10 seconds
const CHUNK_SIZE = 1024 * 1024; // 1MB

export function useSpeedTest() {
  const [state, setState] = useState<SpeedTestState>({
    phase: 'idle',
    progress: 0,
    currentSpeed: 0,
    results: {
      ping: null,
      download: null,
      upload: null,
      jitter: null,
    },
    isRunning: false,
  });

  const abortControllerRef = useRef<AbortController | null>(null);

  const measurePing = useCallback(async (): Promise<{ ping: number; jitter: number }> => {
    const pings: number[] = [];

    for (let i = 0; i < PING_ITERATIONS; i++) {
      if (abortControllerRef.current?.signal.aborted) {
        throw new Error('Test aborted');
      }

      const start = performance.now();
      await fetch('/api/ping', { 
        cache: 'no-store',
        signal: abortControllerRef.current?.signal,
      });
      const end = performance.now();
      pings.push(end - start);

      setState(prev => ({
        ...prev,
        progress: ((i + 1) / PING_ITERATIONS) * 100,
        currentSpeed: pings[pings.length - 1],
      }));

      // Small delay between pings
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    const avgPing = pings.reduce((a, b) => a + b, 0) / pings.length;
    
    // Calculate jitter (variation in ping)
    const jitter = pings.reduce((acc, ping) => acc + Math.abs(ping - avgPing), 0) / pings.length;

    return { ping: avgPing, jitter };
  }, []);

  const measureDownload = useCallback(async (): Promise<number> => {
    const startTime = Date.now();
    let totalBytes = 0;
    const speeds: number[] = [];
    let lastUpdate = startTime;

    while (Date.now() - startTime < DOWNLOAD_DURATION) {
      if (abortControllerRef.current?.signal.aborted) {
        throw new Error('Test aborted');
      }

      const chunkStart = performance.now();
      
      try {
        const response = await fetch('/api/download?size=10', {
          cache: 'no-store',
          signal: abortControllerRef.current?.signal,
        });

        const data = await response.arrayBuffer();
        totalBytes += data.byteLength;
        
        const chunkEnd = performance.now();
        const chunkDuration = (chunkEnd - chunkStart) / 1000; // seconds
        const chunkSpeed = (data.byteLength * 8) / chunkDuration / 1000000; // Mbps
        speeds.push(chunkSpeed);

        const elapsed = Date.now() - startTime;
        const progress = Math.min((elapsed / DOWNLOAD_DURATION) * 100, 100);
        
        // Update UI periodically
        if (Date.now() - lastUpdate > 100) {
          // Use recent average for smoother display
          const recentSpeeds = speeds.slice(-5);
          const avgSpeed = recentSpeeds.reduce((a, b) => a + b, 0) / recentSpeeds.length;
          
          setState(prev => ({
            ...prev,
            progress,
            currentSpeed: avgSpeed,
          }));
          lastUpdate = Date.now();
        }
      } catch (error) {
        if (abortControllerRef.current?.signal.aborted) {
          throw new Error('Test aborted');
        }
        // Continue on error
      }
    }

    // Calculate average speed (excluding outliers)
    speeds.sort((a, b) => a - b);
    const trimmedSpeeds = speeds.slice(
      Math.floor(speeds.length * 0.1),
      Math.floor(speeds.length * 0.9)
    );
    
    return trimmedSpeeds.length > 0
      ? trimmedSpeeds.reduce((a, b) => a + b, 0) / trimmedSpeeds.length
      : speeds.reduce((a, b) => a + b, 0) / speeds.length;
  }, []);

  const measureUpload = useCallback(async (): Promise<number> => {
    const startTime = Date.now();
    let totalBytes = 0;
    const speeds: number[] = [];
    let lastUpdate = startTime;

    // Generate random data for upload
    const uploadData = new Uint8Array(CHUNK_SIZE);
    for (let i = 0; i < uploadData.length; i++) {
      uploadData[i] = Math.floor(Math.random() * 256);
    }

    while (Date.now() - startTime < UPLOAD_DURATION) {
      if (abortControllerRef.current?.signal.aborted) {
        throw new Error('Test aborted');
      }

      const chunkStart = performance.now();

      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: uploadData,
          headers: {
            'Content-Type': 'application/octet-stream',
          },
          signal: abortControllerRef.current?.signal,
        });

        if (response.ok) {
          totalBytes += uploadData.length;
          
          const chunkEnd = performance.now();
          const chunkDuration = (chunkEnd - chunkStart) / 1000; // seconds
          const chunkSpeed = (uploadData.length * 8) / chunkDuration / 1000000; // Mbps
          speeds.push(chunkSpeed);

          const elapsed = Date.now() - startTime;
          const progress = Math.min((elapsed / UPLOAD_DURATION) * 100, 100);

          // Update UI periodically
          if (Date.now() - lastUpdate > 100) {
            const recentSpeeds = speeds.slice(-5);
            const avgSpeed = recentSpeeds.reduce((a, b) => a + b, 0) / recentSpeeds.length;
            
            setState(prev => ({
              ...prev,
              progress,
              currentSpeed: avgSpeed,
            }));
            lastUpdate = Date.now();
          }
        }
      } catch (error) {
        if (abortControllerRef.current?.signal.aborted) {
          throw new Error('Test aborted');
        }
        // Continue on error
      }
    }

    // Calculate average speed (excluding outliers)
    speeds.sort((a, b) => a - b);
    const trimmedSpeeds = speeds.slice(
      Math.floor(speeds.length * 0.1),
      Math.floor(speeds.length * 0.9)
    );
    
    return trimmedSpeeds.length > 0
      ? trimmedSpeeds.reduce((a, b) => a + b, 0) / trimmedSpeeds.length
      : speeds.reduce((a, b) => a + b, 0) / speeds.length;
  }, []);

  const startTest = useCallback(async () => {
    abortControllerRef.current = new AbortController();
    
    setState({
      phase: 'ping',
      progress: 0,
      currentSpeed: 0,
      results: { ping: null, download: null, upload: null, jitter: null },
      isRunning: true,
    });

    try {
      // Phase 1: Ping test
      const { ping, jitter } = await measurePing();
      setState(prev => ({
        ...prev,
        phase: 'download',
        progress: 0,
        results: { ...prev.results, ping, jitter },
      }));

      // Phase 2: Download test
      const download = await measureDownload();
      setState(prev => ({
        ...prev,
        phase: 'upload',
        progress: 0,
        results: { ...prev.results, download },
      }));

      // Phase 3: Upload test
      const upload = await measureUpload();
      setState(prev => ({
        ...prev,
        phase: 'complete',
        progress: 100,
        currentSpeed: 0,
        results: { ...prev.results, upload },
        isRunning: false,
      }));
    } catch (error) {
      if ((error as Error).message !== 'Test aborted') {
        console.error('Speed test error:', error);
      }
      setState(prev => ({
        ...prev,
        phase: 'idle',
        isRunning: false,
      }));
    }
  }, [measurePing, measureDownload, measureUpload]);

  const stopTest = useCallback(() => {
    abortControllerRef.current?.abort();
    setState(prev => ({
      ...prev,
      phase: 'idle',
      isRunning: false,
    }));
  }, []);

  const resetTest = useCallback(() => {
    abortControllerRef.current?.abort();
    setState({
      phase: 'idle',
      progress: 0,
      currentSpeed: 0,
      results: { ping: null, download: null, upload: null, jitter: null },
      isRunning: false,
    });
  }, []);

  return {
    ...state,
    startTest,
    stopTest,
    resetTest,
  };
}

