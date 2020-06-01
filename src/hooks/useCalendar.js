import * as Calendar from 'expo-calendar';
import { useEffect, useState } from 'react';

export default () => {

    const [rozyCalendar, setRozyCalendar] = useState({});

    const getRozyCalendar = (async () => {
        const { status } = await Calendar.requestCalendarPermissionsAsync();
        if (status === 'granted') {
            const calendars = await Calendar.getCalendarsAsync();
            // calendars.map(cal => console.log(cal.source.name))
            const rozyCalendar = calendars.find(each => each.title === 'Rozy Calendar');
            if (rozyCalendar) {
                // console.log(rozyCalendar);
                setRozyCalendar(rozyCalendar)
            } else {
                // console.log('no rozyCalendar');
                createCalendar();
            }
        }
    });

    const createCalendar = async () => {
        const defaultCalendarSource = (Platform.OS === 'ios')
            ? (await Calendar.getDefaultCalendarAsync()).source
            : { isLocalAccount: true, name: 'Expo Calendar' };
        // TODO: Handle error here
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
        const calendars = await Calendar.getCalendarsAsync();
        const rozyCalendar = calendars.find(each => each.id === newCalendarID);
        setRozyCalendar(rozyCalendar);
        // console.log('rozyCalendar', rozyCalendar);
    };

    const createEvent = async (date, type, name, address) => {
        // console.log('[_createEvent]: ', `${date} + ' is the ${type} for ${name} ` + name, rozyCalendar);
        let title = '';
        switch (type) {
            case 'birthday':
                title = `${name}'s birthday`;
                break;
            case 'date_met':
                title = `The day you met ${name}`
                break;
            default:
                title = `A special day for ${name}`;
                break;
        }
        try {
            // const now = new Date(Date.now());
            // const futureDate = new Date(now.setFullYear(now.getFullYear() + 10));
            // console.log(futureDate);
            await Calendar.createEventAsync(rozyCalendar.id, {
                title, startDate: date, endDate: date, allDay: true,
                location: address,
                recurrenceRule: {
                    frequency: Calendar.Frequency.YEARLY,
                    // TODO: long term: do i need to add these all to calendar or only app calendar...???
                    // endDate: new Date("12/31/2030").toString()
                    occurrence: 15,
                }
            })
                .then(() => alert("Event successfully added to calendar"))
        } catch (e) {
            // console.log(e);
            alert("There was a problem adding your event");
        }
    }

    useEffect(() => {
        getRozyCalendar();
    }, []);

    return { rozyCalendar, createEvent };

}