import * as Calendar from 'expo-calendar';
import { useEffect, useState } from 'react';

export default () => {

    const [rozyCalendar, setRozyCalendar] = useState({});

    const getRozyCalendar = (async () => {
        const { status } = await Calendar.requestCalendarPermissionsAsync();
        if (status === 'granted') {
            const calendars = await Calendar.getCalendarsAsync();
            // calendars.map(cal => console.log(cal.source.name))
            const rozyCalendar = calendars.find(each => each.title === 'Rozy Calendar' );
            if (rozyCalendar) {
                // console.log(rozyCalendar);
                setRozyCalendar(rozyCalendar)
            } else {
                console.log('no rozyCalendar');
                createCalendar();
            }
        }
    });

    const createCalendar = (async () => {
        const defaultCal = await Calendar.getDefaultCalendarAsync();
        console.log(defaultCal);
        const defaultCalendarSource = (Platform.OS === 'ios')
            ? defaultCal.source
            : { isLocalAccount: true, name: 'Expo Calendar' };
        const newCalendarID = await Calendar.createCalendarAsync({
            title: 'Rozy Calendar',
            color: 'blue',
            entityType: Calendar.EntityTypes.EVENT,
            sourceId: defaultCalendarSource.id,
            source: defaultCalendarSource,
            name: 'RozyCalendar',
            ownerAccount: 'personal',
            accessLevel: Calendar.CalendarAccessLevel.OWNER,
        });

        console.log(`new cal ID is: ${newCalendarID}`);
        const calendars = await Calendar.getCalendarsAsync();
        const rozyCalendar = calendars.find(each => each.id === newCalendarID);
        // console.log(calendars);
        console.log(rozyCalendar);
    })

    useEffect(() => {
        getRozyCalendar();
    }, []);

    return rozyCalendar;

}