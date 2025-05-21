# Video API Documentation

## Overview

The Video API provides functionality for real-time video communication in Hablaqui Video Rooms. This document details the available features, methods, and best practices.

## Core Components

### VideoProvider

The main component that manages video connections and provides context to child components.

```typescript
interface IVideoContext {
  room: Room | null;
  localTracks: (LocalAudioTrack | LocalVideoTrack)[];
  isConnecting: boolean;
  connect: (token: string) => Promise<void>;
  onError: ErrorCallback;
  getLocalVideoTrack: (newOptions?: CreateLocalTrackOptions) => Promise<LocalVideoTrack>;
  getLocalAudioTrack: (deviceId?: string) => Promise<LocalAudioTrack>;
  isAcquiringLocalTracks: boolean;
  removeLocalVideoTrack: () => void;
  isSharingScreen: boolean;
  toggleScreenShare: () => void;
  getAudioAndVideoTracks: () => Promise<void>;
}
```

### Room Types

1. **Group Room**
   - Up to 50 participants
   - Full feature set
   - Bandwidth profile enabled
   - Dominant speaker detection

2. **Small Group Room**
   - Up to 4 participants
   - Full feature set
   - Optimized for small groups

3. **Peer-to-Peer Room**
   - Up to 10 participants
   - Basic features
   - Direct connections
   - Lower latency

4. **Go Room**
   - 2 participants
   - Basic features
   - Optimized for 1:1 calls

## API Methods

### Connection Management

```typescript
// Connect to a room
connect(token: string): Promise<void>

// Disconnect from room
disconnect(): void

// Get room state
getRoomState(): RoomState
```

### Track Management

```typescript
// Get local video track
getLocalVideoTrack(options?: CreateLocalTrackOptions): Promise<LocalVideoTrack>

// Get local audio track
getLocalAudioTrack(deviceId?: string): Promise<LocalAudioTrack>

// Remove local video track
removeLocalVideoTrack(): void

// Toggle screen sharing
toggleScreenShare(): void
```

### Room Features

```typescript
// Get dominant speaker
getDominantSpeaker(): Participant | null

// Get network quality
getNetworkQuality(): NetworkQualityLevel

// Start/Stop recording
toggleRecording(): void
```

## Events

### Room Events

```typescript
// Participant connected
room.on('participantConnected', (participant: RemoteParticipant) => {})

// Participant disconnected
room.on('participantDisconnected', (participant: RemoteParticipant) => {})

// Dominant speaker changed
room.on('dominantSpeakerChanged', (participant: RemoteParticipant) => {})

// Recording started/stopped
room.on('recordingStarted', () => {})
room.on('recordingStopped', () => {})
```

### Track Events

```typescript
// Track published
participant.on('trackPublished', (publication: RemoteTrackPublication) => {})

// Track unpublished
participant.on('trackUnpublished', (publication: RemoteTrackPublication) => {})

// Track enabled/disabled
track.on('enabled', () => {})
track.on('disabled', () => {})
```

## Configuration

### Bandwidth Profile

```typescript
const connectionOptions: ConnectOptions = {
  bandwidthProfile: {
    video: {
      mode: 'collaboration',
      dominantSpeakerPriority: 'high',
      trackSwitchOffMode: 'detected',
      contentPreferencesMode: 'auto',
      clientTrackSwitchOffControl: 'auto'
    }
  }
}
```

### Video Codec Settings

```typescript
const connectionOptions: ConnectOptions = {
  preferredVideoCodecs: [
    { codec: 'VP8', simulcast: true }
  ]
}
```

## Best Practices

### Performance Optimization

1. **Track Priority**
   - Set high priority for main video
   - Use low priority for secondary videos
   - Adjust based on dominant speaker

2. **Bandwidth Management**
   - Use appropriate room type
   - Configure bandwidth profile
   - Monitor network quality

3. **Resource Cleanup**
   - Disconnect properly
   - Remove tracks when not needed
   - Handle errors gracefully

### Security

1. **Token Management**
   - Use secure token generation
   - Implement token expiration
   - Rotate tokens regularly

2. **Access Control**
   - Validate room access
   - Implement user authentication
   - Monitor participant behavior

## Error Handling

### Common Errors

```typescript
// Handle connection errors
room.on('disconnected', (error: TwilioError) => {
  if (error) {
    // Handle error
  }
})

// Handle track publication errors
room.localParticipant.on('trackPublicationFailed', (error: TwilioError) => {
  // Handle error
})
```

### Error Recovery

1. **Reconnection**
   - Implement automatic reconnection
   - Handle reconnection events
   - Restore previous state

2. **Fallback Options**
   - Provide audio-only fallback
   - Implement quality degradation
   - Handle device failures

## Examples

### Basic Room Connection

```typescript
const connectToRoom = async (token: string) => {
  try {
    const room = await Video.connect(token, {
      name: 'my-room',
      tracks: localTracks,
      dominantSpeaker: true
    });
    
    room.on('participantConnected', participant => {
      console.log('Participant connected:', participant.identity);
    });
    
    return room;
  } catch (error) {
    console.error('Error connecting to room:', error);
    throw error;
  }
};
```

### Screen Sharing

```typescript
const startScreenShare = async () => {
  try {
    const screenTrack = await Video.createLocalVideoTrack({
      name: 'screen',
      width: 1920,
      height: 1080,
      frameRate: 10
    });
    
    await room.localParticipant.publishTrack(screenTrack);
  } catch (error) {
    console.error('Error sharing screen:', error);
  }
};
```

## Troubleshooting

### Common Issues

1. **Connection Problems**
   - Check network connectivity
   - Verify token validity
   - Check room type compatibility

2. **Video/Audio Issues**
   - Check device permissions
   - Verify device selection
   - Check bandwidth usage

3. **Performance Issues**
   - Monitor network quality
   - Check track priorities
   - Verify bandwidth profile

### Debug Tools

1. **Network Quality**
   - Use network quality indicators
   - Monitor bandwidth usage
   - Check connection stats

2. **Room Monitoring**
   - Use VideoRoomMonitor
   - Check participant status
   - Monitor track states 