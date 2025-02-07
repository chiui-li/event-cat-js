# event-cat-js

😼 event-cat is an event emitter JavaScript library that is small, lightweight, and easy to use. It supports CommonJS, ESM, and UMD modules.

## Installation

You can install event-cat-js using npm:

```sh
npm install event-cat-js
```

## Usage

```typescript
import EventCat from 'event-cat-js';
```

```typescript
// Create an instance
const eventCat = EventCat.create();
```

```typescript
// Listen to events
eventCat.on('cat-meow', (data) => {
  console.log(data); // Output: '🐱 Meow! Feed me!'
});
eventCat.emit('cat-meow', '🐱 Meow! Feed me!');
```


```typescript
// Listen to events once
eventCat.once('pizza-ready', (data) => {
  console.log(data); // Output: '🍕 Your pizza is ready!'
});
eventCat.emit('pizza-ready', '🍕 Your pizza is ready!');
eventCat.emit('pizza-ready', '🍕 Your pizza is ready!'); // No output, as the listener is removed
```

```typescript
// Remove event listeners
const handler = (data) => {
  console.log(data);
};
eventCat.on('alien-invasion', handler);
eventCat.emit('alien-invasion', '👽 Warning! Aliens spotted!'); // Output: '👽 Warning! Aliens spotted!'
eventCat.off('alien-invasion', handler);
eventCat.emit('alien-invasion', '👽 Warning! Aliens spotted!'); // No output, as the listener is removed
```
```typescript
// Clear events
eventCat.on('dog-bark', handler);
eventCat.clear('dog-bark');
eventCat.emit('dog-bark', '🐶 Woof woof!'); // No output, as the event is cleared
```

```typescript
// Clear all events
eventCat.clear();
```

## Features

- **Event Listening:** Use `on` to listen to events and `emit` to trigger them.
- **Once Listeners:** Use `once` to listen to an event only once. The listener is automatically removed after it is triggered.
- **Remove Listeners:** Use `off` to remove specific event listeners.
- **Clear Events:** Use `clear` to remove all listeners for a specific event or all events.
- **Singleton Instance:** Use `EventCat.event` to access a global singleton instance of `EventCat`.

## Testing

The library is tested using `bun`. You can run the tests using:

```sh
bun test
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.