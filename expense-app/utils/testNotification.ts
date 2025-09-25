import * as Notifications from 'expo-notifications';

export async function testNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Test Notification 🧪',
      body: 'Your daily reminders are working!',
    },
    trigger: { seconds: 2 } as Notifications.CalendarTriggerInput,
  });
}
