import React from 'react';
import { Linking, ScrollView } from 'react-native';
import useCalendar from '../../hooks/useCalendar';
import { Button } from 'react-native-paper';
import RoseViewField from '../partial/RoseViewField';
import moment from 'moment';

const RoseView = ({ user, view_updateFunction, view_updateFunctionText,
    view_secondFunction, view_secondFunctionText,
    view_updateFunction_callback
}) => {

    const { birthday, dateMet, email, homeLocation, name, nickName, notes, phoneNumber, placeMetAt, picture, tags, work } = user || {};
    const { homeLocationCoords, homeFormatted_address, homeLocationName } = homeLocation || {};
    const { placeMetAtLocationCoords, placeMetAtFormatted_address, placeMetAtName } = placeMetAt || {};

    const [rozyCalendar, createEvent] = useCalendar();

    // TODO: move to constants?
    //
    // ─── FUNCTIONS ──────────────────────────────────────────────────────────────────
    //
    const _formatPhonenumber = (phone) => {
        const cleaned = ('' + phone).replace(/\D/g, '')
        const match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
        if (match) {
            const intlCode = (match[1] ? '+1 ' : '');
            const formattedNumber = [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
            return formattedNumber;
        }
    }

    const _handleEmptyField = () => alert('Enter data for that field in order to interact with it.');
    // ────────────────────────────────────────────────────────────────────────────────

    const viewRows = [
        {
            value: name || '(No-Name?)', subtitle: 'name',
            left: "account",
            rightIcon: "account-plus",
            rightFunc: () => { },
        },
        {
            value: nickName || '(No-nickName?)', subtitle: 'nickname',
            left: "account",
            // rightIcon: "account-plus",
            rightFunc: () => { },
        },
        {
            value: _formatPhonenumber(phoneNumber), subtitle: 'phone',
            left: "phone",
            // TODO: country code?
            rightIcon: "phone",
            rightFunc: () => { Linking.openURL(`tel:${phoneNumber}`) },
            secondRightIcon: "message-text",
            secondRightFunc: () => { Linking.openURL(`sms:${phoneNumber}`) },
        },
        {
            value: email, subtitle: 'email',
            left: "email",
            rightIcon: "email",
            rightFunc: () => {
                Linking.openURL(`mailto:${email}`)
            },
        },
        {
            value: work || '(Add Occupation!)', subtitle: 'occupation',
            left: "briefcase-account",
            // rightIcon: "briefcase-plus",
            rightFunc: () => { },
        },
        {
            value: (tags && tags.length > 0) ? tags : '(Add some Tags!)', subtitle: 'tags',
            left: "tag",
            // rightIcon: "tag",
            rightFunc: () => { },
        },
        {
            value: notes || '(Add some notes!)', subtitle: 'notes',
            left: "note",
            // rightIcon: "note",
            rightFunc: () => { },
        },
        {
            value: dateMet ? (moment(dateMet).format('MMM DD, YYYY')) : '(Enter Date met!)', subtitle: 'date met',
            left: "calendar",
            rightIcon: "calendar-heart",
            rightFunc: () => { if (dateMet) createEvent(dateMet, 'date_met', name, placeMetAtFormatted_address) },
        },
        {
            value: birthday ? (moment(birthday).format('MMM DD, YYYY')) : '(Enter Birthday!)', subtitle: 'birthday',
            left: "calendar",
            rightIcon: "calendar-heart",
            rightFunc: () => { if (birthday) createEvent(birthday, 'birthday', name, placeMetAtFormatted_address) },
        },
        {
            value: homeFormatted_address, subtitle: 'home location',
            left: "crosshairs-gps",
            rightIcon: "crosshairs-gps",
            rightFunc: () => {
                const url = Platform.select({
                    ios: `maps:0,0?q=${homeFormatted_address}`,
                    android: `geo:0,0?q=${homeFormatted_address}`,
                })
                Linking.openURL(url)
            },
        },
        {
            value: placeMetAtFormatted_address, subtitle: 'place met',
            left: "crosshairs-gps",
            rightIcon: "crosshairs-gps",
            rightFunc: () => {
                const url = Platform.select({
                    ios: `maps:0,0?q=${placeMetAtFormatted_address}`,
                    android: `geo:0,0?q=${placeMetAtFormatted_address}`,
                })
                Linking.openURL(url)
            },
        },
    ];

    const isUserContactCard = (view_updateFunctionText === 'Update your contact card');
    const contactCardRowsToIgnore = ['notes', 'date met', 'place met', 'tags']

    return (
        <ScrollView>
            {
                viewRows.map(({ value, subtitle, left, rightIcon, secondRightIcon, rightFunc, secondRightFunc }) => (
                    ((isUserContactCard && !contactCardRowsToIgnore.includes(subtitle) || !isUserContactCard))
                        ? (isUserContactCard)
                            ? <RoseViewField
                                key={subtitle}
                                value={value}
                                subtitle={subtitle}
                                left={left}
                            />
                            : <RoseViewField
                                key={subtitle}
                                value={value}
                                subtitle={subtitle}
                                left={left}
                                rightIcon={rightIcon}
                                rightFunc={rightFunc}
                                secondRightIcon={secondRightIcon}
                                secondRightFunc={secondRightFunc}
                            />
                        : null
                ))}
            <Button onPress={view_updateFunction}> {view_updateFunctionText} </Button>
            <Button
                style={{ marginBottom: 10 }}
                onPress={() => {
                    const roseId = user.roseId;
                    view_secondFunction({ roseId, callback: view_updateFunction_callback })
                }}
            > {view_secondFunctionText}
            </Button>
        </ScrollView>
    );
};

export default RoseView;