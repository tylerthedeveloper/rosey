import React from 'react';
import { Linking, ScrollView } from 'react-native';
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
            rightIcon: "account-plus",
            rightFunc: () => { },
        },
        {
            value: phoneNumber || '123456789', subtitle: 'phone',
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
            rightFunc: () => { Linking.openURL(`mailto:${email}`) },
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
            rightIcon: "tag",
            rightFunc: () => { },
        },
        {
            value: notes || '(Add some notes!)', subtitle: 'notes',
            left: "note",
            rightIcon: "note",
            rightFunc: () => { },
        },
        {
            value: dateMet ? (moment(dateMet).format('MMM DD, YYYY')) : '(Enter Date met!)', subtitle: 'date met',
            left: "calendar",
            rightIcon: "calendar-heart",
            rightFunc: () => { },
        },
        {
            value: birthday ? (moment(birthday).format('MMM DD, YYYY')) : '(Enter Birthday!)', subtitle: 'birthday',
            left: "calendar",
            rightIcon: "calendar-heart",
            rightFunc: () => { },
        },
        {
            value: homeFormatted_address || '(Add location!)', subtitle: 'home location',
            left: "crosshairs-gps",
            rightIcon: "crosshairs-gps",
            rightFunc: () => { },
        },
        {
            value: placeMetAtFormatted_address || '(Add location!)', subtitle: 'place met',
            left: "crosshairs-gps",
            rightIcon: "crosshairs-gps",
            rightFunc: () => { },
        },
    ];

    const isUserProfile = (view_updateFunctionText === 'Update your profile');
    const profileRowsToIgnore = ['notes', 'date met', 'place met', 'tags']

    return (
        <ScrollView>
            {
                viewRows.map(({ value, subtitle, left, rightIcon, secondRightIcon, rightFunc, secondRightFunc }) => (
                    ((isUserProfile && !profileRowsToIgnore.includes(subtitle) || !isUserProfile))
                        ? <RoseViewField
                            key={subtitle}
                            value={value}
                            subtitle={subtitle}
                            left={left}
                            rightIcon={rightIcon}
                            rightFunc={rightFunc}
                            secondRightIcon={secondRightIcon}
                            secondRightFunc={secondRightFunc}
                            dataDetectorType={'phoneNumber'}
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