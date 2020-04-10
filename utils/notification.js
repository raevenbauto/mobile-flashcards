import {AsyncStorage} from "react-native";
import * as Permissions from 'expo-permissions';
import {Notifications} from "expo";

const NOTIFICATION_KEY = "FlashCards-DailyNotification:key";

function createNotification (){
    return {
        title: "Study Time",
        body: "You haven't studied today. You're missing your Silicon Valley shot.",
        ios: {
            sound: true
        },
        android:{
            sound: true,
            priority: "high",
            sticky: false,
            vibrate: true
        }
    }
}

export function setLocalNotification(){
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then((data) => {
            if (data === null){
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                    .then(({status}) => {
                        if (status === "granted"){
                            Notifications.cancelAllScheduledNotificationsAsync();

                            let tomorrow = new Date();
                            tomorrow.setDate(tomorrow.getDate() + 1);
                            tomorrow.setHours(17);
                            tomorrow.setMinutes(0);

                            Notifications.scheduleLocalNotificationAsync(
                                createNotification(),
                                {
                                    time: tomorrow,
                                    repeat: "day"
                                }
                            );

                            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
                        }
                    });
            }
        })
}
